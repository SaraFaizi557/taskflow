import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Arcjet ships WASM via paths that Turbopack cannot bundle on Windows.
  // Keep these as Node externals so they load at runtime instead.
  serverExternalPackages: [
    "@arcjet/next",
    "@arcjet/analyze",
    "@arcjet/analyze-wasm",
    "arcjet",
  ],
};

export default nextConfig;
