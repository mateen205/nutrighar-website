import nodemailer from "nodemailer";
import { SITE, whatsappLink } from "@/lib/site";

// Emails are sent through your Gmail account using an "App Password".
// Set these in .env.local (and in your hosting settings):
//   SMTP_USER=nutrighar7@gmail.com
//   SMTP_PASS=your-16-letter-gmail-app-password
//   OWNER_EMAIL=nutrighar7@gmail.com   (optional, defaults to SITE.email)

const OWNER_EMAIL = process.env.OWNER_EMAIL || SITE.email;

function esc(value: string | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

/** Never throws: a failed email must not break an order. */
async function sendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const transport = getTransport();
  if (!transport) {
    console.warn("Email skipped: SMTP_USER / SMTP_PASS are not set");
    return;
  }
  try {
    await transport.sendMail({
      from: `"${SITE.name}" <${process.env.SMTP_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
  } catch (error) {
    console.error("Email failed", error);
  }
}

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${esc(label)}</td><td style="padding:6px 0;font-weight:600">${esc(value)}</td></tr>`;
}

function wrap(title: string, inner: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1b4332">
    <h2 style="margin:0 0 4px">${esc(title)}</h2>
    <p style="margin:0 0 16px;color:#40916c">${esc(SITE.tagline)}</p>
    ${inner}
  </div>`;
}

export type OrderEmailData = {
  orderNumber: string;
  planName: string;
  durationDays: number;
  totalPkr: number;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string | null;
  notes?: string | null;
};

export async function notifyNewOrder(o: OrderEmailData) {
  const total = `PKR ${o.totalPkr.toLocaleString("en-PK")}`;
  const details = `<table style="border-collapse:collapse;font-size:14px">
      ${row("Order number", o.orderNumber)}
      ${row("Plan", `${o.planName} (${o.durationDays} days)`)}
      ${row("Total", total)}
      ${row("Preferred payment", o.paymentMethod)}
      ${row("Name", o.customerName)}
      ${row("Phone", o.customerPhone)}
      ${row("Email", o.customerEmail)}
      ${row("Address", o.customerAddress)}
      ${row("Goal / allergies", o.notes)}
    </table>`;

  const waLink = whatsappLink(`Hi NutriGhar! My order number is ${o.orderNumber}.`);
  const customerWa = `https://wa.me/${o.customerPhone.replace(/\D/g, "").replace(/^0/, "92")}`;

  await Promise.all([
    // 1. Owner alert
    sendEmail({
      to: OWNER_EMAIL,
      replyTo: o.customerEmail,
      subject: `New order ${o.orderNumber}: ${o.planName} (${total})`,
      html: wrap(
        "New order received",
        `${details}
         <p style="margin-top:16px"><a href="${esc(customerWa)}" style="background:#1b4332;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Message customer on WhatsApp</a></p>
         <p style="font-size:12px;color:#666">Please confirm the package and payment with the customer.</p>`
      ),
    }),
    // 2. Customer confirmation
    sendEmail({
      to: o.customerEmail,
      subject: `We received your NutriGhar order ${o.orderNumber}`,
      html: wrap(
        `Thank you, ${o.customerName.split(" ")[0]}!`,
        `<p style="font-size:14px">We have received your order. We will contact you on WhatsApp or by phone shortly to confirm your package, payment and delivery.</p>
         ${details}
         <p style="font-size:13px;color:#444">Please remember: orders need 24–48 hours notice, and there is no cancellation or refund once the meal plan starts.</p>
         <p style="margin-top:16px"><a href="${esc(waLink)}" style="background:#1b4332;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Chat with us on WhatsApp</a></p>
         <p style="font-size:12px;color:#666">${esc(SITE.phoneDisplay)} · ${esc(SITE.email)}</p>`
      ),
    }),
  ]);
}

export async function sendPasswordResetEmail(to: string, name: string, link: string) {
  await sendEmail({
    to,
    subject: "Set your NutriGhar password",
    html: wrap(
      `Hi ${name.split(" ")[0]},`,
      `<p style="font-size:14px">Use the button below to set a new password for your NutriGhar account. This link works once and expires in 30 minutes.</p>
       <p style="margin-top:16px"><a href="${esc(link)}" style="background:#1b4332;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Set my password</a></p>
       <p style="font-size:12px;color:#666">If you did not ask for this, you can ignore this email. Your password will not change.</p>`
    ),
  });
}

export async function notifyContactMessage(m: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) {
  await sendEmail({
    to: OWNER_EMAIL,
    replyTo: m.email,
    subject: `New message from ${m.name}${m.subject ? `: ${m.subject}` : ""}`,
    html: wrap(
      "New contact message",
      `<table style="border-collapse:collapse;font-size:14px">
        ${row("Name", m.name)}
        ${row("Email", m.email)}
        ${row("Phone", m.phone)}
        ${row("Subject", m.subject)}
      </table>
      <p style="white-space:pre-wrap;font-size:14px;border-left:3px solid #74c69d;padding-left:12px">${esc(m.message)}</p>`
    ),
  });
}
