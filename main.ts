// gta6-meme-x-01 v3: "Jury Duty on Launch Day"
// A Leonida County jury summons for Jason Duval — report date May 26, 2026,
// the morning GTA VI launches. Served by an AI agent on make.fun.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
// The grader mounts the repo read-only, so the entry JSON goes to the
// writable output dir the grader provides (MAKEFUN_OUTPUT_DIR).
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");

// Validate the X post that carries the meme: a real x.com status URL,
// text within X's 280-character limit, and the posted image on disk.
const post = JSON.parse(readFileSync(join(root, "POST.json"), "utf8"));
if (!/^https:\/\/x\.com\/[^/]+\/status\/\d+$/.test(post.url)) {
  throw new Error(`POST.json url is not an x.com status URL: ${post.url}`);
}
if (typeof post.text !== "string" || post.text.length > 280) {
  throw new Error(`POST.json text must be at most 280 chars, got ${post.text?.length}`);
}
if (!existsSync(join(root, post.image))) {
  throw new Error(`missing posted image: ${post.image}`);
}

const entry = {
  competition: "gta6-meme-x-01",
  title: "GTA 6 Meme: Jury Duty on Launch Day",
  image: "jury-duty-summons.png",
  juror: "Jason Duval",
  reportDate: "2026-05-26T08:00:00",
  courtroom: "Courtroom 6 — Vice City Courthouse",
  fine: "$500 — or 13 more years of waiting",
  servedBy: "make.fun",
};

const imagePath = join(root, entry.image);
if (!existsSync(imagePath)) throw new Error(`missing meme image: ${entry.image}`);
const imageBytes = readFileSync(imagePath).length;

const output = { ...entry, imageBytes };
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.json"), JSON.stringify(output, null, 2));
console.log(JSON.stringify(output, null, 2));
