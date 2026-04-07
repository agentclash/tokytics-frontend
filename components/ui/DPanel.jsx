"use client";

export function DPanel({ children, style = {}, elevation = 1, dark }) {
  const sh = {
    1: dark ? "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)" : "0 2px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)",
    2: dark ? "0 8px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)" : "0 4px 14px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.07)",
  };
  return (
    <div style={{
      borderRadius: 10, position: "relative",
      background: dark ? `rgba(255,255,255,${0.015 + elevation * 0.008})` : "#ffffff",
      border: dark ? `1px solid rgba(255,255,255,${0.03 + elevation * 0.008})` : "1px solid rgba(0,0,0,0.08)",
      boxShadow: sh[elevation] || sh[1],
      ...style,
    }}>
      {children}
    </div>
  );
}
