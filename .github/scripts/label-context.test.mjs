import assert from "node:assert/strict";
import test from "node:test";
import { buildLabelContext } from "./label-context.mjs";
const repo = "owner/repo";
const parse = (prompt) => JSON.parse(prompt.slice(prompt.indexOf("\n") + 1));
function fixture({
  pr = true,
  files = [],
  reviews = [],
  related = [],
  comments = [],
  timeline = [],
  fail,
  limited = false,
} = {}) {
  const calls = [];
  let limitedOnce = false;
  return {
    calls,
    fetch: async (url, init) => {
      const u = new URL(url);
      calls.push(u.pathname + u.search);
      assert(!init.method || init.method === "GET");
      if (fail) return new Response("", { status: 403 });
      if (limited && !limitedOnce) {
        limitedOnce = true;
        return new Response("", { status: 429 });
      }
      const page = +(u.searchParams.get("page") ?? 1);
      if (u.pathname.endsWith("/files"))
        return Response.json(files.slice((page - 1) * 100, page * 100));
      if (u.pathname.endsWith("/reviews"))
        return Response.json(reviews.slice((page - 1) * 100, page * 100));
      if (u.pathname.endsWith("/timeline"))
        return Response.json(timeline.slice((page - 1) * 100, page * 100));
      if (u.pathname.endsWith("/comments"))
        return Response.json(comments.slice((page - 1) * 100, page * 100));
      if (u.pathname === "/search/issues") return Response.json({ items: related });
      const number = Number(u.pathname.split("/").at(-1));
      return Response.json({
        number,
        title: "fix: example",
        state: number === 1 ? "open" : "closed",
        state_reason: number === 1 ? null : "completed",
        created_at: number === 1 ? "2026-11-07" : "2026-10-01",
        closed_at: number === 1 ? null : "2026-11-01",
        body: "Related work",
        user: { login: "author", type: "User" },
        author_association: "COLLABORATOR",
        ...(pr ? { pull_request: {} } : {}),
      });
    },
  };
}
const run = (f, extra = {}) =>
  buildLabelContext({ repo, number: 1, token: "test", fetch: f.fetch, ...extra });
test("includes replacement discussion, review state and paths without label verdicts", async () => {
  const f = fixture({
    related: [{ number: 2, created_at: "2026-10-01" }],
    comments: [
      {
        user: { login: "author", type: "User" },
        author_association: "CONTRIBUTOR",
        body: "Closing in favor of #1",
        created_at: "2026-11-01",
      },
    ],
    reviews: [
      {
        user: { login: "maintainer", type: "User" },
        author_association: "COLLABORATOR",
        state: "CHANGES_REQUESTED",
        body: "",
        submitted_at: "2026-11-01",
      },
    ],
    files: [{ filename: "packages/cli/index.ts", status: "modified" }],
  });
  const ctx = parse(await run(f));
  assert.equal(ctx.related[0].state, "closed");
  assert.match(ctx.related[0].comments[0].body, /in favor/);
  assert.equal(ctx.reviews[0].state, "CHANGES_REQUESTED");
  assert.equal(ctx.reviews[0].body, "");
  assert.equal(ctx.files[0].path, "packages/cli/index.ts");
  assert.equal(ctx.filesOmitted, false);
  assert(!("labels" in ctx));
});
test("omits pending reviews and preserves bot identity", async () => {
  const f = fixture({
    reviews: [
      { user: { login: "reviewer", type: "Bot" }, state: "APPROVED", submitted_at: "2026-11-01" },
      { user: { login: "m" }, state: "PENDING" },
    ],
  });
  const ctx = parse(await run(f));
  assert.equal(ctx.reviews.length, 1);
  assert.equal(ctx.reviews[0].isBot, true);
});
test("does not fetch PR APIs for issues", async () => {
  const f = fixture({ pr: false });
  const ctx = parse(await run(f));
  assert(!("files" in ctx));
  assert(!f.calls.some((x) => x.includes("/pulls/")));
});
test("ignores foreign-repository cross references", async () => {
  const f = fixture({
    timeline: [
      {
        event: "cross-referenced",
        source: {
          issue: { number: 999, repository_url: "https://api.github.com/repos/other/repo" },
        },
      },
    ],
  });
  await run(f);
  assert(!f.calls.some((x) => x.includes("/999")));
});
test("bounds context and marks omissions, including paginated files", async () => {
  const f = fixture({
    files: Array.from({ length: 130 }, (_, n) => ({ filename: `src/${n}.ts`, status: "modified" })),
    related: Array.from({ length: 6 }, (_, n) => ({ number: n + 2, created_at: "2026-10-01" })),
    comments: Array.from({ length: 10 }, () => ({
      user: { login: "m", type: "User" },
      body: "x".repeat(9000),
    })),
    reviews: Array.from({ length: 25 }, () => ({
      user: { login: "m" },
      state: "APPROVED",
      submitted_at: "2026-11-01",
      body: "x".repeat(9000),
    })),
  });
  const prompt = await run(f),
    ctx = parse(prompt);
  assert(prompt.length < 24500);
  assert.equal(ctx.files.length, 100);
  assert.equal(ctx.filesOmitted, true);
  assert.equal(ctx.relatedOmitted, true);
  assert(ctx.related.every((r) => r.commentsOmitted));
  assert.equal(ctx.reviewsOmitted, true);
  assert(f.calls.some((x) => x.includes("files?per_page=100&page=2")));
});
test("permission errors stop collection instead of returning empty evidence", async () => {
  await assert.rejects(run(fixture({ fail: true })), /unavailable/);
});
test("rate limits retry automatically with bounded waits", async () => {
  const waits = [];
  const ctx = parse(await run(fixture({ limited: true }), { sleep: async (ms) => waits.push(ms) }));
  assert.equal(ctx.current.number, 1);
  assert.equal(waits.length, 1);
  assert(waits[0] <= 60000);
});
test("rejects invalid inputs before network access", async () => {
  const f = fixture();
  await assert.rejects(
    buildLabelContext({ repo: "owner/repo?bad", number: 1, token: "test", fetch: f.fetch })
  );
  assert.equal(f.calls.length, 0);
});

test("bounds patch excerpts and marks missing or truncated patches", async () => {
  const f = fixture({
    files: [
      ...Array.from({ length: 12 }, (_, n) => ({
        filename: `src/${n}.ts`,
        status: "modified",
        patch: "line\n".repeat(180),
      })),
      { filename: "generated.json", status: "modified", patch: "x".repeat(2000) },
    ],
  });
  const ctx = parse(await run(f));
  assert(ctx.files.reduce((total, file) => total + (file.patch?.length ?? 0), 0) <= 4000);
  assert(ctx.files.every((file) => file.patchOmitted));
  assert.equal(ctx.files.find((file) => file.path === "generated.json").patch, undefined);
});

test("parallel evidence reads are bounded and preserve deterministic context", async () => {
  const related = Array.from({ length: 5 }, (_, i) => ({
    number: i + 2,
    created_at: "2026-10-01",
  }));
  const plain = fixture({ related }),
    parallel = fixture({ related });
  let active = 0,
    maximum = 0;
  const actual = await buildLabelContext({
    repo,
    number: 1,
    token: "test",
    fetch: async (...args) => {
      active++;
      maximum = Math.max(maximum, active);
      try {
        await new Promise((resolve) => setTimeout(resolve, 5));
        return await parallel.fetch(...args);
      } finally {
        active--;
      }
    },
  });
  assert.equal(actual, await run(plain));
  assert.equal(maximum, 4);
  assert.equal(active, 0);
});
