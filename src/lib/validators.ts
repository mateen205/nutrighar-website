import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(200),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
  phone: z.string().min(10, "Enter a valid phone number").max(30).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(200),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number").max(30),
  address: z.string().max(500).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  planId: z.string().uuid("Please select a plan"),
  paymentMethod: z.enum(["card", "jazzcash", "easypaisa", "bank_transfer"]),
  acceptTerms: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept the terms to continue" }),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(200),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().max(255).optional().or(z.literal("")),
  message: z.string().min(10, "Please write a short message").max(2000),
});

export const profileSchema = z.object({
  fullName: z.string().min(2).max(200),
  phone: z.string().max(30).optional().or(z.literal("")),
  address: z.string().max(500).optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
