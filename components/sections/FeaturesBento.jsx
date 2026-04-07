"use client";
import { useState, useEffect, useRef } from "react";
import { C, V } from "../../utils/colors";
import { useCounter } from "../../hooks";
import { Reveal } from "../ui/Reveal";
import { TiltCard } from "../ui/TiltCard";

// ─── Bento Card wrapper ───
function BCard({ children, style = {}, dark, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0) scale(1)" : "translateY(44px) scale(0.96)",
      filter: vis ? "blur(0px)" : "blur(3px)",
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 0.85s ease ${delay}s`,
      willChange: "opacity, transform",
    }}>
      <TiltCard>
        <div className="bento-card" style={{
          borderRadius: 18, position: "relative", overflow: "hidden",
          background: dark ? "linear-gradient(180deg, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.012) 100%)" : "#ffffff",
          border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)"}`,
          ...style,
        }}>{vis ? children : <div style={{ minHeight: 200 }} />}</div>
      </TiltCard>
    </div>
  );
}

// ─── Viz container ───
function BVis({ children, dark, style = {} }) {
  return (
    <div style={{ margin: "14px 14px 0", borderRadius: 12, padding: "16px 18px", background: dark ? "rgba(255,255,255,0.012)" : "#f6f7fb", border: `1px solid ${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"}`, position: "relative", overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

// ─── Candles Visualization ───
function CandlesViz({ dark }) {
  const v = V(dark); const cost = useCounter(4287, 1400, 400);
  const candles = [{o:.35,h:.52,l:.3,c:.48},{o:.48,h:.62,l:.42,c:.55},{o:.55,h:.68,l:.48,c:.5},{o:.5,h:.58,l:.36,c:.4},{o:.4,h:.52,l:.34,c:.48},{o:.48,h:.65,l:.44,c:.62},{o:.62,h:.76,l:.58,c:.7},{o:.7,h:.84,l:.66,c:.78},{o:.78,h:.88,l:.72,c:.74},{o:.74,h:.82,l:.58,c:.64},{o:.64,h:.72,l:.54,c:.58},{o:.58,h:.68,l:.5,c:.65}];
  const w = 280, h = 110, cw = w / candles.length;
  return (<div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
      <span style={{ fontSize: 18, fontWeight: 680, color: dark ? "rgba(255,255,255,0.95)" : "#000", textShadow: dark ? "0 0 16px rgba(255,255,255,0.2)" : "0 0 12px rgba(0,0,0,0.1)" }}>{"$" + cost.toLocaleString()}</span>
    </div>
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      {candles.map((cd, i) => { const x = i*cw+cw/2, up = cd.c>=cd.o, bT = (1-Math.max(cd.o,cd.c))*h, bB = (1-Math.min(cd.o,cd.c))*h, wT = (1-cd.h)*h, wB = (1-cd.l)*h, bH = Math.max(bB-bT,1.5);
        return (<g key={i}><line x1={x} y1={wT} x2={x} y2={wB} stroke={up ? (dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.65)") : v(0.14)} strokeWidth={1} /><rect x={x-cw*0.32} y={bT} width={cw*0.64} height={bH} fill={up ? (dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.7)") : v(0.04)} stroke={up ? (dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.7)") : v(0.12)} strokeWidth={0.6} rx={1.5} /></g>);
      })}
    </svg>
  </div>);
}

function FPatternViz({ dark }) {
  const v = V(dark);
  const patterns = [{label:"checkout-flow",pct:94,saving:"$312/mo"},{label:"search-query",pct:68,saving:"$180/mo"},{label:"onboarding-v2",pct:45,saving:"$95/mo"},{label:"support-chat",pct:28,saving:"$42/mo"}];
  return (<div>
    {patterns.map((p, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: i===0?"8px 8px":"6px 0", background: i===0?(dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.025)"):"transparent", borderRadius: i===0?8:0, margin: i===0?"0 -8px 4px":"0 0 4px", opacity: 0, animation: `rowSlide 0.5s cubic-bezier(0.16,1,0.3,1) ${0.7+i*0.1}s forwards` }}>
      <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: i===0?(dark?"#fff":"#000"):"rgba(128,128,128,0.7)", width: 90 }}>{p.label}</span>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: dark?v(0.025):"rgba(0,0,0,0.08)" }}><div style={{ width: `${p.pct}%`, height: "100%", borderRadius: 3, background: i===0?(dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.75)"):v(0.1), boxShadow: i===0?(dark?"0 0 20px rgba(255,255,255,0.15)":"0 0 16px rgba(0,0,0,0.12)"):"none", transformOrigin: "left", transform: "scaleX(0)", animation: `barFill 0.7s cubic-bezier(0.16,1,0.3,1) ${0.9+i*0.12}s forwards` }} /></div>
      <span style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: i===0?(dark?"#fff":"#000"):"rgba(128,128,128,0.5)", width: 52, textAlign: "right" }}>{p.saving}</span>
    </div>))}
    <div style={{ textAlign: "right", marginTop: 8, fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.35)" }}>Total: <span style={{ color: dark?"#fff":"#000", fontWeight: 600 }}>$629/mo saved</span></div>
  </div>);
}

function FProxyViz({ dark }) {
  const pct = useCounter(34, 1000, 800);
  return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
    <div style={{ position: "relative", width: 90, height: 90, marginBottom: 14 }}>
      <svg width={90} height={90} viewBox="0 0 90 90"><circle cx="45" cy="45" r="38" fill="none" stroke={dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.08)"} strokeWidth="4" /><circle cx="45" cy="45" r="38" fill="none" stroke={dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.6)"} strokeWidth="4" strokeDasharray={`${239*0.06} ${239*0.94}`} strokeLinecap="round" transform="rotate(-90 45 45)" style={{ strokeDashoffset: 239*0.06, animation: "ringDraw 1s cubic-bezier(0.16,1,0.3,1) 0.7s forwards" }} /></svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 22, fontWeight: 720, color: dark?"#fff":"#000", fontFamily: "'IBM Plex Mono', monospace", textShadow: dark?"0 0 20px rgba(255,255,255,0.3)":"0 0 14px rgba(0,0,0,0.12)", opacity: 0, animation: "numIn 0.6s cubic-bezier(0.16,1,0.3,1) 1s forwards" }}>5ms</span>
      </div>
    </div>
    {[{l:"Proxy route",w:"40%"},{l:"Budget check",w:"30%"},{l:"Cache lookup",w:"24%"}].map((it,i)=>(<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", opacity: 0, animation: `rowSlide 0.4s ease-out ${1.1+i*0.08}s forwards` }}><span style={{ fontSize: 8.5, fontFamily: "'IBM Plex Mono', monospace", color: dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.35)", width: 62 }}>{it.l}</span><div style={{ flex: 1, height: 4, borderRadius: 2, background: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.08)" }}><div style={{ width: it.w, height: "100%", borderRadius: 2, background: dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)", transformOrigin: "left", transform: "scaleX(0)", animation: `barFill 0.6s cubic-bezier(0.16,1,0.3,1) ${1.2+i*0.1}s forwards` }} /></div></div>))}
  </div>);
}

