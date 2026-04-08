"use client";
import { useState } from "react";
import { useInView, useTypingReveal } from "../../hooks";

function QSCodeLine({ parts, indent = 0, dark }) {
  return (<div style={{ paddingLeft: indent*18, lineHeight: 1.85 }}>
    {parts.map(([t,type],i) => { const cl = {keyword:dark?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.45)",string:dark?"rgba(255,255,255,0.85)":"#000",prop:dark?"rgba(255,255,255,0.55)":"rgba(0,0,0,0.6)",punct:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",comment:dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.25)",method:dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.75)",url:dark?"rgba(255,255,255,0.95)":"#000"}; return <span key={i} style={{ color: cl[type]||cl.punct, fontWeight: type==="url"||type==="string"?550:400, textShadow: type==="url"&&dark?"0 0 12px rgba(255,255,255,0.15)":"none" }}>{t}</span>; })}
  </div>);
}

const qsSnippets = {
  openai: { label: "OpenAI", lines: [
    {parts:[["import ","keyword"],["OpenAI ","method"],["from ","keyword"],["\"openai\"","string"]],indent:0},
    {parts:[[" ","punct"]],indent:0},
    {parts:[["const ","keyword"],["client ","method"],["= ","punct"],["new ","keyword"],["OpenAI","method"],["({","punct"]],indent:0},
    {parts:[["baseURL","prop"],[": ","punct"],["\"https://proxy.tokytics.dev/v1\"","url"],[",","punct"]],indent:1},
    {parts:[["apiKey","prop"],[": ","punct"],["process","method"],[".","punct"],["env","prop"],[".","punct"],["OPENAI_KEY","prop"]],indent:1},
    {parts:[["});","punct"]],indent:0},
    {parts:[[" ","punct"]],indent:0},
    {parts:[["// That's it. All calls now go through Tokytics.","comment"]],indent:0},
  ]},
  anthropic: { label: "Anthropic", lines: [
    {parts:[["import ","keyword"],["Anthropic ","method"],["from ","keyword"],["\"@anthropic-ai/sdk\"","string"]],indent:0},
    {parts:[[" ","punct"]],indent:0},
    {parts:[["const ","keyword"],["client ","method"],["= ","punct"],["new ","keyword"],["Anthropic","method"],["({","punct"]],indent:0},
    {parts:[["baseURL","prop"],[": ","punct"],["\"https://proxy.tokytics.dev/v1\"","url"],[",","punct"]],indent:1},
    {parts:[["apiKey","prop"],[": ","punct"],["process","method"],[".","punct"],["env","prop"],[".","punct"],["ANTHROPIC_KEY","prop"]],indent:1},
    {parts:[["});","punct"]],indent:0},
    {parts:[[" ","punct"]],indent:0},
    {parts:[["// Automatic cost tracking + caching enabled.","comment"]],indent:0},
  ]},
  curl: { label: "cURL", lines: [
    {parts:[["curl ","method"],["https://proxy.tokytics.dev/v1/chat/completions","url"],[" \\","punct"]],indent:0},
    {parts:[["-H ","keyword"],["\"Authorization: Bearer $API_KEY\"","string"],[" \\","punct"]],indent:1},
    {parts:[["-H ","keyword"],["\"Content-Type: application/json\"","string"],[" \\","punct"]],indent:1},
    {parts:[["-d ","keyword"],["'{","punct"]],indent:1},
    {parts:[["  \"model\"","prop"],[": ","punct"],["\"gpt-4o\"","string"],[",","punct"]],indent:1},
    {parts:[["  \"messages\"","prop"],[": ","punct"],["[{\"role\": \"user\", \"content\": \"Hello\"}]","string"]],indent:1},
    {parts:[["}'","punct"]],indent:1},
    {parts:[[" ","punct"]],indent:0},
    {parts:[["# Works with any provider.","comment"]],indent:0},
  ]},
};

export function Quickstart({ dark }) {
  const [ref, visible] = useInView(0.12);
  const [tab, setTab] = useState("openai");
  const [copied, setCopied] = useState(false);
  const snippet = qsSnippets[tab];
  const revealed = useTypingReveal(snippet.lines.length, visible, 0.5, 0.14);
  const allRevealed = revealed >= snippet.lines.length;
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <section ref={ref} className="section-pad" style={{ padding: "80px 32px 100px", maxWidth: 1020, margin: "0 auto", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      <div className="qs-flex" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
        <div className="qs-sidebar" style={{ flex: "0 0 340px", paddingTop: 20, opacity: visible?1:0, transform: visible?"translateX(0)":"translateX(-30px)", transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
          <div style={{ display: "inline-flex", padding: "5px 14px", borderRadius: 100, background: dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)", border: `1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}`, fontSize: 11.5, fontWeight: 500, color: dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.5)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 22 }}>Quickstart</div>
          <h2 className="section-heading" style={{ fontSize: 36, fontWeight: 720, letterSpacing: "-0.04em", color: dark?"rgba(255,255,255,0.95)":"#000", margin: "0 0 16px", lineHeight: 1.1 }}>Two lines.<br />That&apos;s the whole setup.</h2>
          <p style={{ fontSize: 15, color: dark?"rgba(255,255,255,0.38)":"rgba(0,0,0,0.5)", lineHeight: 1.6, margin: "0 0 28px" }}>Replace your provider's base URL with ours. Your API keys, models, and parameters stay exactly the same.</p>
          <div style={{ display: "flex", gap: 28, fontFamily: "'IBM Plex Mono', monospace" }}>
            {[{v:"2",l:"lines changed"},{v:"30s",l:"to integrate"},{v:"0",l:"dependencies"}].map((s,i)=>(<div key={i} style={{ opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(10px)", transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.6+i*0.12}s` }}><div style={{ fontSize: 20, fontWeight: 720, color: dark?"rgba(255,255,255,0.85)":"#000", textShadow: dark?"0 0 14px rgba(255,255,255,0.12)":"0 0 10px rgba(0,0,0,0.06)" }}>{s.v}</div><div style={{ fontSize: 9.5, color: dark?"rgba(255,255,255,0.22)":"rgba(0,0,0,0.32)", marginTop: 2 }}>{s.l}</div></div>))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, opacity: visible?1:0, transform: visible?"translateY(0) scale(1)":"translateY(20px) scale(0.97)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s" }}>
          <div style={{ borderRadius: 16, overflow: "hidden", background: dark?"linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)":"linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 100%)", border: `1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.5)"}`, backdropFilter: "blur(12px)", boxShadow: dark?"inset 0 1px 0 rgba(255,255,255,0.04)":"inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 32px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `1px solid ${dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i=><div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: dark?"rgba(255,255,255,0.06)":["#ff5f57","#ffbd2e","#28c840"][i], opacity: dark?1:0.5 }} />)}</div>
                <div style={{ display: "flex", gap: 2, marginLeft: 8, padding: 2, borderRadius: 7, background: dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)" }}>
                  {Object.entries(qsSnippets).map(([key,s])=>(<button key={key} onClick={()=>setTab(key)} style={{ padding: "4px 12px", borderRadius: 5, border: "none", cursor: "pointer", fontSize: 10.5, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, background: tab===key?(dark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.8)"):"transparent", color: tab===key?(dark?"rgba(255,255,255,0.8)":"#000"):(dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.35)"), transition: "all 0.25s ease" }}>{s.label}</button>))}
                </div>
              </div>
              <button onClick={handleCopy} style={{ padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", background: dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)", color: copied?(dark?"rgba(255,255,255,0.8)":"#000"):(dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)"), display: "flex", alignItems: "center", gap: 5, transition: "all 0.25s ease", transform: copied?"scale(1.05)":"scale(1)" }}>{copied?"✓ Copied":"Copy"}</button>
            </div>
            <div style={{ padding: "18px 22px 22px", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, minHeight: 210, position: "relative" }}>
              {snippet.lines.map((line, i) => { const isR = i<revealed, isC = i===revealed-1&&!allRevealed; return (
                <div key={`${tab}-${i}`} style={{ display: "flex", gap: 16, opacity: isR?1:0, transform: isR?"translateX(0)":"translateX(-6px)", transition: "all 0.25s ease" }}>
                  <span style={{ color: dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)", fontSize: 11, width: 16, textAlign: "right", flexShrink: 0, userSelect: "none" }}>{i+1}</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <QSCodeLine parts={line.parts} indent={line.indent} dark={dark} />
                    {isC && <span style={{ display: "inline-block", width: 2, height: 14, marginLeft: 2, background: dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.6)", borderRadius: 1, animation: "cursorBlink 0.8s step-end infinite", boxShadow: dark?"0 0 6px rgba(255,255,255,0.3)":"none" }} />}
                  </div>
                </div>);
              })}
              {allRevealed && <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 10, borderTop: `1px solid ${dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)"}`, opacity: 0, animation: "qsFadeIn 0.4s ease 0.3s forwards" }}>
                <span style={{ fontSize: 10.5, color: dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)", fontFamily: "'IBM Plex Mono', monospace" }}>✓ Ready — all LLM traffic now flows through Tokytics</span>
              </div>}
            </div>
            <div style={{ padding: "10px 22px", borderTop: `1px solid ${dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)"}`, display: "flex", alignItems: "center", gap: 8, fontFamily: "'IBM Plex Mono', monospace" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: allRevealed?(dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)"):(dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.15)"), boxShadow: allRevealed?(dark?"0 0 8px rgba(255,255,255,0.2)":"none"):"none", transition: "all 0.5s ease" }} />
              <span style={{ fontSize: 10, color: allRevealed?(dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.5)"):(dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.25)"), transition: "color 0.5s ease" }}>proxy.tokytics.dev</span>
              <span style={{ marginLeft: "auto", fontSize: 9, padding: "2px 8px", borderRadius: 4, background: allRevealed?(dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"):(dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)"), color: allRevealed?(dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.55)"):(dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.25)"), transition: "all 0.5s ease" }}>{allRevealed?"● connected":"○ waiting"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
