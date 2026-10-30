"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

/**
 * Plain <img> with graceful fallback — avoids next/image optimizer issues
 * on local/preview hosts where images fail to load.
 */
export function SafeImage({ src, alt, className, width, height, priority }: Props) {
  const [failed, setFailed] = useState(false);
  const fallback = "/images/fresh-salad.jpg";

  if (failed && src === fallback) {
    return (
      <div
        className={cn("flex items-center justify-center bg-ng-mist text-ng-deep", className)}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-sm font-medium">NutriGhar</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? fallback : src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}
