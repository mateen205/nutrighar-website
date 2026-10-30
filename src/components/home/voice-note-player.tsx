"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const BARS = Array.from({ length: 26 }, (_, i) => 6 + Math.round(Math.abs(Math.sin((i + 1) * 1.7)) * 18));

// Only one voice note plays at a time.
let current: HTMLAudioElement | null = null;

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function VoiceNotePlayer({
  src,
  label,
  className,
}: {
  src: string;
  label: string; // e.g. "Voice note from Ayesha K."
  className?: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el && current === el) current = null;
    };
  }, []);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      if (current && current !== el) current.pause();
      current = el;
      el.play().catch(() => setFailed(true));
    } else {
      el.pause();
    }
  }

  if (failed) {
    return <p className={cn("text-xs text-ng-muted", className)}>This voice note is not available right now.</p>;
  }

  const progress = duration > 0 ? time / duration : 0;
  const filled = Math.round(progress * BARS.length);

  return (
    <div className={cn("flex items-center gap-3 rounded-full bg-ng-mist/50 py-2 pl-2 pr-4", className)}>
      <audio
        ref={ref}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setTime(0);
        }}
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full bg-ng-forest text-white transition hover:bg-ng-deep"
      >
        {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
      </button>
      <div className="flex h-7 flex-1 items-center gap-[2px]" aria-hidden="true">
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{ height: h }}
            className={cn("w-[3px] rounded-full", i < filled ? "bg-ng-forest" : "bg-ng-leaf/50")}
          />
        ))}
      </div>
      <span className="w-9 text-right text-xs font-semibold tabular-nums text-ng-muted">
        {fmt(playing || time > 0 ? time : duration)}
      </span>
    </div>
  );
}
