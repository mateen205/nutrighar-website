// One place for all brand contact details. Change here and it updates everywhere.
export const SITE = {
  name: "NutriGhar",
  tagline: "Healthy Meals. Happier You.",
  slogan: "Good Food · Better Choices · Healthier You!",
  phoneDisplay: "+92 323 0612862",
  phoneTel: "+923230612862",
  whatsappNumber: "923230612862", // country code + number, no "+" or spaces
  email: "nutrighar7@gmail.com",
  instagram: "https://www.instagram.com/nutrighar7",
  location: "Faisalabad, Pakistan",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// ---------------------------------------------------------------------------
// PAYMENT DETAILS shown to customers after they choose a payment method.
// Replace every "REPLACE..." value with your real details.
// ---------------------------------------------------------------------------
export type PaymentDetails = {
  label: string;
  accountTitle: string;
  accountNumber: string; // mobile number for JazzCash/EasyPaisa, account number for bank
  bankName?: string;
  iban?: string;
};

export const PAYMENT_DETAILS: Record<"jazzcash" | "easypaisa" | "bank_transfer", PaymentDetails> = {
  jazzcash: {
    label: "JazzCash",
    accountTitle: "REPLACE WITH ACCOUNT NAME",
    accountNumber: "REPLACE WITH JAZZCASH NUMBER",
  },
  easypaisa: {
    label: "EasyPaisa",
    accountTitle: "REPLACE WITH ACCOUNT NAME",
    accountNumber: "REPLACE WITH EASYPAISA NUMBER",
  },
  bank_transfer: {
    label: "Bank Transfer",
    accountTitle: "REPLACE WITH ACCOUNT NAME",
    accountNumber: "REPLACE WITH ACCOUNT NUMBER",
    bankName: "REPLACE WITH BANK NAME",
    iban: "REPLACE WITH IBAN (optional, or delete this line)",
  },
};

export function paymentIsConfigured(d: PaymentDetails) {
  return !d.accountNumber.startsWith("REPLACE") && !d.accountTitle.startsWith("REPLACE");
}
