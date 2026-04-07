"use client";
import { useState, useRef } from "react";

export function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (y - 0.5) * -8,
      ry: (x - 0.5) * 8,
      gx: x * 100,
      gy: y * 100,
    });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      transition: tilt.rx === 0 ? "transform 0.6s cubic-bezier(0.16,1,0.3,1)" : "transform 0.08s linear",
      position: "relative",
      ...style,
    }}>
      {children}
      {/* Glare overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none",
        background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,${Math.abs(tilt.rx) > 1 ? 0.04 : 0}) 0%, transparent 60%)`,
        transition: "background 0.15s ease",
      }} />
    </div>
  );
}
