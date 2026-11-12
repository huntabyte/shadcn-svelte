import { readFile } from "node:fs/promises";
import { guardLabelRemoval } from "./label-removal.mjs";
// Required preload: missing/corrupt context aborts before the CLI can mutate labels.
const baseline = JSON.parse(await readFile(process.env.LABEL_REMOVAL_CONTEXT, "utf8"));
globalThis.fetch = guardLabelRemoval(globalThis.fetch, baseline, (message) => console.log(message));
