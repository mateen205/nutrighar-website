import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  activityLogs,
  orders,
  payments,
  plans,
  subscriptions,
  users,
} from "@/db/schema";
import { getCurrentUser, hashPassword } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validators";
import { generateOrderNumber } from "@/lib/utils";
import { getPlanById } from "@/lib/plans";
import { notifyNewOrder } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const plan = await getPlanById(data.planId);
    if (!plan || !plan.isActive) {
      return NextResponse.json({ error: "Selected plan is unavailable" }, { status: 400 });
    }
    if (plan.pricePkr === 0) {
      return NextResponse.json(
        { error: "The Custom Plan is priced on request. Please message us on WhatsApp." },
        { status: 400 }
      );
    }

    // Guest checkout: nobody is logged in here. The order is attached to the
    // account for this email (created quietly if it does not exist).
    let user = await getCurrentUser();

    if (!user) {
      const email = data.email.toLowerCase().trim();
      const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (existing) {
        user = existing;
      } else {
        const tempPassword = `ng-${Math.random().toString(36).slice(2, 10)}A1`;
        const passwordHash = await hashPassword(tempPassword);
        const [created] = await db
          .insert(users)
          .values({
            email,
            fullName: data.fullName.trim(),
            phone: data.phone,
            address: data.address || null,
            city: data.city || null,
            passwordHash,
          })
          .returning();
        user = created;
      }
    } else {
      await db
        .update(users)
        .set({
          fullName: data.fullName.trim(),
          phone: data.phone,
          address: data.address || user.address,
          city: data.city || user.city,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));
    }

    const discountPkr =
      plan.originalPricePkr && plan.originalPricePkr > plan.pricePkr
        ? plan.originalPricePkr - plan.pricePkr
        : 0;
    const subtotalPkr = plan.originalPricePkr || plan.pricePkr;
    const totalPkr = plan.pricePkr;
    const orderNumber = generateOrderNumber();

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        userId: user.id,
        planId: plan.id,
        status: "pending",
        subtotalPkr,
        discountPkr,
        totalPkr,
        customerName: data.fullName.trim(),
        customerEmail: data.email.toLowerCase().trim(),
        customerPhone: data.phone,
        customerAddress: [data.address, data.city].filter(Boolean).join(", ") || null,
        notes: data.notes || null,
      })
      .returning();

    // Payment is confirmed manually with the customer on WhatsApp, so it stays pending here.
    const [payment] = await db
      .insert(payments)
      .values({
        orderId: order.id,
        method: data.paymentMethod,
        status: "pending",
        amountPkr: totalPkr,
        metadata: { initiatedFrom: "checkout" },
      })
      .returning();

    // Plan dates are set when NutriGhar confirms the order and the plan starts.
    const [subscription] = await db
      .insert(subscriptions)
      .values({
        userId: user.id,
        planId: plan.id,
        orderId: order.id,
        status: "pending",
      })
      .returning();

    await db.insert(activityLogs).values({
      userId: user.id,
      type: "order_placed",
      title: "Order Received",
      description: `${plan.name} · PKR ${totalPkr.toLocaleString("en-PK")} · awaiting confirmation`,
      metadata: { planId: plan.id, orderId: order.id },
    });

    // Email the owner and the customer (never blocks the order if email fails)
    await notifyNewOrder({
      orderNumber: order.orderNumber,
      planName: plan.name,
      durationDays: plan.durationDays,
      totalPkr: order.totalPkr,
      paymentMethod: data.paymentMethod.replace("_", " "),
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      notes: order.notes,
    });

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalPkr: order.totalPkr,
        status: "pending",
      },
      payment: {
        id: payment.id,
        status: "pending",
        method: data.paymentMethod,
      },
      subscription: {
        id: subscription.id,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error("order create error", error);
    return NextResponse.json({ error: "Unable to complete order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select({
        order: orders,
        planName: plans.name,
        planSlug: plans.slug,
      })
      .from(orders)
      .innerJoin(plans, eq(orders.planId, plans.id))
      .where(eq(orders.userId, user.id));

    return NextResponse.json({
      orders: rows.map((r) => ({
        ...r.order,
        planName: r.planName,
        planSlug: r.planSlug,
      })),
    });
  } catch (error) {
    console.error("orders list error", error);
    return NextResponse.json({ error: "Unable to load orders" }, { status: 500 });
  }
}