function FTraceViz({ dark }) {
  const spans = [{name:"proxy.forward",ms:5,s:0},{name:"cache.lookup",ms:8,s:2},{name:"provider.openai",ms:719,s:17,main:true},{name:"response.stream",ms:680,s:30,main:true},{name:"log.ingest",ms:34,s:736}];
  return (<div>
    {spans.map((sp,i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 30px", gap: 8, alignItems: "center", padding: sp.main&&sp.ms>700?"5px 6px":"3px 0", background: sp.main&&sp.ms>700?(dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.03)"):"transparent", borderRadius: sp.main&&sp.ms>700?6:0, opacity: 0, animation: `rowSlide 0.45s cubic-bezier(0.16,1,0.3,1) ${0.5+i*0.08}s forwards` }}>
      <span style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: sp.main?(dark?"rgba(255,255,255,0.9)":"#000"):(dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.35)") }}>{sp.name}</span>
      <div style={{ height: 5, borderRadius: 3, background: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.1)", position: "relative" }}><div style={{ position: "absolute", left: `${(sp.s/770)*100}%`, width: `${Math.max((sp.ms/770)*100,1.5)}%`, height: "100%", borderRadius: 3, background: sp.main?(dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.75)"):(dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)"), boxShadow: sp.main&&sp.ms>700?(dark?"0 0 20px rgba(255,255,255,0.12)":"0 0 14px rgba(0,0,0,0.1)"):"none" }} /></div>
      <span style={{ fontSize: 8, fontFamily: "'IBM Plex Mono', monospace", color: sp.main?(dark?"rgba(255,255,255,0.7)":"#000"):(dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.25)"), textAlign: "right" }}>{sp.ms}ms</span>
    </div>))}
  </div>);
}

