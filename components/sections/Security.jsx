"use client";
import { useState, useEffect } from "react";
import { useInView } from "../../hooks";

// ─── Encryption stream ───
function EncryptionStream({ dark, visible, delay = 0 }) {
  const [bytes, setBytes] = useState([]);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      const gen = () => Array.from({ length: 18 }, () => Math.random().toString(16).substr(2, 2));
      setBytes(gen());
      const iv = setInterval(() => setBytes(gen()), 2000);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [visible, delay]);

  return (
    <div style={{
      display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center",
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5,
      opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${delay}s`,
    }}>
      {bytes.map((b, i) => (
        <span key={i} style={{
          color: dark ? `rgba(255,255,255,${0.1 + Math.random() * 0.25})` : `rgba(0,0,0,${0.1 + Math.random() * 0.2})`,
          transition: "color 0.8s ease",
        }}>{b}</span>
      ))}
    </div>
  );
}

// ─── Key flow visual ───
function KeyFlowVisual({ dark, visible }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2200),
      setTimeout(() => setStage(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const stages = [
    { label: "API key received", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.7 5.7L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.6a1 1 0 01.3-.7l6.9-7A6 6 0 0121 9z" },
    { label: "Encrypting in memory", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
    { label: "Forwarded to provider", icon: "M13 7l5 5m0 0l-5 5m5-5H6" },
    { label: "Purged from memory", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
      <div style={{
        position: "absolute", left: 15, top: 18, bottom: 18, width: 2, borderRadius: 1,
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        <div style={{
          width: "100%", height: `${Math.min(stage, 4) * 33.33}%`,
          background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
          borderRadius: 1, transition: "height 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>

      {stages.map((s, i) => {
        const active = stage > i;
        const current = stage === i + 1;
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "10px 0",
            opacity: active ? 1 : 0.3,
            transform: active ? "translateX(0)" : "translateX(-8px)",
            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: current
                ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")
                : (dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"),
              border: `1.5px solid ${active
                ? (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)")
                : (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)")}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: current ? (dark ? "0 0 16px rgba(255,255,255,0.06)" : "0 0 12px rgba(0,0,0,0.04)") : "none",
              transition: "all 0.4s ease",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d={s.icon} stroke={active ? (dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)") : (dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)")} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <span style={{
                fontSize: 12, fontWeight: active ? 580 : 400,
                color: active ? (dark ? "rgba(255,255,255,0.85)" : "#000") : (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"),
                fontFamily: "'IBM Plex Mono', monospace",
                transition: "all 0.4s ease",
              }}>{s.label}</span>
              {current && <span style={{
                display: "inline-block", width: 2, height: 12, marginLeft: 4,
                background: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                borderRadius: 1, animation: "secCursor 0.8s step-end infinite",
              }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Audit log ───
function AuditLog({ dark, visible }) {
  const [lines, setLines] = useState([]);
  const allLines = [
    { time: "14:32:01", event: "auth.verify", status: "pass", detail: "JWT valid" },
    { time: "14:32:01", event: "key.decrypt", status: "pass", detail: "AES-256" },
    { time: "14:32:02", event: "budget.check", status: "pass", detail: "$0.03 < $5.00" },
    { time: "14:32:02", event: "provider.fwd", status: "pass", detail: "openai/gpt-4o" },
    { time: "14:32:03", event: "key.purge", status: "done", detail: "memory cleared" },
  ];

  useEffect(() => {
    if (!visible) return;
    const timers = allLines.map((_, i) =>
      setTimeout(() => setLines(prev => [...prev, allLines[i]]), 800 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5 }}>
      <div style={{
        display: "grid", gridTemplateColumns: "52px 72px 32px 1fr", gap: 6,
        padding: "0 0 6px", marginBottom: 4,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}`,
        fontSize: 8, color: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)",
        textTransform: "uppercase", letterSpacing: "0.05em",
      }}>
        <span>time</span><span>event</span><span>status</span><span>detail</span>
      </div>
      <div style={{ minHeight: 130 }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "52px 72px 32px 1fr", gap: 6,
            padding: "4px 0",
            opacity: 1, animation: `secRowIn 0.35s ease`,
          }}>
            <span style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)" }}>{l.time}</span>
            <span style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.6)" }}>{l.event}</span>
            <span style={{
              fontSize: 8.5, fontWeight: 550,
              color: l.status === "pass"
                ? (dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")
                : (dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"),
            }}>{l.status === "pass" ? "✓" : "●"}</span>
            <span style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>{l.detail}</span>
          </div>
        ))}
        {lines.length < allLines.length && visible && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 0" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", animation: "secBlink 1s infinite" }} />
            <span style={{ fontSize: 9, color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)" }}>logging...</span>
          </div>
        )}
        {lines.length >= allLines.length && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 0 0", marginTop: 4, borderTop: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}`, opacity: 0, animation: "secFadeIn 0.4s ease 0.3s forwards" }}>
            <span style={{ fontSize: 9, color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)" }}>✓ request complete — zero keys persisted</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Security Section ───
export function Security({ dark }) {
  const [ref, visible] = useInView(0.08);

  return (
    <section ref={ref} className="section-pad" style={{ padding: "100px 32px 80px", maxWidth: 1080, margin: "0 auto", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 100, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)", border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`, fontSize: 11.5, fontWeight: 500, color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.5)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 22, opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.1s" }}>Security</div>
        <h2 className="section-heading" style={{ fontSize: 42, fontWeight: 720, letterSpacing: "-0.04em", color: dark ? "rgba(255,255,255,0.95)" : "#000", margin: "0 0 16px", lineHeight: 1.06, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
          Your keys never<br />touch disk.
        </h2>
        <p style={{ fontSize: 16, color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.5)", maxWidth: 420, margin: "0 auto", lineHeight: 1.6, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          Zero-knowledge proxy. Provider keys pass through encrypted, never stored. Every request authenticated at the edge.
        </p>
      </div>

      <div className="security-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
        {/* Card 1: Key Flow */}
        <div style={{ borderRadius: 16, overflow: "hidden", background: dark ? "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.008) 100%)" : "#ffffff", border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)"}`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s" }}>
          <div style={{ margin: "12px 12px 0", borderRadius: 10, padding: "20px 16px", background: dark ? "rgba(255,255,255,0.012)" : "#f6f7fb", border: `1px solid ${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"}` }}>
            <KeyFlowVisual dark={dark} visible={visible} />
          </div>
          <div style={{ padding: "16px 18px 18px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 650, color: dark ? "rgba(255,255,255,0.92)" : "#000", margin: "0 0 5px" }}>Zero-knowledge pass-through</h3>
            <p style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.5)", margin: 0, lineHeight: 1.45 }}>Keys are encrypted in memory, forwarded, and immediately purged. Nothing persisted.</p>
          </div>
        </div>

        {/* Card 2: Audit Log */}
        <div style={{ borderRadius: 16, overflow: "hidden", background: dark ? "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.008) 100%)" : "#ffffff", border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)"}`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s" }}>
          <div style={{ margin: "12px 12px 0", borderRadius: 10, padding: "16px 14px", background: dark ? "rgba(255,255,255,0.012)" : "#f6f7fb", border: `1px solid ${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"}` }}>
            <AuditLog dark={dark} visible={visible} />
          </div>
          <div style={{ padding: "16px 18px 18px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 650, color: dark ? "rgba(255,255,255,0.92)" : "#000", margin: "0 0 5px" }}>Immutable audit trail</h3>
            <p style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.5)", margin: 0, lineHeight: 1.45 }}>Every auth, forward, and budget check logged. RBAC controls. 7-365 day retention.</p>
          </div>
        </div>

        {/* Card 3: Encryption */}
        <div style={{ borderRadius: 16, overflow: "hidden", background: dark ? "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.008) 100%)" : "#ffffff", border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)"}`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s" }}>
          <div style={{ margin: "12px 12px 0", borderRadius: 10, padding: "20px 16px", background: dark ? "rgba(255,255,255,0.012)" : "#f6f7fb", border: `1px solid ${dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)"}`, minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 56, height: 56 }}>
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke={dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1.5" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke={dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"} strokeWidth="1.5" strokeDasharray="20 131" strokeLinecap="round" style={{ animation: visible ? "secSpin 3s linear infinite" : "none" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 12l2 2 4-4" stroke={dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 12, strokeDashoffset: visible ? 0 : 12, transition: "stroke-dashoffset 0.6s ease 1.2s" }} />
                  </svg>
                </div>
              </div>
            </div>
            <EncryptionStream dark={dark} visible={visible} delay={0.8} />
          </div>
          <div style={{ padding: "16px 18px 18px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 650, color: dark ? "rgba(255,255,255,0.92)" : "#000", margin: "0 0 5px" }}>AES-256 in transit</h3>
            <p style={{ fontSize: 12.5, color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.5)", margin: 0, lineHeight: 1.45 }}>V8 isolates. Dedicated ClickHouse nodes. SOC 2 compliant infrastructure. Encrypted at rest.</p>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="trust-badges" style={{ display: "flex", justifyContent: "center", gap: 32, padding: "28px 0", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}` }}>
        {[
          { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "AES-256" },
          { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "SOC 2" },
          { icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2", label: "V8 Isolates" },
          { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Zero-knowledge" },
          { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "RBAC" },
        ].map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)", transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.8 + i * 0.08}s` }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d={b.icon} stroke={dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)" }}>{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
