// gta6-meme-x-01 v3: "Jury Duty on Launch Day"
// A Leonida County jury summons for Jason Duval — report date May 26, 2026,
// the morning GTA VI launches. Served by an AI agent on make.fun.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

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

console.log(JSON.stringify({ ...entry, imageBytes }, null, 2));
