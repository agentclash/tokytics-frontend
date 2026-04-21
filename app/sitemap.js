const SITE_URL = "https://tokytics.com";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Add entries below as their pages land (200):
    //   /features, /docs, /docs/quickstart, /docs/openai-proxy,
    //   /docs/anthropic-proxy, /docs/semantic-caching, /pricing,
    //   /security, /api-reference, /blog,
    //   /guides/llm-cost-tracking, /guides/semantic-caching-for-llms,
    //   /compare/tokytics-vs-helicone, /compare/tokytics-vs-langfuse,
    //   /compare/tokytics-vs-litellm
  ];
}
