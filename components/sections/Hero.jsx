"use client";
import { useState, useEffect, useRef } from "react";
import { C } from "../../utils/colors";
import { useCounter } from "../../hooks";
import { FrostedIcon } from "../ui/FrostedIcon";
import { MagneticWrap } from "../ui/MagneticWrap";
import { Ticker } from "../ui/Ticker";
import { DPanel } from "../ui/DPanel";
import { DSpark } from "../ui/DSpark";

// ─── Dashboard Preview ───
function DashboardPreview({ dark }) {
  const c = C(dark);
  const cost = useCounter(4287, 1400, 400);
  const d = {
    label: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.5)", sub: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.55)",
    val: dark ? "rgba(255,255,255,0.95)" : "#000", title: dark ? "rgba(255,255,255,0.95)" : "#000",
    heading: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.7)", muted: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.4)",
    faint: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.3)", text: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.65)",
    textHl: dark ? "rgba(255,255,255,0.9)" : "#000", bar: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
    barPeak: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.7)", barTrack: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.1)",
    barFill: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.6)", barFillWeak: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.18)",
    hlBg: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)", dot: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)",
    sideActive: dark ? "rgba(255,255,255,0.85)" : "#000", sideInactive: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.45)",
  };
  const bars = [35,48,42,62,55,70,64,78,72,58,80,76,68,84,71,88,75,92,82,68,86,78,90,74];
  const peak = Math.max(...bars), peakIdx = bars.indexOf(peak);

  return (
    <div style={{ perspective: "1600px", maxWidth: 780, margin: "0 auto", position: "relative" }}>
      <div style={{
        transform: "rotateX(3deg)", transformOrigin: "center 85%", borderRadius: 14,
        background: dark ? "rgba(14,14,20,0.9)" : "#ffffff",
        border: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.08)",
        backdropFilter: "blur(16px)", overflow: "hidden",
        boxShadow: dark
          ? "0 50px 140px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.3)"
          : "0 20px 60px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
      }}>
        {/* Window bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 14px", borderBottom: dark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.08)", background: dark ? "transparent" : "#ffffff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.06)" : ["#ff5f57","#ffbd2e","#28c840"][i], opacity: dark ? 1 : 0.55 }} />)}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 8.5, fontFamily: "'IBM Plex Mono', monospace", color: d.muted }}>tokytics.dev</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: d.dot, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 8, fontFamily: "'IBM Plex Mono', monospace", color: d.muted }}>Live</span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {/* Sidebar */}
          <div style={{ width: 115, padding: "10px 7px", borderRight: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.08)"}`, background: dark ? "rgba(255,255,255,0.005)" : "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 4px", marginBottom: 14 }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: d.sideActive }}>Tokytics</span>
            </div>
            {["Overview","Analytics","Requests","Patterns","Prompt Lab","Keys"].map((n, i) => (
              <div key={i} style={{ padding: "4px 6px", borderRadius: 5, marginBottom: 1, background: i === 0 ? (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)") : "transparent", fontSize: 9, fontWeight: i === 0 ? 550 : 400, color: i === 0 ? d.sideActive : d.sideInactive }}>{n}</div>
            ))}
          </div>
          {/* Content */}
          <div style={{ flex: 1, padding: "10px 12px", background: dark ? "transparent" : "#f5f6f9" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 650, color: d.title }}>Overview</div>
            </div>
            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
              {[
                { l: "Total Cost", v: "$" + cost.toLocaleString(), sp: [0.85,0.8,0.75,0.7,0.62,0.55,0.48,0.45], big: true },
                { l: "Requests", v: "1.24M", sp: [0.3,0.4,0.5,0.55,0.6,0.65,0.7,0.72] },
                { l: "P95 Latency", v: "842ms", sp: [0.72,0.65,0.6,0.55,0.5,0.48,0.45,0.44] },
                { l: "Cache Rate", v: "34.2%", sp: [0.2,0.24,0.28,0.3,0.33,0.35,0.37,0.38] },
              ].map((k, i) => (
                <DPanel key={i} elevation={k.big ? 2 : 1} dark={dark} style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 7, color: d.label, fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase", marginBottom: 4 }}>{k.l}</div>
                  <div style={{ fontSize: k.big ? 16 : 13, fontWeight: 660, color: d.val }}>{k.v}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 4 }}>
                    <DSpark pts={k.sp} w={k.big ? 60 : 40} h={k.big ? 18 : 14} dark={dark} highlight />
                  </div>
                </DPanel>
              ))}
            </div>
            {/* Chart + Provider */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 155px", gap: 6, marginBottom: 6 }}>
              <DPanel elevation={1} dark={dark} style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 8, fontWeight: 550, color: d.heading, marginBottom: 8 }}>Cost trend (30d)</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 56 }}>
                  {bars.map((h, i) => (<div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 1.5, background: i === peakIdx ? `linear-gradient(180deg, ${d.barPeak}, ${d.barFillWeak})` : `linear-gradient(180deg, ${d.bar}, rgba(0,0,0,0.03))`, boxShadow: i === peakIdx ? (dark ? "0 0 14px rgba(255,255,255,0.08)" : "none") : "none" }} />))}
                </div>
              </DPanel>
              <DPanel elevation={1} dark={dark} style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 8, fontWeight: 550, color: d.heading, marginBottom: 6 }}>By provider</div>
                {[{ n: "OpenAI", p: 42 },{ n: "Anthropic", p: 28 },{ n: "Google", p: 18 },{ n: "OpenRouter", p: 12 }].map((pr, i) => (
                  <div key={i} style={{ marginBottom: 5 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7.5, fontFamily: "'IBM Plex Mono', monospace", color: i === 0 ? d.text : d.muted, marginBottom: 2 }}><span>{pr.n}</span><span>{pr.p}%</span></div>
                    <div style={{ height: 3, borderRadius: 2, background: d.barTrack }}><div style={{ width: `${pr.p}%`, height: "100%", borderRadius: 2, background: i === 0 ? d.barFill : d.barFillWeak }} /></div>
                  </div>
                ))}
              </DPanel>
            </div>
            {/* Bottom row */}
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 130px", gap: 6 }}>
              <DPanel elevation={1} dark={dark} style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 7.5, fontWeight: 550, color: d.heading, marginBottom: 6 }}>Trace</div>
                {[{ n: "proxy", ms: 5, s: 0 },{ n: "cache", ms: 8, s: 2 },{ n: "provider.llm", ms: 719, s: 17, main: true },{ n: "log", ms: 34, s: 736 }].map((sp, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 1fr 22px", gap: 4, alignItems: "center", padding: "2px 0" }}>
                    <span style={{ fontSize: 7, fontFamily: "'IBM Plex Mono', monospace", color: sp.main ? d.textHl : d.muted }}>{sp.n}</span>
                    <div style={{ height: 3, borderRadius: 2, background: d.barTrack }}><div style={{ width: `${Math.max((sp.ms / 770) * 100, 2)}%`, marginLeft: `${(sp.s / 770) * 100}%`, height: "100%", borderRadius: 2, background: sp.main ? d.barFill : d.barFillWeak }} /></div>
                    <span style={{ fontSize: 6.5, fontFamily: "'IBM Plex Mono', monospace", color: d.faint, textAlign: "right" }}>{sp.ms}ms</span>
                  </div>
                ))}
              </DPanel>
              <DPanel elevation={1} dark={dark} style={{ padding: "8px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: d.dot, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 7.5, fontWeight: 550, color: d.heading }}>Live requests</span>
                </div>
                {[{ s: "200", m: "gpt-4o-mini", cost: "$0.003", hl: false },{ s: "429", m: "gpt-4o", cost: "—", hl: true },{ s: "200", m: "gemini-flash", cost: "$0.001", hl: false }].map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "22px 1fr 34px", gap: 4, alignItems: "center", padding: "2.5px 0" }}>
                    <span style={{ fontSize: 7.5, fontFamily: "'IBM Plex Mono', monospace", color: r.hl ? d.textHl : d.muted, fontWeight: r.hl ? 600 : 400 }}>{r.s}</span>
                    <span style={{ fontSize: 7.5, fontFamily: "'IBM Plex Mono', monospace", color: r.hl ? d.textHl : d.text }}>{r.m}</span>
                    <span style={{ fontSize: 7, fontFamily: "'IBM Plex Mono', monospace", color: d.faint, textAlign: "right" }}>{r.cost}</span>
                  </div>
                ))}
              </DPanel>
              <DPanel elevation={1} dark={dark} style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 7.5, fontWeight: 550, color: d.heading, marginBottom: 6 }}>Budget</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 7, fontFamily: "'IBM Plex Mono', monospace", color: d.muted, marginBottom: 2 }}><span>team-a</span><span>$420/$500</span></div><div style={{ height: 3, borderRadius: 2, background: d.barTrack }}><div style={{ width: "84%", height: "100%", borderRadius: 2, background: d.barFill }} /></div></div>
                  <div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 7, fontFamily: "'IBM Plex Mono', monospace", color: d.muted, marginBottom: 2 }}><span>team-b</span><span>$180/$300</span></div><div style={{ height: 3, borderRadius: 2, background: d.barTrack }}><div style={{ width: "60%", height: "100%", borderRadius: 2, background: d.barFillWeak }} /></div></div>
                </div>
              </DPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scroll-driven dashboard zoom ───
