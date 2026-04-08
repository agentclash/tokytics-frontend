"use client";
import { useInView } from "../../hooks";

// ─── Flowing Pipeline SVG ───
function FlowingPipeline({ dark, visible }) {
  const pathD = "M80,30 C80,120 520,120 520,210 C520,300 80,300 80,390 C80,480 520,480 520,570 C520,660 80,660 80,750";
  return (
    <svg className="hiw-pipeline" width="600" height="780" viewBox="0 0 600 780" style={{ position: "absolute", left: "50%", top: 20, transform: "translateX(-50%)", pointerEvents: "none", zIndex: 0 }}>
      <defs>
        <filter id="nodeGlow"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b1" /><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b2" /><feMerge><feMergeNode in="b1" /><feMergeNode in="b2" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {dark ? (<>
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeLinecap="round" filter="url(#innerGlow)" style={{ strokeDasharray: 1900, strokeDashoffset: visible?0:1900, transition: "stroke-dashoffset 3s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
      </>) : (<>
        <path d={pathD} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="4" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" strokeLinecap="round" style={{ strokeDasharray: 1900, strokeDashoffset: visible?0:1900, transition: "stroke-dashoffset 3s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
      </>)}
      {[0,1,2].map(i => (<circle key={i} r={dark?"2.5":"2"} fill={dark?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.5)"} filter={dark?"url(#innerGlow)":undefined} style={{ opacity: visible?0.8:0, transition: `opacity 0.5s ease ${1+i*0.3}s` }}><animateMotion dur={`${5+i*0.5}s`} repeatCount="indefinite" begin={`${i*1.5}s`}><mpath href="#fp" /></animateMotion></circle>))}
      <path id="fp" d={pathD} fill="none" stroke="none" />
      {[30,210,390,570].map((y,i) => { const x = i%2===0?80:520; return (
        <g key={i}>
          <circle cx={x} cy={y} r="18" fill="none" stroke={dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.04)"} strokeWidth="1" style={{ opacity: visible?1:0, transform: visible?"scale(1)":"scale(0.5)", transformOrigin: `${x}px ${y}px`, transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.5+i*0.25}s` }} />
          <circle cx={x} cy={y} r="6" fill={dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.1)"} stroke={dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.2)"} strokeWidth="1.5" style={{ opacity: visible?1:0, transform: visible?"scale(1)":"scale(0)", transformOrigin: `${x}px ${y}px`, transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.6+i*0.25}s` }} />
          <circle cx={x} cy={y} r="2" fill={dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.6)"} style={{ opacity: visible?1:0, transition: `opacity 0.4s ease ${0.9+i*0.25}s` }} />
        </g>);
      })}
    </svg>
  );
}

function HIWStep({ num, title, desc, children, dark, visible, delay, align }) {
  const isLeft = align === "left";
  return (
    <div className="hiw-step" style={{ display: "flex", alignItems: "center", flexDirection: isLeft?"row":"row-reverse", position: "relative", zIndex: 2, height: 180 }}>
      <div className="hiw-step-text" style={{ width: "42%", opacity: visible?1:0, transform: visible?"translateX(0)":`translateX(${isLeft?"-40px":"40px"})`, transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", top: -36, [isLeft?"right":"left"]: -12, fontSize: 84, fontWeight: 800, letterSpacing: "-0.06em", color: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.08)", fontFamily: "'IBM Plex Sans'", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{num}</span>
          <div style={{ fontSize: 9.5, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace", color: dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.35)", marginBottom: 8, letterSpacing: "0.06em" }}>STEP {num}</div>
          <h3 style={{ fontSize: 20, fontWeight: 680, letterSpacing: "-0.025em", color: dark?"rgba(255,255,255,0.92)":"#000", margin: "0 0 8px" }}>{title}</h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: dark?"rgba(255,255,255,0.38)":"rgba(0,0,0,0.5)", margin: 0 }}>{desc}</p>
        </div>
      </div>
      <div className="hiw-spacer" style={{ width: "16%" }} />
      <div className="hiw-step-viz" style={{ width: "42%", opacity: visible?1:0, transform: visible?"translateX(0) scale(1)":`translateX(${isLeft?"30px":"-30px"}) scale(0.95)`, transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay+0.15}s` }}>
        <div style={{ borderRadius: 14, padding: "22px 20px", background: dark?"linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)":"linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 100%)", border: `1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.5)"}`, backdropFilter: "blur(12px)", boxShadow: dark?"inset 0 1px 0 rgba(255,255,255,0.04)":"inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px rgba(0,0,0,0.04)" }}>{children}</div>
      </div>
    </div>
  );
}

function HIWCode({ dark, visible }) {
  const lines = [[0,[["const ","keyword"],["res","method"],[" = ","punct"],["await ","keyword"],["fetch(","method"]]],[1,[["\"","punct"],["proxy.tokytics.dev","url"],["/v1/chat\"","punct"],[",","punct"]]],[1,[["{ ","punct"],["model","prop"],[": ","punct"],["\"gpt-4o\"","string"],[" }","punct"]]],[0,[[");","punct"]]]];
  return (<div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, lineHeight: 1.85 }}>
    {lines.map(([indent, parts], i) => (<div key={i} style={{ paddingLeft: indent*16, opacity: visible?1:0, transform: visible?"translateX(0)":"translateX(-10px)", transition: `all 0.4s ease ${0.5+i*0.1}s` }}>{parts.map(([t,type],j) => { const cl = {keyword:dark?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.45)",string:dark?"rgba(255,255,255,0.85)":"#000",prop:dark?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.6)",punct:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",method:dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.75)",url:dark?"rgba(255,255,255,0.95)":"#000"}; return <span key={j} style={{ color: cl[type]||cl.punct, fontWeight: type==="url"?550:400, textShadow: type==="url"&&dark?"0 0 12px rgba(255,255,255,0.15)":"none" }}>{t}</span>; })}</div>))}
    <div style={{ marginTop: 10, fontSize: 9, padding: "3px 8px", borderRadius: 4, background: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", color: dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.45)", display: "inline-block", opacity: visible?1:0, transition: "opacity 0.4s ease 1s" }}>↑ only change: base URL</div>
  </div>);
}

function HIWProxy({ dark, visible }) {
  return (<div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
    {[{l:"Route",t:"1.2ms",p:24},{l:"Cache",t:"0.8ms",p:16},{l:"Budget",t:"0.5ms",p:10},{l:"Forward",t:"2.5ms",p:50}].map((ck,i)=>(<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, opacity: visible?1:0, transform: visible?"translateX(0)":"translateX(-12px)", transition: `all 0.4s ease ${0.6+i*0.12}s` }}>
      <span style={{ fontSize: 9, width: 44, color: dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.45)" }}>{ck.l}</span>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)" }}><div style={{ width: `${ck.p}%`, height: "100%", borderRadius: 2, background: dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)", transformOrigin: "left", transform: visible?"scaleX(1)":"scaleX(0)", transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.8+i*0.12}s` }} /></div>
      <span style={{ fontSize: 8.5, width: 30, textAlign: "right", color: dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)" }}>{ck.t}</span>
    </div>))}
    <div style={{ marginTop: 10, textAlign: "center", fontSize: 18, fontWeight: 720, color: dark?"rgba(255,255,255,0.9)":"#000", textShadow: dark?"0 0 20px rgba(255,255,255,0.2)":"0 0 14px rgba(0,0,0,0.08)", opacity: visible?1:0, transform: visible?"scale(1)":"scale(0.8)", transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.3s" }}>5ms</div>
  </div>);
}

function HIWIngest({ dark, visible }) {
  return (<div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
    {[{m:"gpt-4o",t:"1,847",c:"$0.03"},{m:"sonnet",t:"923",c:"$0.01"},{m:"flash",t:"412",c:"$0.00"}].map((r,i)=>(<div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, padding: "4px 0", borderBottom: i<2?`1px solid ${dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)"}`:"none", fontSize: 10, opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(8px)", transition: `all 0.4s ease ${0.6+i*0.15}s` }}>
      <span style={{ color: dark?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.6)" }}>{r.m}</span><span style={{ color: dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.35)" }}>{r.t}</span><span style={{ color: dark?"rgba(255,255,255,0.7)":"#000", fontWeight: 600 }}>{r.c}</span>
    </div>))}
    <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: visible?1:0, transition: "opacity 0.4s ease 1.1s" }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.3)", animation: visible?"blink 1.5s infinite":"none" }} />
      <span style={{ fontSize: 9, color: dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)" }}>streaming to ClickHouse</span>
    </div>
  </div>);
}

function HIWDash({ dark, visible }) {
  const bars = [3,5,4,7,6,8,7,10,8,6,5,7];
  return (<div style={{ textAlign: "center" }}>
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, height: 50, marginBottom: 12 }}>
      {bars.map((h,i) => (<div key={i} style={{ width: 8, borderRadius: 2, height: visible?h*4.5:0, background: i===7?(dark?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.65)"):(dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"), boxShadow: i===7?(dark?"0 0 12px rgba(255,255,255,0.1)":"none"):"none", transition: `height 0.6s cubic-bezier(0.16,1,0.3,1) ${0.6+i*0.05}s` }} />))}
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 20, fontFamily: "'IBM Plex Mono', monospace" }}>
      {[{v:"$1.2k",l:"saved"},{v:"34%",l:"cached"},{v:"842ms",l:"p95"}].map((s,i) => (<div key={i} style={{ opacity: visible?1:0, transition: `opacity 0.4s ease ${1+i*0.1}s` }}><div style={{ fontSize: 13, fontWeight: 680, color: dark?"rgba(255,255,255,0.85)":"#000" }}>{s.v}</div><div style={{ fontSize: 8, color: dark?"rgba(255,255,255,0.22)":"rgba(0,0,0,0.3)", marginTop: 1 }}>{s.l}</div></div>))}
    </div>
  </div>);
}

// ─── How It Works Section ───
export function HowItWorks({ dark }) {
  const [ref, visible] = useInView(0.08);
  return (
    <section ref={ref} className="section-pad" style={{ padding: "100px 32px 100px", maxWidth: 1020, margin: "0 auto", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 100, background: dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)", border: `1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}`, fontSize: 11.5, fontWeight: 500, color: dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.5)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 22, opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(12px)", transition: "all 0.6s ease 0.1s" }}>How it works</div>
        <h2 className="section-heading" style={{ fontSize: 42, fontWeight: 720, letterSpacing: "-0.04em", color: dark?"rgba(255,255,255,0.95)":"#000", margin: "0 0 18px", lineHeight: 1.06, opacity: visible?1:0, transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>One proxy.<br />Full visibility.</h2>
        <p style={{ fontSize: 16, color: dark?"rgba(255,255,255,0.38)":"rgba(0,0,0,0.5)", maxWidth: 380, margin: "0 auto", lineHeight: 1.6, opacity: visible?1:0, transition: "opacity 0.6s ease 0.3s" }}>Point your LLM calls at our proxy. We handle caching, budgets, logging, and analytics.</p>
      </div>
      <div className="hiw-container" style={{ position: "relative", minHeight: 800, marginBottom: 40 }}>
        <FlowingPipeline dark={dark} visible={visible} />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column" }}>
          <HIWStep num="01" title="Your app calls our proxy" desc="Swap your base URL. OpenAI, Anthropic, Google — all work. Zero SDK changes." dark={dark} visible={visible} delay={0.3} align="left"><HIWCode dark={dark} visible={visible} /></HIWStep>
          <HIWStep num="02" title="Edge proxy in 5ms" desc="Cloudflare Workers route, check cache, enforce budgets, and forward." dark={dark} visible={visible} delay={0.55} align="right"><HIWProxy dark={dark} visible={visible} /></HIWStep>
          <HIWStep num="03" title="Async log ingest" desc="Every request, token count, latency, and cost streams into ClickHouse." dark={dark} visible={visible} delay={0.8} align="left"><HIWIngest dark={dark} visible={visible} /></HIWStep>
          <HIWStep num="04" title="See everything" desc="Cost candles, trace waterfalls, pattern detection — real-time in your dashboard." dark={dark} visible={visible} delay={1.05} align="right"><HIWDash dark={dark} visible={visible} /></HIWStep>
        </div>
      </div>
    </section>
  );
}
