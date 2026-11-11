import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The JSON content store is read at runtime with fs — make sure it is
  // bundled into the serverless functions on Vercel.
  outputFileTracingIncludes: {
    "/**/*": ["./data/**/*"],
  },
  images: {
    // Fabric photography is served from the asset generation host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trae-api-cn.mchost.guru",
        pathname: "/api/ide/v1/text_to_image",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
