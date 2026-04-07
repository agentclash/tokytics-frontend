"use client";
import { useScrollProgress } from "../../hooks";

export function ScrollProgress({ dark }) {
  const progress = useScrollProgress();
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 200,
      background: "transparent", pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", width: `${progress * 100}%`,
        background: dark
          ? "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.35), rgba(255,255,255,0.1))"
          : "linear-gradient(90deg, rgba(0,0,0,0.05), rgba(0,0,0,0.2), rgba(0,0,0,0.05))",
        boxShadow: dark ? "0 0 8px rgba(255,255,255,0.15)" : "0 0 6px rgba(0,0,0,0.08)",
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}
