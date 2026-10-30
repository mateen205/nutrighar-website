import { db } from "@/db";
import { plans, type Plan } from "@/db/schema";
import { eq, asc, notInArray } from "drizzle-orm";
import { DEFAULT_PLANS } from "@/lib/plans-data";

function toPlanShape(p: (typeof DEFAULT_PLANS)[number], id?: string): Plan {
  const now = new Date();
  return {
    id: id || `local-${p.slug}`,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    pricePkr: p.pricePkr,
    originalPricePkr: p.originalPricePkr ?? null,
    discountPercent: p.discountPercent ?? 0,
    durationDays: p.durationDays,
    mealsPerDay: p.mealsPerDay,
    features: [...p.features],
    highlights: [...p.highlights],
    whoIsFor: [...p.whoIsFor],
    mealStructure: [...p.mealStructure],
    isPopular: p.isPopular,
    isActive: true,
    sortOrder: p.sortOrder,
    imageUrl: p.imageUrl ?? null,
    createdAt: now,
    updatedAt: now,
  };
}

function planValues(p: (typeof DEFAULT_PLANS)[number]) {
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    pricePkr: p.pricePkr,
    originalPricePkr: p.originalPricePkr,
    discountPercent: p.discountPercent,
    durationDays: p.durationDays,
    mealsPerDay: p.mealsPerDay,
    features: [...p.features],
    highlights: [...p.highlights],
    whoIsFor: [...p.whoIsFor],
    mealStructure: [...p.mealStructure],
    isPopular: p.isPopular,
    isActive: true,
    sortOrder: p.sortOrder,
    imageUrl: p.imageUrl,
  };
}

export async function ensurePlansSeeded() {
  try {
    const existing = await db.select({ id: plans.id, slug: plans.slug }).from(plans);
    const existingSlugs = new Set(existing.map((p) => p.slug));

    if (existing.length === 0) {
      await db.insert(plans).values(DEFAULT_PLANS.map(planValues));
      return;
    }

    const missing = DEFAULT_PLANS.filter((p) => !existingSlugs.has(p.slug));
    if (missing.length > 0) {
      await db.insert(plans).values(missing.map(planValues));
    }

    for (const p of DEFAULT_PLANS) {
      await db
        .update(plans)
        .set({
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          pricePkr: p.pricePkr,
          originalPricePkr: p.originalPricePkr,
          discountPercent: p.discountPercent,
          durationDays: p.durationDays,
          mealsPerDay: p.mealsPerDay,
          features: [...p.features],
          highlights: [...p.highlights],
          whoIsFor: [...p.whoIsFor],
          mealStructure: [...p.mealStructure],
          isPopular: p.isPopular,
          isActive: true,
          sortOrder: p.sortOrder,
          imageUrl: p.imageUrl,
          updatedAt: new Date(),
        })
        .where(eq(plans.slug, p.slug));
    }

    // Hide any old plans (e.g. Family, Fat Loss) that are no longer in plans-data.ts
    await db
      .update(plans)
      .set({ isActive: false, updatedAt: new Date() })
      .where(notInArray(plans.slug, DEFAULT_PLANS.map((p) => p.slug)));
  } catch (error) {
    console.error("ensurePlansSeeded failed", error);
  }
}

export async function getActivePlans(): Promise<Plan[]> {
  try {
    await ensurePlansSeeded();
    const rows = await db
      .select()
      .from(plans)
      .where(eq(plans.isActive, true))
      .orderBy(asc(plans.sortOrder));

    if (rows.length > 0) return rows;
  } catch (error) {
    console.error("getActivePlans db error, using fallback", error);
  }

  return DEFAULT_PLANS.map((p) => toPlanShape(p));
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  try {
    await ensurePlansSeeded();
    const [plan] = await db.select().from(plans).where(eq(plans.slug, slug)).limit(1);
    if (plan) return plan;
  } catch (error) {
    console.error("getPlanBySlug db error", error);
  }

  const fallback = DEFAULT_PLANS.find((p) => p.slug === slug);
  return fallback ? toPlanShape(fallback) : null;
}

export async function getPlanById(id: string): Promise<Plan | null> {
  try {
    await ensurePlansSeeded();
    const [plan] = await db.select().from(plans).where(eq(plans.id, id)).limit(1);
    if (plan) return plan;
  } catch (error) {
    console.error("getPlanById db error", error);
  }

  if (id.startsWith("local-")) {
    const slug = id.replace("local-", "");
    const fallback = DEFAULT_PLANS.find((p) => p.slug === slug);
    return fallback ? toPlanShape(fallback) : null;
  }

  return null;
}
