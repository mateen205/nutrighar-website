import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const sizes: Record<Size, string> = {
  sm: "!px-4 !py-2 !text-xs",
  md: "",
  lg: "btn-lg",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <button className={cn(variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