function DashboardZoom({ dark }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rotateX = 8 - progress * 5;
  const translateY = (1 - progress) * 30;
  const scale = 0.95 + progress * 0.05;

  return (
    <div ref={ref} style={{
      transform: `perspective(1600px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
      opacity: 1,
      willChange: "transform",
      position: "relative",
    }}>
      <DashboardPreview dark={dark} />
    </div>
  );
}

// ─── Hero Section ───
export function Hero({ dark, setDark }) {
  const c = C(dark);
  const iconDefs = [
    { x: "10%", y: "24%", r: -15, d: 0.3, i: 0, p: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { x: "6%", y: "58%", s: 48, r: 14, d: 0.55, i: 1, p: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { x: "84%", y: "20%", r: 18, d: 0.4, i: 2, p: "M18 20V10M12 20V4M6 20v-6" },
    { x: "89%", y: "52%", s: 50, r: -10, d: 0.6, i: 3, p: "M4 17l6-5-6-5M12 19h8" },
    { x: "16%", y: "76%", s: 44, r: 22, d: 0.7, i: 4, p: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
    { x: "80%", y: "72%", s: 46, r: -18, d: 0.55, i: 5, p: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: dark ? "#0b0b0f" : "#fafbfe", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", position: "relative", overflow: "hidden", transition: "background 0.4s" }}>
      {/* Icons constrained to viewport height so % positions stay within view */}
      <div style={{ position: "absolute", inset: 0, height: "100vh", pointerEvents: "none" }}>
        {iconDefs.map(ic => (
          <FrostedIcon key={ic.i} x={ic.x} y={ic.y} size={ic.s || 56} rotate={ic.r} delay={ic.d} idx={ic.i} dark={dark}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={ic.p} stroke={c(0.35)} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </FrostedIcon>
        ))}
      </div>
      <div style={{ height: 60 }} />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 32px 0", textAlign: "center", position: "relative", zIndex: 3 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 15px 6px 10px", borderRadius: 100, background: c(0.03), border: `1px solid ${c(0.06)}`, fontSize: 12, fontWeight: 450, color: c(0.4), fontFamily: "'IBM Plex Mono', monospace", marginBottom: 24, boxShadow: dark ? "0 2px 10px rgba(0,0,0,0.25)" : "0 2px 10px rgba(0,0,0,0.04)", opacity: 0, animation: "fi 0.7s ease-out 0.15s forwards" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: c(0.3) }} />
          Semantic caching & pattern detection
        </div>
        <h1 style={{ fontSize: 58, fontWeight: 680, lineHeight: 1.06, letterSpacing: "-0.04em", color: c(0.9), margin: "0 0 18px", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          {"Know what your LLM spend actually costs".split(" ").map((word, i) => (
            <span key={i} className="hero-word" style={{
              display: "inline-block", marginRight: "0.28em",
              opacity: 0,
              animation: `heroWord 0.9s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.07}s forwards`,
            }}>{word}</span>
          ))}
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: c(0.38), maxWidth: 450, margin: "0 auto 34px", fontWeight: 400, opacity: 0, animation: "heroFade 1s ease 1s forwards" }}>A proxy worker that turns raw LLM traffic into cost candles, trace waterfalls, and pattern-based savings. 5ms overhead.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 48, opacity: 0, animation: "heroFade 0.8s ease 1.2s forwards" }}>
          <MagneticWrap strength={0.25}><span className="cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 32px", borderRadius: 13, cursor: "pointer", background: dark ? "linear-gradient(180deg, #ffffff 0%, #f5f5f5 20%, #ebebeb 45%, #e0e0e0 70%, #d6d6d6 100%)" : "linear-gradient(180deg, #4a4a56 0%, #353540 18%, #252530 40%, #18181f 65%, #0a0a0e 100%)", color: dark ? "#0b0b0f" : "#fff", fontSize: 15.5, fontWeight: 580, boxShadow: dark ? "0 4px 12px rgba(255,255,255,0.2), 0 8px 30px rgba(255,255,255,0.15), 0 16px 60px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.5)" : "0 4px 12px rgba(0,0,0,0.15), 0 8px 30px rgba(0,0,0,0.12), 0 16px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
            Start for free <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span></MagneticWrap>
          <MagneticWrap strength={0.2}><span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", borderRadius: 13, cursor: "pointer", background: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.9)", border: `1px solid ${c(0.08)}`, color: c(0.5), fontSize: 15.5, fontWeight: 480, boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.25)" : "0 4px 20px rgba(0,0,0,0.05)" }}>View docs</span></MagneticWrap>
        </div>
        <DashboardZoom dark={dark} />
      </div>
      <div style={{ marginTop: 40, position: "relative", zIndex: 3 }}><Ticker dark={dark} /></div>
    </div>
  );
}
