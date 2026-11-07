import { execFile } from "node:child_process";
import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { parse } from "yaml";

const exec = promisify(execFile);
const cleanupLabels = new Set(["duplicate", "slop", "needs reproduction"]);

/** Preserve human-applied labels; only these three bot-applied labels can be removed. */
export function labelPasses(policy, history) {
  const latest = new Map();
  for (const event of [...history.rows].sort(
    (a, b) => String(a.created_at).localeCompare(String(b.created_at)) || (a.id ?? 0) - (b.id ?? 0)
  )) {
    if (["labeled", "unlabeled"].includes(event.event) && event.label?.name)
      latest.set(event.label.name.toLowerCase(), event);
  }
  return Object.entries(policy.labels)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, entry]) => {
      const last = latest.get(name.toLowerCase());
      const canRemove =
        !history.omitted &&
        cleanupLabels.has(name) &&
        entry.can_remove !== false &&
        last?.event === "labeled" &&
        last.actor?.login === "github-actions[bot]" &&
        last.actor?.type === "Bot";
      const meaning = [
        `This pass evaluates only the GitHub label ${JSON.stringify(name)}.`,
        entry.description ?? "",
        entry.apply_when ? `Apply only when: ${entry.apply_when}` : "",
        entry.remove_when ? `Do not apply when: ${entry.remove_when}` : "",
        entry.examples?.length ? `Examples: ${JSON.stringify(entry.examples)}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      return {
        name,
        policy: {
          only_configured: true,
          prompt: [policy.prompt, meaning].filter(Boolean).join("\n\n"),
          labels: { [name]: { ...entry, can_remove: canRemove } },
        },
      };
    });
}

export async function runAutomaticLabels({
  repo,
  number,
  policy,
  history,
  prompt,
  dryRun = false,
  run = exec,
}) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo) || !Number.isSafeInteger(number) || number < 1)
    throw Error("Invalid labeling target");
  const dir = await mkdtemp(join(tmpdir(), "shadcn-label-"));
  try {
    const passes = labelPasses(policy, history);
    // Keep concurrency bounded. The published CLI is used unmodified for every decision.
    for (let offset = 0; offset < passes.length; offset += 2) {
      const results = await Promise.allSettled(
        passes.slice(offset, offset + 2).map(async (pass, index) => {
          const config = join(dir, `${offset + index}.json`);
          await writeFile(config, JSON.stringify(pass.policy));
          const args = [
            "--import",
            fileURLToPath(new URL("./guard-model-response.mjs", import.meta.url)),
            fileURLToPath(new URL("./node_modules/@ieedan/label/dist/bin.mjs", import.meta.url)),
            "label",
            "-R",
            repo,
            String(number),
            "--config",
            config,
            "--prompt",
            prompt,
            "--remove",
            ...(dryRun ? ["--dry-run"] : []),
          ];
          const result = await run(process.execPath, args, {
            env: process.env,
            maxBuffer: 2 * 1024 * 1024,
            timeout: 90000,
          });
          console.log(`Label pass: ${pass.name}\n${result.stdout}`);
        })
      );
      const failure = results.find((result) => result.status === "rejected");
      if (failure) throw failure.reason;
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await runAutomaticLabels({
      repo: process.env.GITHUB_REPOSITORY,
      number: Number(process.env.NUMBER),
      policy: parse(await readFile(".github/.label.yml", "utf8")),
      history: JSON.parse(await readFile("label-history.json", "utf8")),
      prompt: await readFile("label-context.txt", "utf8"),
    });
  } catch {
    console.error("Automatic labeling failed. Credential-bearing provider details are not logged.");
    process.exitCode = 1;
  }
}