function FCacheViz({ dark }) {
  const pct = useCounter(34, 1000, 800);
  return (<div style={{ display: "flex", alignItems: "center", gap: 20, padding: "4px 0" }}>
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <svg width={80} height={80} viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" fill="none" stroke={dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.08)"} strokeWidth="6" /><circle cx="40" cy="40" r="32" fill="none" stroke={dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.6)"} strokeWidth="6" strokeDasharray={`${201*0.34} ${201*0.66}`} strokeLinecap="round" transform="rotate(-90 40 40)" style={{ strokeDashoffset: 201*0.34, animation: "donutDraw 1.2s cubic-bezier(0.16,1,0.3,1) 0.9s forwards" }} /></svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 680, color: dark?"#fff":"#000", fontFamily: "'IBM Plex Mono', monospace", textShadow: dark?"0 0 20px rgba(255,255,255,0.3)":"0 0 16px rgba(0,0,0,0.15)" }}>{pct}%</span>
        <span style={{ fontSize: 7.5, color: dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.5)", fontFamily: "'IBM Plex Mono', monospace" }}>hit rate</span>
      </div>
    </div>
    <div style={{ flex: 1 }}>
      {[{l:"Cached responses",v:"12.4k"},{l:"Provider calls saved",v:"4,216"},{l:"Monthly savings",v:"$420"}].map((r,i)=>(<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: i<2?`1px solid ${dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)"}`:"none", opacity: 0, animation: `rowSlide 0.4s ease-out ${1+i*0.1}s forwards` }}>
        <span style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.4)" }}>{r.l}</span>
        <span style={{ fontSize: 9.5, fontFamily: "'IBM Plex Mono', monospace", color: dark?"#fff":"#000", fontWeight: 600 }}>{r.v}</span>
      </div>))}
    </div>
  </div>);
}

