import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: Props) {
  const inputId = id || props.name;
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="label-ng">
          {label}
          {props.required ? <span className="text-ng-leaf"> *</span> : null}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={cn(
          "input-ng min-h-[120px] resize-y",
          error && "border-ng-danger focus:border-ng-danger focus:ring-red-100",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-ng-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
