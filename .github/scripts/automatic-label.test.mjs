import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { automaticPolicy, runAutomaticLabels } from "./automatic-label.mjs";
const event = (name, type = "Bot", login = "github-actions[bot]", id = 1, event = "labeled") => ({
  id,
  event,
  label: { name },
  actor: { type, login },
  created_at: `2026-11-07T00:00:0${id}Z`,
});
const policy = {
  prompt: "Repository rules",
  labels: {
    duplicate: { context: "similar_issues", apply_when: "Same redundant scope" },
    feature: { apply_when: "New functionality" },
    slop: { threshold: 0.9, apply_when: "Direct description authorship evidence" },
    "needs reproduction": { apply_when: "Existing runtime defect" },
  },
};
test("every configured label retains automatic application and literal meaning", () => {
  const result = automaticPolicy(policy, { rows: [], omitted: false });
  assert.equal(Object.keys(result.labels).length, 4);
  for (const name of Object.keys(policy.labels)) {
    assert.notEqual(result.labels[name].can_apply, false);
    assert.deepEqual(result.labels[name].apply_when, policy.labels[name].apply_when);
  }
  assert.equal(result.labels.duplicate.context, "similar_issues");
  assert.equal(result.labels.slop.threshold, 0.9);
});
test("cleanup permits all current action-owned label categories", () => {
  const result = automaticPolicy(policy, {
    rows: Object.keys(policy.labels).map((name) => event(name)),
    omitted: false,
  });
  for (const entry of Object.values(result.labels)) assert.equal(entry.can_remove, true);
  assert.equal(
    automaticPolicy(
      { labels: { feature: { can_remove: false } } },
      {
        rows: [event("feature")],
        omitted: false,
      }
    ).labels.feature.can_remove,
    true
  );
});
test("later human application, removal, unknown actor and incomplete history preserve labels", () => {
  for (const history of [
    { rows: [event("duplicate"), event("duplicate", "User", "maintainer", 2)], omitted: false },
    {
      rows: [event("duplicate"), event("duplicate", "User", "maintainer", 2, "unlabeled")],
      omitted: false,
    },
    { rows: [event("duplicate", "Bot", "another-bot")], omitted: false },
    { rows: [event("duplicate")], omitted: true },
  ])
    assert.equal(automaticPolicy(policy, history).labels.duplicate.can_remove, false);
});
test("orchestrates unmodified CLI arguments without shell evaluation, uses one batched invocation and cleans temp policies", async () => {
  let active = 0,
    max = 0;
  const paths = [];
  await runAutomaticLabels({
    repo: "owner/repo",
    number: 1,
    policy,
    history: { rows: [], omitted: false },
    prompt: "Untrusted text: $(echo nope)",
    dryRun: true,
    run: async (exe, args) => {
      assert.equal(exe, process.execPath);
      assert(args.includes("--dry-run"));
      assert(args.includes("--remove"));
      assert.equal(args[args.indexOf("--prompt") + 1], "Untrusted text: $(echo nope)");
      const config = args[args.indexOf("--config") + 1];
      paths.push(config);
      const p = JSON.parse(await readFile(config, "utf8"));
      assert.equal(Object.keys(p.labels).length, 4);
      active++;
      max = Math.max(max, active);
      await new Promise((r) => setTimeout(r, 5));
      active--;
      return { stdout: "checked" };
    },
  });
  assert.equal(max, 1);
  assert.equal(paths.length, 1);
  for (const p of paths) await assert.rejects(readFile(p));
});
