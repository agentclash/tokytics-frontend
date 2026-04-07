"use client";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: "rgba(255,255,255,0.85)",
        gap: 16,
        padding: 32,
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -2,
          color: "#fff",
        }}
      >
        404
      </span>
      <p style={{ fontSize: 18, opacity: 0.6, maxWidth: 400 }}>
        This page doesn&apos;t exist. Maybe the URL is wrong, or it was removed.
      </p>
      <a
        href="/"
        style={{
          marginTop: 16,
          padding: "10px 24px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
