"use client";
import { useState, useEffect, useRef } from "react";

export function SectionWipe({ children, dark }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.5)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const radius = progress * 150;

  return (
    <div ref={ref} style={{
      clipPath: progress >= 1 ? "none" : `circle(${radius}% at 50% 20%)`,
      transition: "clip-path 0.1s linear",
      willChange: "clip-path",
    }}>
      {children}
    </div>
  );
}
