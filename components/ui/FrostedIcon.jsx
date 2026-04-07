"use client";

export function FrostedIcon({ children, x, y, size = 56, rotate = -12, delay = 0, idx = 0, dark }) {
  const r = Math.round(size * 0.28);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 2, animation: `gf${idx} 6s ease-in-out ${delay + 1}s infinite` }}>
      <div style={{
        width: size, height: size, borderRadius: r,
        background: dark ? "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 100%)" : "linear-gradient(145deg, #fff 0%, #f7f8fb 35%, #eef0f6 70%, #e8eaf2 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${rotate}deg)`,
        boxShadow: dark ? "0 14px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 16px 48px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",
        border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.5)",
        position: "relative", overflow: "hidden", backdropFilter: "blur(12px)",
        opacity: 0, animation: `floatIn 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards`,
      }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: r, background: dark ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)" : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, transparent 45%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
