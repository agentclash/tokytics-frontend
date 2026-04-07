"use client";
import { useState, useRef } from "react";

export function MagneticWrap({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setOffset({ x: dx, y: dy });
  };
  const onLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 ? "transform 0.5s cubic-bezier(0.16,1,0.3,1)" : "transform 0.1s linear",
      }}>
      {children}
    </div>
  );
}
