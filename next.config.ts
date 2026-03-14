import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/oz-to-ml",
        destination: "/floz-to-ml",
        permanent: true,
      },
      {
        source: "/ml-to-oz",
        destination: "/ml-to-floz",
        permanent: true,
      },
      {
        source: "/cups-to-oz",
        destination: "/cups-to-floz",
        permanent: true,
      },
      {
        source: "/oz-to-cups",
        destination: "/floz-to-cups",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
