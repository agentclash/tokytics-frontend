"use client";
import { useInView, useCounterVis } from "../../hooks";

// ─── Provider Constellation ───
function ProviderConstellation({ dark, visible }) {
  const W = 900, H = 580;
  const cx = W / 2, cy = 340;

  const providers = [
    { name: "OpenAI",    x: 60,  y: 60,  delay: 0.5 },
    { name: "Anthropic", x: 740, y: 40,  delay: 0.7 },
    { name: "Google",    x: 30,  y: 510, delay: 0.9 },
    { name: "Cohere",    x: 760, y: 530, delay: 1.1 },
    { name: "Mistral",   x: 100, y: 310, delay: 0.6 },
    { name: "Groq",      x: 720, y: 300, delay: 0.8 },
  ];

  const threads = [
    `M${cx},${cy} C${cx-40},${cy} ${cx-80},${cy-5} ${cx-120},${cy-15} C${cx-180},${cy-40} ${cx-240},${cy-100} ${cx-280},${cy-160} S${cx-320},${cy-230} 100,80`,
    `M${cx},${cy} C${cx-40},${cy} ${cx-80},${cy+5} ${cx-120},${cy+15} C${cx-180},${cy+40} ${cx-240},${cy+80} ${cx-300},${cy+130} S${cx-360},${cy+170} 70,530`,
    `M${cx},${cy} C${cx-40},${cy} ${cx-80},${cy-2} ${cx-130},${cy-5} C${cx-180},${cy-8} ${cx-230},${cy-10} ${cx-270},${cy-8} S${cx-300},${cy-5} 140,330`,
    `M${cx},${cy} C${cx+40},${cy} ${cx+80},${cy-5} ${cx+120},${cy-15} C${cx+180},${cy-40} ${cx+240},${cy-100} ${cx+280},${cy-160} S${cx+300},${cy-250} 780,60`,
    `M${cx},${cy} C${cx+40},${cy} ${cx+80},${cy+5} ${cx+120},${cy+15} C${cx+180},${cy+40} ${cx+240},${cy+80} ${cx+300},${cy+130} S${cx+340},${cy+180} 800,550`,
    `M${cx},${cy} C${cx+40},${cy} ${cx+80},${cy-2} ${cx+130},${cy-5} C${cx+180},${cy-8} ${cx+230},${cy-10} ${cx+270},${cy-8} S${cx+300},${cy-5} 760,320`,
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b1" />
            <feMerge><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dotGlow"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        {threads.map((d, i) => (
          <path key={`bg-${i}`} d={d} fill="none" stroke={dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)"} strokeWidth="1.5" strokeLinecap="round" />
        ))}

        {threads.map((d, i) => (
          <path key={`line-${i}`} d={d} fill="none" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} strokeWidth="1" strokeLinecap="round" filter={dark ? "url(#threadGlow)" : undefined} style={{ strokeDasharray: 600, strokeDashoffset: visible ? 0 : 600, transition: `stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s` }} />
        ))}

        {threads.map((d, i) => (
          <g key={`dots-${i}`}>
            <circle r="2" fill={dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)"} filter={dark ? "url(#dotGlow)" : undefined} style={{ opacity: visible ? 0.8 : 0, transition: `opacity 0.6s ease ${1.5 + i * 0.2}s` }}>
              <animateMotion dur={`${5 + i * 0.7}s`} repeatCount="indefinite" begin={`${i * 0.9}s`}><mpath href={`#thread${i}`} /></animateMotion>
            </circle>
            <circle r="1.5" fill={dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"} style={{ opacity: visible ? 0.5 : 0, transition: `opacity 0.6s ease ${1.8 + i * 0.2}s` }}>
              <animateMotion dur={`${5 + i * 0.7}s`} repeatCount="indefinite" begin={`${i * 0.9 + 2.5}s`}><mpath href={`#thread${i}`} /></animateMotion>
            </circle>
            <path id={`thread${i}`} d={d} fill="none" stroke="none" />
          </g>
        ))}

        <circle cx={cx} cy={cy} r="20" fill="none" stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"} strokeWidth="1" style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0)", transformOrigin: `${cx}px ${cy}px`, transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.2s" }} />
        <circle cx={cx} cy={cy} r="36" fill="none" stroke={dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} strokeWidth="1" style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.5)", transformOrigin: `${cx}px ${cy}px`, transition: "all 1s cubic-bezier(0.34,1.56,0.64,1) 1.3s" }} />
        <circle cx={cx} cy={cy} r="3" fill={dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"} filter={dark ? "url(#dotGlow)" : undefined} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 1.4s" }} />

        {providers.map((p, i) => {
          const endPoints = [[100,80],[780,60],[70,530],[800,550],[140,330],[760,320]];
          const [nx, ny] = endPoints[i];
          return (
            <circle key={`node-${i}`} cx={nx} cy={ny} r="3" fill={dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"} stroke={dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"} strokeWidth="1" style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0)", transformOrigin: `${nx}px ${ny}px`, transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.12}s` }} />
          );
        })}
      </svg>

      {providers.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, transform: "translate(-50%, -50%)", opacity: visible ? 1 : 0, transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${p.delay}s`, animation: visible ? `ctaFloat${i % 4} ${6 + i * 0.5}s ease-in-out ${p.delay + 1.5}s infinite` : "none" }}>
          <div style={{ padding: "9px 18px", borderRadius: 11, background: dark ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" : "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 100%)", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`, backdropFilter: "blur(10px)", boxShadow: dark ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.2)" : "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)", boxShadow: dark ? "0 0 6px rgba(255,255,255,0.15)" : "none" }} />
            <span style={{ fontSize: 12, fontWeight: 580, fontFamily: "'IBM Plex Mono', monospace", color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}>{p.name}</span>
          </div>
        </div>
      ))}

      <div style={{ position: "absolute", left: "50%", top: "58.5%", transform: "translate(-50%, -50%)", opacity: visible ? 1 : 0, transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 1.4s" }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, background: dark ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 100%)" : "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: dark ? "0 0 40px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)" : "0 0 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 24px rgba(0,0,0,0.06)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M16 16V10M12 16V6M8 16v-4" stroke={dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── CTA Section ───
export function CTA({ dark }) {
  const [ref, visible] = useInView(0.12);
  const reqCount = useCounterVis(10000, 1800, 1000, visible);
  return (
    <section ref={ref} style={{ padding: "60px 32px 80px", maxWidth: 1080, margin: "0 auto", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      <div className="cta-inner" style={{
        borderRadius: 28, padding: "80px 48px 72px", position: "relative", overflow: "hidden", minHeight: 560,
        background: dark ? "linear-gradient(180deg, rgba(255,255,255,0.018) 0%, rgba(255,255,255,0.005) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
        backdropFilter: "blur(20px)",
        boxShadow: dark ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 80px rgba(0,0,0,0.15)" : "inset 0 1px 0 rgba(255,255,255,0.7), 0 20px 80px rgba(0,0,0,0.04)",
      }}>
        <ProviderConstellation dark={dark} visible={visible} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 180, borderRadius: "50%", background: dark ? "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 65%)" : "radial-gradient(ellipse, rgba(0,0,0,0.012) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.3s" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, marginBottom: 28, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, fontFamily: "'IBM Plex Mono', monospace", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", animation: visible ? "ctaPulse 2s infinite" : "none" }} />
            <span style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)" }}>Free tier: <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "#000", fontWeight: 600 }}>{reqCount.toLocaleString()}</span> req/mo</span>
          </div>
          <h2 className="cta-heading" style={{ fontSize: 48, fontWeight: 760, letterSpacing: "-0.05em", color: dark ? "rgba(255,255,255,0.95)" : "#000", margin: "0 0 8px", lineHeight: 1.04, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>Start saving on</h2>
          <h2 className="cta-heading" style={{ fontSize: 48, fontWeight: 760, letterSpacing: "-0.05em", color: dark ? "rgba(255,255,255,0.95)" : "#000", margin: "0 0 14px", lineHeight: 1.04, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s" }}>LLM costs today.</h2>
          <p style={{ fontSize: 16.5, color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.5)", maxWidth: 380, margin: "0 auto 0", lineHeight: 1.55, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.65s" }}>No credit card. No SDK changes. Set up in 30 seconds.</p>
          <div style={{ height: 80 }} />
          <div className="cta-buttons" style={{ display: "flex", justifyContent: "center", gap: 14, opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.75s" }}>
            <span className="cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 40px", borderRadius: 14, cursor: "pointer", background: dark ? "linear-gradient(180deg, #ffffff 0%, #f5f5f5 20%, #ebebeb 45%, #e0e0e0 70%, #d6d6d6 100%)" : "linear-gradient(180deg, #4a4a56 0%, #353540 18%, #252530 40%, #18181f 65%, #0a0a0e 100%)", color: dark ? "#0b0b0f" : "#fff", fontSize: 16.5, fontWeight: 620, boxShadow: dark ? "0 4px 12px rgba(255,255,255,0.2), 0 10px 40px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.5)" : "0 4px 12px rgba(0,0,0,0.15), 0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.15)" }}>Start for free <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "17px 36px", borderRadius: 14, cursor: "pointer", background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.75)", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)", fontSize: 16.5, fontWeight: 480, backdropFilter: "blur(8px)" }}>Talk to us</span>
          </div>
          <div className="cta-badges" style={{ marginTop: 32, display: "flex", justifyContent: "center", gap: 28, fontFamily: "'IBM Plex Mono', monospace" }}>
            {["Free tier","No credit card","SOC 2","< 5ms overhead"].map((t,i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: visible ? 1 : 0, transition: `all 0.5s ease ${1+i*0.1}s` }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"} strokeWidth="1.5" /><path d="M8 12l3 3 5-5" stroke={dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 14, strokeDashoffset: visible ? 0 : 14, transition: `stroke-dashoffset 0.5s ease ${1.2+i*0.12}s` }} /></svg>
                <span style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
