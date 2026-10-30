import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({ label, error, options, className, id, ...props }: Props) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="label-ng">
          {label}
          {props.required ? <span className="text-ng-leaf"> *</span> : null}
        </label>
      ) : null}
      <select
        id={inputId}
        className={cn("input-ng appearance-none bg-[right_1rem_center] bg-no-repeat pr-10", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235c6b63' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
        }}
        aria-invalid={!!error}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1.5 text-xs text-ng-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
