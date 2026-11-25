import { execFile } from "node:child_process";
import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { parse } from "yaml";

const exec = promisify(execFile);

/** Reevaluate every label, permitting removal only when this action last applied it. */
export function automaticPolicy(policy, history) {
  const latest = new Map();
  for (const event of [...history.rows].sort(
    (a, b) => String(a.created_at).localeCompare(String(b.created_at)) || (a.id ?? 0) - (b.id ?? 0)
  )) {
    if (["labeled", "unlabeled"].includes(event.event) && event.label?.name)
      latest.set(event.label.name.toLowerCase(), event);
  }
  const labels = Object.fromEntries(
    Object.entries(policy.labels).map(([name, entry]) => {
      const last = latest.get(name.toLowerCase());
      return [
        name,
        {
          ...entry,
          can_remove:
            !history.omitted &&
            last?.event === "labeled" &&
            last.actor?.login === "github-actions[bot]" &&
            last.actor?.type === "Bot",
        },
      ];
    })
  );
  return { ...policy, only_configured: true, labels };
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
    const config = join(dir, "policy.json");
    await writeFile(config, JSON.stringify(automaticPolicy(policy, history)));
    const removalContext = join(dir, "removal-context.json");
    await writeFile(removalContext, JSON.stringify({ repo, number, history }));
    // One CLI invocation: one request with all configured label questions.
    const args = [
      "--import",
      fileURLToPath(new URL("./guard-label-removal.mjs", import.meta.url)),
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
      env: { ...process.env, LABEL_REMOVAL_CONTEXT: removalContext },
      maxBuffer: 2 * 1024 * 1024,
      timeout: 90000,
    });
    console.log(result.stdout);
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
