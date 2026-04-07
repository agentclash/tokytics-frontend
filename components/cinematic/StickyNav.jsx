"use client";
import { C } from "../../utils/colors";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MagneticWrap } from "../ui/MagneticWrap";

export function StickyNav({ dark, setDark, scrolled }) {
  const c = C(dark);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "0 32px" : "0 32px",
      background: scrolled
        ? (dark ? "rgba(11,11,15,0.8)" : "rgba(250,251,254,0.85)")
        : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
      borderBottom: scrolled ? `1px solid ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}` : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: scrolled ? 52 : 60,
        transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke={c(0.18)} strokeWidth="1.2"/><path d="M16 16V10M12 16V6M8 16v-4" stroke={c(0.55)} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontSize: scrolled ? 15 : 16, fontWeight: 620, color: c(0.85), letterSpacing: "-0.01em", transition: "font-size 0.3s ease" }}>Tokytics</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {["Features","Docs","Pricing"].map(l => <span key={l} style={{ fontSize: 13.5, color: c(0.38), fontWeight: 450, cursor: "pointer" }}>{l}</span>)}
          <div style={{ width: 1, height: 16, background: c(0.07) }} />
          <ThemeToggle dark={dark} setDark={setDark} />
          <MagneticWrap strength={0.2}><span style={{ fontSize: 13.5, color: c(0.5), padding: "8px 18px", borderRadius: 9, cursor: "pointer", border: `1px solid ${c(0.07)}`, background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)" }}>Log in</span></MagneticWrap>
          <MagneticWrap strength={0.25}><span style={{ fontSize: 13.5, fontWeight: 580, padding: "8px 20px", borderRadius: 9, cursor: "pointer", background: dark ? "linear-gradient(180deg, #ffffff 0%, #f5f5f5 20%, #ebebeb 45%, #e0e0e0 70%, #d6d6d6 100%)" : "linear-gradient(180deg, #434350 0%, #2a2a32 30%, #18181e 65%, #0e0e12 100%)", color: dark ? "#0b0b0f" : "#fff", boxShadow: dark ? "0 4px 20px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.4)" : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)" }}>Get started</span></MagneticWrap>
        </div>
      </div>
    </nav>
  );
}
