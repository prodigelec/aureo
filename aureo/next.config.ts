import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  // Empêche les navigateurs de deviner le Content-Type (MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Empêche l'intégration dans un iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Politique de référent minimale
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Désactive les APIs sensibles non utilisées
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // HSTS : forcer HTTPS (production uniquement)
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js a besoin de 'unsafe-inline' et 'unsafe-eval' en dev
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      // next/font/google auto-héberge les polices → pas besoin de fonts.gstatic.com
      "font-src 'self' data:",
      "connect-src 'self' https://autocomplete.clearbit.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
