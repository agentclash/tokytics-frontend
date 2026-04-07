"use client";

export function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(!dark)} style={{
      width: 36, height: 36, borderRadius: 9, border: "none", cursor: "pointer",
      background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
      boxShadow: dark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
    }}>
      {dark ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/></svg>
        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </button>
  );
}
