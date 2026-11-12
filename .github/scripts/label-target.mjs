import { appendFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/** Resolve metadata only; never consume code or artifacts from the triggering run. */
export async function labelTarget({ eventName, event, repo, get }) {
  let item = event.issue ?? event.pull_request;
  if (eventName === "workflow_run") {
    const signal = event.workflow_run;
    if (!Number.isSafeInteger(signal?.id)) return null;
    const run = await get(`repos/${repo}/actions/runs/${signal.id}`);
    if (
      run.event !== "pull_request_review" ||
      run.conclusion !== "success" ||
      run.path !== ".github/workflows/label-review.yml" ||
      run.repository?.full_name !== repo
    )
      return null;
    // Fork review runs can have an empty pull_requests array. The run title is only a
    // candidate identifier: corroborate it with fresh PR metadata below.
    const match = /^Label review #(\d+)$/.exec(run.display_title ?? "");
    if (!match) return null;
    const number = Number(match[1]);
    if (!Number.isSafeInteger(number) || number < 1) return null;
    item = await get(`repos/${repo}/pulls/${number}`);
    if (
      item.base?.repo?.full_name !== repo ||
      item.head?.ref !== run.head_branch ||
      ![item.head?.sha, item.merge_commit_sha].includes(run.head_sha)
    )
      return null;
    const linked = run.pull_requests ?? [];
    if (linked.length && !linked.some((pr) => pr.number === number)) return null;
  } else if (eventName === "issue_comment" && event.comment?.user?.type === "Bot") {
    return null;
  } else if (!["issues", "pull_request_target", "issue_comment"].includes(eventName)) {
    return null;
  }
  if (
    !Number.isSafeInteger(item?.number) ||
    item.number < 1 ||
    item.state !== "open" ||
    !Number.isFinite(Date.parse(item.created_at))
  )
    return null;
  return {
    number: item.number,
    createdAt: item.created_at,
    kind: eventName === "workflow_run" || event.pull_request || item.pull_request ? "PR" : "issue",
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const get = async (path) => {
    const response = await fetch(`https://api.github.com/${path}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!response.ok) throw new Error(`Target lookup failed (${response.status})`);
    return response.json();
  };
  const target = await labelTarget({
    eventName: process.env.GITHUB_EVENT_NAME,
    event: JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8")),
    repo: process.env.GITHUB_REPOSITORY,
    get,
  });
  if (target)
    await appendFile(
      process.env.GITHUB_OUTPUT,
      `number=${target.number}\ncreated_at=${target.createdAt}\nkind=${target.kind}\n`
    );
}
