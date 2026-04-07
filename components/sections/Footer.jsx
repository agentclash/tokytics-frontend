"use client";
import { useInView } from "../../hooks";

// ─── Signal pulse rings ───
function SignalPulse({ dark, visible }) {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 48, height: 48, pointerEvents: "none" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", inset: -12 - i * 16,
          borderRadius: "50%",
          border: `1px solid ${dark ? `rgba(255,255,255,${0.04 - i * 0.012})` : `rgba(0,0,0,${0.04 - i * 0.012})`}`,
          animation: visible ? `ftPulseRing 3s ease-out ${i * 0.6}s infinite` : "none",
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

// ─── Footer telemetry stream ───
function FooterStream({ dark, visible }) {
  const items = [
    "proxy.healthy", "nodes=12", "uptime=99.97%", "region=edge-global",
    "cache.hit=34.2%", "p95=5ms", "providers=4", "keys.encrypted",
    "budget.active", "logs.streaming", "v2.4.1", "tls=1.3",
  ];
  return (
    <div style={{ overflow: "hidden", height: 20, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
      <div style={{ display: "flex", gap: 28, whiteSpace: "nowrap", animation: "ftScroll 40s linear infinite", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}>
        {[...Array(3)].flatMap((_, j) => items.map((t, i) => (
          <span key={`${j}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
            {t}
          </span>
        )))}
      </div>
    </div>
  );
}

// ─── Animated logo ───
function AnimatedLogo({ dark, visible }) {
  return (
    <div style={{ position: "relative" }}>
      <SignalPulse dark={dark} visible={visible} />
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: dark ? "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)" : "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)"}`,
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: dark ? "inset 0 1px 0 rgba(255,255,255,0.05)" : "inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 16px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          {[
            { x: 6, h: 8, delay: 0.4 },
            { x: 11, h: 14, delay: 0.5 },
            { x: 16, h: 10, delay: 0.6 },
          ].map((bar, i) => (
            <rect key={i} x={bar.x} y={20 - bar.h} width="3" height={bar.h} rx="1.5"
              fill={dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
              style={{
                transformOrigin: `${bar.x + 1.5}px 20px`,
                transform: visible ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${bar.delay}s`,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Status badge ───
function StatusBadge({ dark, visible }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 14px", borderRadius: 8,
      background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
      fontFamily: "'IBM Plex Mono', monospace",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: "all 0.5s ease 0.8s",
    }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 3, borderRadius: 1,
            height: [8, 12, 6, 10, 7][i],
            background: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
            animation: visible ? `ftBar ${1 + i * 0.2}s ease-in-out ${0.9 + i * 0.08}s infinite alternate` : "none",
          }} />
        ))}
      </div>
      <span style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>
        All systems operational
      </span>
      <div style={{
        width: 5, height: 5, borderRadius: "50%",
        background: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
        animation: visible ? "ftDot 2s infinite" : "none",
      }} />
    </div>
  );
}

// ─── Footer Section ───
export function Footer({ dark }) {
  const [ref, visible] = useInView(0.08);

  const linkCols = [
    { title: "Product", links: ["Features", "Pricing", "Docs", "API Reference", "Changelog"] },
    { title: "Resources", links: ["Blog", "Guides", "Status", "Community", "Support"] },
    { title: "Company", links: ["About", "Careers", "Contact", "Partners"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
  ];

  return (
    <footer ref={ref} style={{ padding: "0 32px 0", maxWidth: 1080, margin: "0 auto", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      {/* Divider */}
      <div style={{ height: 1, position: "relative", marginBottom: 64, overflow: "hidden", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "30%", background: dark ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" : "linear-gradient(90deg, transparent, rgba(0,0,0,0.12), transparent)", animation: visible ? "ftSweep 4s ease-in-out infinite" : "none" }} />
      </div>

      {/* Main content */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 48, marginBottom: 48 }}>
        <div style={{ flex: "0 0 280px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>
          <AnimatedLogo dark={dark} visible={visible} />
          <div style={{ marginTop: 18, marginBottom: 14 }}>
            <span style={{ fontSize: 18, fontWeight: 660, letterSpacing: "-0.02em", color: dark ? "rgba(255,255,255,0.8)" : "#000" }}>Tokytics</span>
          </div>
          <p style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.4)", lineHeight: 1.55, margin: "0 0 24px", maxWidth: 230 }}>
            LLM observability & cost management. One proxy for all your AI providers.
          </p>
          <StatusBadge dark={dark} visible={visible} />
        </div>

        <div style={{ display: "flex", gap: 40, flex: 1, justifyContent: "flex-end" }}>
          {linkCols.map((col, ci) => (
            <div key={ci} style={{ minWidth: 100, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.25 + ci * 0.08}s` }}>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 16 }}>{col.title}</div>
              {col.links.map((link, li) => (
                <div key={li} style={{ fontSize: 13, marginBottom: 10, cursor: "pointer", color: dark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.42)", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.target.style.color = dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.8)"}
                  onMouseLeave={e => e.target.style.color = dark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.42)"}
                >{link}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ paddingTop: 24, borderTop: `1px solid ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"}` }}>
        <FooterStream dark={dark} visible={visible} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 32px" }}>
          <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.25)" }}>
            © 2025 Tokytics Inc. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { d: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "X" },
              { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22", label: "GitHub" },
              { d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z", label: "LinkedIn" },
              { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", label: "Discord" },
            ].map((icon, i) => (
              <div key={i} className="ft-social" style={{
                width: 32, height: 32, borderRadius: 8,
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `all 0.4s ease ${0.5 + i * 0.08}s`,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d={icon.d} stroke={dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
