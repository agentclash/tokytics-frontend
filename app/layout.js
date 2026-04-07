import "./globals.css";

export const metadata = {
  title: "Tokytics — LLM Cost Observability",
  description:
    "Know what your LLM spend actually costs. Proxy worker for cost candles, trace waterfalls, and pattern-based savings.",
  metadataBase: new URL("https://tokytics.com"),
  openGraph: {
    title: "Tokytics — LLM Cost Observability",
    description:
      "Know what your LLM spend actually costs. Proxy worker for cost candles, trace waterfalls, and pattern-based savings.",
    url: "https://tokytics.com",
    siteName: "Tokytics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tokytics — LLM Cost Observability",
    description:
      "Know what your LLM spend actually costs. Proxy worker for cost candles, trace waterfalls, and pattern-based savings.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
