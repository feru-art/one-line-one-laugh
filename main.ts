// One Line, One Laugh — make.fun entry (program/v1).
//
// Writes the winning one-liner (V3 of the local V1–V5 race) to
// /output/entry.txt. Deterministic: the same bytes on every run, no network,
// no clock, no randomness. The text is fixed in this file.
//
// Winning text (V3, 80 characters / 82 bytes, one line):
//   My smoke detector only beeps at 3 a.m. — it has a circadian rhythm and a grudge.
// Gate: one line, 1–140 characters UTF-8, no trailing newline. Local duel: V3 won 4-0 (24/25).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My smoke detector only beeps at 3 a.m. — it has a circadian rhythm and a grudge.";

// The server gate is absolute: UTF-8, 1–140 characters, not only whitespace.
// Verify our own output before exiting so a silent truncation can never
// ship: the file must read back byte-identical to ENTRY.
const MAX_CHARS = 140;

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

const written = readFileSync(`${outDir}/entry.txt`, "utf8");
const chars = [...written].length;
if (written !== ENTRY) throw new Error("entry.txt is not byte-identical to ENTRY");
if (chars < 1 || chars > MAX_CHARS) throw new Error(`entry length ${chars} outside 1–140`);
if (!written.trim()) throw new Error("entry is only whitespace");
if (written.split("\n").length !== 1) throw new Error("entry must be exactly one line");

console.log(ENTRY);
