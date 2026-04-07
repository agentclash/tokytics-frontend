"use client";
import { C } from "../../utils/colors";

export function Ticker({ dark }) {
  const c = C(dark);
  const items = ["proxy.forward","status=200","provider=openai","model=gpt-4o-mini","cache=semantic","clickhouse.insert","latency_p95=842ms","cost=$0.003","budget.check=pass","patterns.match=3","tokens=1847","provider=anthropic"];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${c(0.04)}`, borderBottom: `1px solid ${c(0.04)}`, padding: "14px 0" }}>
      <div style={{ display: "flex", gap: 36, animation: "ticker 50s linear infinite", whiteSpace: "nowrap", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: c(0.14) }}>
        {[...Array(3)].flatMap((_,j) => items.map((t,i) => <span key={`${j}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: c(0.1) }}/>{t}</span>))}
      </div>
    </div>
  );
}
