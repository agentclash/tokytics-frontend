"use client";

export function DSpark({ pts, w = 50, h = 16, dark, highlight = false }) {
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * w},${h - p * h}`).join(" ");
  return (
    <svg width={w} height={h + 2} viewBox={`0 0 ${w} ${h + 2}`} style={{ overflow: "visible" }}>
      <path d={path + `L${w},${h + 2}L0,${h + 2}Z`} fill={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} />
      <path d={path} fill="none" stroke={dark ? (highlight ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)") : (highlight ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.35)")} strokeWidth={highlight ? 1.6 : 1.2} strokeLinecap="round" />
      {highlight && <circle cx={w} cy={h - pts[pts.length - 1] * h} r="2" fill={dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)"} />}
    </svg>
  );
}
