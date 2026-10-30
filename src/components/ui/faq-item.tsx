"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ng-line/80 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base font-semibold text-ng-forest">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-ng-leaf transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="body-muted pr-8 text-[15px]">{answer}</p>
        </div>
      </div>
    </div>
  );
}
