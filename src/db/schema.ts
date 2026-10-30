import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["customer", "admin"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "awaiting_payment",
  "paid",
  "failed",
  "cancelled",
  "refunded",
]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "paused",
  "cancelled",
  "expired",
  "pending",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "jazzcash",
  "easypaisa",
  "bank_transfer",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "succeeded",
  "failed",
  "refunded",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  role: userRoleEnum("role").notNull().default("customer"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const plans = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  tagline: varchar("tagline", { length: 200 }),
  description: text("description").notNull(),
  pricePkr: integer("price_pkr").notNull(),
  originalPricePkr: integer("original_price_pkr"),
  discountPercent: integer("discount_percent").default(0),
  durationDays: integer("duration_days").notNull().default(30),
  mealsPerDay: integer("meals_per_day").notNull().default(3),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  whoIsFor: jsonb("who_is_for").$type<string[]>().notNull().default([]),
  mealStructure: jsonb("meal_structure")
    .$type<{ name: string; description: string }[]>()
    .notNull()
    .default([]),
  isPopular: boolean("is_popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderNumber: varchar("order_number", { length: 30 }).notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  planId: uuid("plan_id")
    .notNull()
    .references(() => plans.id),
  status: orderStatusEnum("status").notNull().default("pending"),
  subtotalPkr: integer("subtotal_pkr").notNull(),
  discountPkr: integer("discount_pkr").notNull().default(0),
  totalPkr: integer("total_pkr").notNull(),
  customerName: varchar("customer_name", { length: 200 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 30 }).notNull(),
  customerAddress: text("customer_address"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  method: paymentMethodEnum("method").notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  amountPkr: integer("amount_pkr").notNull(),
  providerRef: varchar("provider_ref", { length: 255 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  planId: uuid("plan_id")
    .notNull()
    .references(() => plans.id),
  orderId: uuid("order_id").references(() => orders.id),
  status: subscriptionStatusEnum("status").notNull().default("pending"),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  nextBillingAt: timestamp("next_billing_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Plan = typeof plans.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