function FPromptLabViz({ dark }) {
  const v = V(dark);
  const models = [{name:"gpt-4o",quality:94,cost:"$0.030",latency:"1.4s",best:true},{name:"claude-sonnet",quality:91,cost:"$0.012",latency:"1.2s"},{name:"gpt-4o-mini",quality:76,cost:"$0.003",latency:"0.8s"},{name:"gemini-flash",quality:68,cost:"$0.001",latency:"0.3s"}];
  return (<div>
    <div style={{ display: "grid", gridTemplateColumns: "80px 44px 1fr 34px", gap: 6, padding: "0 0 6px", borderBottom: `1px solid ${dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.05)"}`, fontSize: 7.5, fontFamily: "'IBM Plex Mono', monospace", color: dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.25)", textTransform: "uppercase" }}><span>Model</span><span>Cost</span><span>Quality</span><span>Speed</span></div>
    {models.map((m,i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "80px 44px 1fr 34px", gap: 6, alignItems: "center", padding: m.best?"7px 6px":"5px 0", background: m.best?(dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.03)"):"transparent", borderRadius: m.best?6:0, margin: m.best?"2px -6px":0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, opacity: 0, animation: `rowSlide 0.45s cubic-bezier(0.16,1,0.3,1) ${0.9+i*0.1}s forwards` }}>
      <span style={{ color: m.best?(dark?"#fff":"#000"):(dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)") }}>{m.name}</span>
      <span style={{ color: m.best?(dark?"rgba(255,255,255,0.7)":"#000"):(dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.3)") }}>{m.cost}</span>
      <div style={{ height: 4, borderRadius: 2, background: dark?v(0.025):"rgba(0,0,0,0.08)" }}><div style={{ width: `${m.quality}%`, height: "100%", borderRadius: 2, background: m.best?(dark?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.75)"):v(0.09), boxShadow: m.best?(dark?"0 0 18px rgba(255,255,255,0.12)":"0 0 14px rgba(0,0,0,0.1)"):"none", transformOrigin: "left", transform: "scaleX(0)", animation: `barFill 0.6s cubic-bezier(0.16,1,0.3,1) ${1.1+i*0.1}s forwards` }} /></div>
      <span style={{ color: m.best?(dark?"rgba(255,255,255,0.6)":"#000"):(dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.25)"), textAlign: "right" }}>{m.latency}</span>
    </div>))}
  </div>);
}

// ─── Features Bento Section ───
export function FeaturesBento({ dark }) {
  const c = C(dark);
  const tt = (d) => ({ fontSize: 15.5, fontWeight: 620, color: d?"rgba(255,255,255,0.95)":"rgba(0,0,0,0.85)", margin: "0 0 6px", letterSpacing: "-0.01em" });
  const td = (d) => ({ color: d?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.6)", fontWeight: 400 });
  return (
    <section style={{ padding: "100px 32px 80px", maxWidth: 1120, margin: "0 auto", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Reveal delay={0} y={16} scale={1} blur={4}><div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 100, background: dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)", border: `1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}`, fontSize: 11.5, fontWeight: 500, color: dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.5)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 22 }}>Features</div></Reveal>
        <Reveal delay={0.08} y={24} scale={1} blur={6}><h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", color: dark?"rgba(255,255,255,0.95)":"#000", margin: "0 0 14px", lineHeight: 1.08 }}>Everything you need to<br />control LLM costs</h2></Reveal>
        <Reveal delay={0.16} y={18} scale={1} blur={4}><p style={{ fontSize: 16, color: dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.55)", maxWidth: 420, margin: "0 auto", lineHeight: 1.55 }}>From real-time monitoring to automatic optimization. No SDK changes required.</p></Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr", gap: 12, marginBottom: 12 }}>
        <BCard dark={dark} delay={0.1}><BVis dark={dark} style={{ minHeight: 180 }}><CandlesViz dark={dark} /></BVis><div style={{ padding: "18px 20px 20px" }}><h3 style={tt(dark)}><span style={{ fontWeight: 700 }}>Cost candles.</span>{" "}<span style={td(dark)}>OHLC charts, daily trends, per-user spend breakdowns.</span></h3></div></BCard>
        <BCard dark={dark} delay={0.2}><BVis dark={dark} style={{ minHeight: 180 }}><FTraceViz dark={dark} /></BVis><div style={{ padding: "18px 20px 20px" }}><h3 style={tt(dark)}><span style={{ fontWeight: 700 }}>Real-time traces.</span>{" "}<span style={td(dark)}>Full request waterfall. SSE-powered live view.</span></h3></div></BCard>
        <BCard dark={dark} delay={0.3}><BVis dark={dark} style={{ minHeight: 180 }}><FProxyViz dark={dark} /></BVis><div style={{ padding: "18px 20px 20px" }}><h3 style={tt(dark)}><span style={{ fontWeight: 700 }}>5ms overhead.</span>{" "}<span style={td(dark)}>Cloudflare Workers at the edge.</span></h3></div></BCard>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12, marginBottom: 12 }}>
        <BCard dark={dark} delay={0.45}><BVis dark={dark}><FPatternViz dark={dark} /></BVis><div style={{ padding: "18px 20px 20px" }}><h3 style={tt(dark)}><span style={{ fontWeight: 700 }}>Pattern detection.</span>{" "}<span style={td(dark)}>Identifies repeating prompts. Suggests cheaper models.</span></h3></div></BCard>
        <BCard dark={dark} delay={0.55}><BVis dark={dark}><FCacheViz dark={dark} /></BVis><div style={{ padding: "18px 20px 20px" }}><h3 style={tt(dark)}><span style={{ fontWeight: 700 }}>Semantic caching.</span>{" "}<span style={td(dark)}>Skip provider calls for similar prompts.</span></h3></div></BCard>
      </div>
      <BCard dark={dark} delay={0.7}><BVis dark={dark}><FPromptLabViz dark={dark} /></BVis><div style={{ padding: "18px 20px 20px" }}><h3 style={tt(dark)}><span style={{ fontWeight: 700 }}>Prompt Lab.</span>{" "}<span style={td(dark)}>Compare models on cost, latency, quality, and determinism.</span></h3></div></BCard>
    </section>
  );
}
