#!/usr/bin/env node
// Check domain availability on Cloudflare Registrar, 20 per request.
// usage: check.mjs domain.com other.ai ...   → "OPEN  name  $price/yr" or "taken name  reason"
// Needs `npx -y cf@latest auth login` (or CLOUDFLARE_API_TOKEN) once.
import { spawnSync } from "node:child_process";

const domains = [...new Set(process.argv.slice(2).map((d) => d.trim().toLowerCase()).filter(Boolean))];
if (!domains.length) {
  console.error("usage: check.mjs domain.com other.ai ...");
  process.exit(2);
}

let failed = false;
for (let i = 0; i < domains.length; i += 20) {
  const batch = domains.slice(i, i + 20);
  const run = spawnSync("npx", ["-y", "cf@latest", "registrar", "registrations", "check", ...batch], { encoding: "utf8" });
  const out = run.stdout || "";
  const start = out.indexOf("{");
  if (start < 0) {
    console.error(`batch ${batch[0]}…: ${(run.stderr || out).trim() || "no output (not logged in? run: npx -y cf@latest auth login)"}`);
    failed = true;
    continue;
  }
  const json = JSON.parse(out.slice(start));
  for (const d of json.domains || json.result?.domains || []) {
    console.log(d.registrable ? `OPEN  ${d.name}  $${d.pricing.registration_cost}/yr` : `taken ${d.name}  ${d.reason || ""}`);
  }
}
process.exit(failed ? 1 : 0);
