import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { labelTarget } from "./label-target.mjs";
const repo = "owner/repo";
const item = {
  number: 42,
  state: "open",
  created_at: "2026-11-01",
  base: { repo: { full_name: repo } },
  head: { ref: "feature", sha: "head" },
  merge_commit_sha: "merge",
};
const signal = {
  event: "pull_request_review",
  conclusion: "success",
  path: ".github/workflows/label-review.yml",
  repository: { full_name: repo },
  display_title: "Label review #42",
  head_branch: "feature",
  head_sha: "head",
  pull_requests: [],
};
const resolve = (run = {}, pr = {}) =>
  labelTarget({
    eventName: "workflow_run",
    event: { workflow_run: { id: 7 } },
    repo,
    get: async (path) =>
      path.includes("/actions/runs/") ? { ...signal, ...run } : { ...item, ...pr },
  });
test("review signal resolves fresh matching fork PR even without associated PR list", async () => {
  assert.deepEqual(await resolve(), { number: 42, createdAt: "2026-11-01", kind: "PR" });
  assert(await resolve({ head_sha: "merge" }));
});
test("rejects wrong workflow, event, repository, conclusion, title or association", async () => {
  for (const run of [
    { path: ".github/workflows/evil.yml" },
    { event: "push" },
    { conclusion: "failure" },
    { repository: { full_name: "other/repo" } },
    { display_title: "Label review #42; echo unsafe" },
    { display_title: "Label review #0" },
    { pull_requests: [{ number: 99 }] },
    { head_branch: "unrelated" },
    { head_sha: "outdated" },
  ])
    assert.equal(await resolve(run), null);
});
test("rejects closed, unrelated or invalid PR target", async () => {
  for (const pr of [
    { state: "closed" },
    { base: { repo: { full_name: "other/repo" } } },
    { created_at: "bad" },
    { number: 0 },
  ])
    assert.equal(await resolve({}, pr), null);
});
test("direct issues, PRs and human comments retain target selection", async () => {
  for (const eventName of ["issues", "pull_request_target", "issue_comment"]) {
    const event =
      eventName === "pull_request_target"
        ? { pull_request: item }
        : { issue: item, comment: { user: { type: "User" } } };
    assert.equal((await labelTarget({ eventName, event, repo })).number, 42);
  }
  assert.equal(
    await labelTarget({
      eventName: "issue_comment",
      event: { issue: item, comment: { user: { type: "Bot" } } },
      repo,
    }),
    null
  );
  assert.equal(await labelTarget({ eventName: "push", event: { issue: item }, repo }), null);
});
test("review workflow cannot execute PR code; privileged jobs pin trusted checkout", async () => {
  const signal = parse(
    await readFile(new URL("../workflows/label-review.yml", import.meta.url), "utf8")
  );
  assert.deepEqual(signal.on.pull_request_review.types, ["submitted", "edited", "dismissed"]);
  assert.deepEqual(signal.permissions, {});
  assert.equal(signal.jobs.signal.steps.length, 1);
  assert(!signal.jobs.signal.steps[0].uses);
  const workflow = parse(
    await readFile(new URL("../workflows/label.yml", import.meta.url), "utf8")
  );
  assert.deepEqual(workflow.on.workflow_run.workflows, ["Label review signal"]);
  for (const job of Object.values(workflow.jobs)) {
    for (const step of job.steps.filter((s) => s.uses?.startsWith("actions/checkout@"))) {
      assert.equal(step.with.ref, "${{ github.event.repository.default_branch }}");
      assert.equal(step.with["persist-credentials"], false);
    }
  }
  assert.equal(workflow.jobs.label.needs, "target");
  assert.equal(
    workflow.jobs.label.concurrency.group,
    "label-${{ github.repository }}-${{ needs.target.outputs.number }}"
  );
});
