import { PAYMENT_DETAILS, paymentIsConfigured } from "@/lib/site";
import { formatPkr } from "@/lib/utils";

type Method = keyof typeof PAYMENT_DETAILS;

export function PaymentDetailsBox({ method, amountPkr }: { method: Method; amountPkr: number }) {
  const d = PAYMENT_DETAILS[method];
  if (!d) return null;

  if (!paymentIsConfigured(d)) {
    return (
      <div className="rounded-xl border border-ng-line bg-ng-cream/60 p-4 text-sm text-ng-ink">
        We will share our {d.label} details with you on WhatsApp after you place your order.
      </div>
    );
  }

  const rows: [string, string][] = [
    ["Method", d.label],
    ["Account title", d.accountTitle],
    [method === "bank_transfer" ? "Account number" : "Mobile number", d.accountNumber],
  ];
  if (d.bankName && !d.bankName.startsWith("REPLACE")) rows.splice(1, 0, ["Bank", d.bankName]);
  if (d.iban && !d.iban.startsWith("REPLACE")) rows.push(["IBAN", d.iban]);
  rows.push(["Amount to send", formatPkr(amountPkr)]);

  return (
    <div className="rounded-xl border border-ng-leaf/40 bg-ng-mist/40 p-4">
      <p className="text-sm font-semibold text-ng-forest">Send your payment here</p>
      <dl className="mt-3 space-y-1.5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-ng-muted">{label}</dt>
            <dd className="text-right font-semibold text-ng-forest">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-ng-muted">
        After sending, share the payment screenshot with us on WhatsApp so we can confirm your order.
      </p>
    </div>
  );
}
