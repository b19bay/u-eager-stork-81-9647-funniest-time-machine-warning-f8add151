import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "WARNING: Do not kill your grandfather. HR has already processed your termination.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  const chars = [...LINE];
  const bytes = Buffer.byteLength(LINE, "utf8");
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`line must be 1-120 characters, got ${chars.length}`);
  }
  if (bytes !== chars.length) {
    throw new Error("line must be ASCII only so bytes equal characters");
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    throw new Error("read-back mismatch: entry.txt differs from the line");
  }
}

main();
