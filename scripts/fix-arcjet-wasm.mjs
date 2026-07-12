import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const wasmMarker = join(
  root,
  "node_modules",
  "@arcjet",
  "analyze-wasm",
  "dist",
  "_virtual",
  "_.",
  "wasm",
  "arcjet_analyze_js_req.component.core3.js",
);

if (existsSync(wasmMarker)) {
  process.exit(0);
}

const pkg = JSON.parse(
  readFileSync(
    join(root, "node_modules", "@arcjet", "analyze-wasm", "package.json"),
    "utf8",
  ),
);

const cacheDir = join(root, "node_modules", ".cache");
mkdirSync(cacheDir, { recursive: true });

const tarball = join(cacheDir, `arcjet-analyze-wasm-${pkg.version}.tgz`);
if (!existsSync(tarball)) {
  execSync(`npm pack @arcjet/analyze-wasm@${pkg.version}`, {
    cwd: cacheDir,
    stdio: "inherit",
  });
}

const dest = join(
  root,
  "node_modules",
  "@arcjet",
  "analyze-wasm",
  "dist",
  "_virtual",
);
mkdirSync(dest, { recursive: true });

execSync(`tar -xzf "${tarball}" -C "${dest}" --strip-components=4 package/dist/_virtual/_./wasm`, {
  stdio: "inherit",
});

console.log("Restored @arcjet/analyze-wasm virtual WASM files for Windows.");
