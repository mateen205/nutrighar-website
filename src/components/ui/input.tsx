import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className, id, ...props }: Props) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="label-ng">
          {label}
          {props.required ? <span className="text-ng-leaf"> *</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn("input-ng", error && "border-ng-danger focus:border-ng-danger focus:ring-red-100", className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-ng-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ng-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
