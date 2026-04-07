"use client";
import { useState, useEffect, useRef } from "react";

export function Reveal({ children, delay = 0, y = 40, x = 0, scale = 0.97, blur = 0, duration = 0.8, threshold = 0.15, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0) translateX(0) scale(1)" : `translateY(${y}px) translateX(${x}px) scale(${scale})`,
      filter: vis ? "blur(0px)" : `blur(${blur}px)`,
      transition: `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter ${duration}s ease ${delay}s`,
      willChange: "opacity, transform",
      ...style,
    }}>
      {children}
    </div>
  );
}
