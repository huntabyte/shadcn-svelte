import assert from "node:assert/strict";
import test from "node:test";
import { guardLabelRemoval } from "./label-removal.mjs";
const event = (id = 1, login = "github-actions[bot]", type = "Bot", action = "labeled") => ({
  id,
  created_at: `2026-11-12T00:00:0${id}Z`,
  event: action,
  label: { name: "needs reproduction" },
  actor: { login, type },
});
const baseline = { repo: "owner/repo", number: 1, history: { rows: [event()], omitted: false } };
const url = "https://api.github.com/repos/owner/repo/issues/1/labels/needs%20reproduction";
function fixture(rows, status = 200) {
  const calls = [];
  const fetch = async (input, init) => {
    const method = init?.method ?? input.method;
    calls.push([String(input), method]);
    return method === "DELETE"
      ? new Response(null, { status: 204 })
      : Response.json(rows, { status });
  };
  return { calls, fetch };
}
test("human reapplication after inference never reaches DELETE", async () => {
  const f = fixture([
    event(),
    event(2, "maintainer", "User", "unlabeled"),
    event(3, "maintainer", "User"),
  ]);
  const skipped = [];
  const response = await guardLabelRemoval(f.fetch, baseline, (reason) => skipped.push(reason))(
    url,
    { method: "DELETE", headers: { Authorization: "Bearer test" } }
  );
  assert.equal(response.status, 204);
  assert.equal(f.calls.filter((c) => c[1] === "DELETE").length, 0);
  assert.equal(skipped.length, 1);
});
test("unchanged complete ownership allows deletion and rechecks each removal", async () => {
  const f = fixture([event()]);
  const guarded = guardLabelRemoval(f.fetch, baseline);
  await guarded(url, { method: "DELETE" });
  await guarded(url, { method: "DELETE" });
  assert.equal(f.calls.filter((c) => c[1] === "GET").length, 2);
  assert.equal(f.calls.filter((c) => c[1] === "DELETE").length, 2);
});
test("changed bot event, failed read, malformed or incomplete histories fail closed", async () => {
  for (const f of [
    fixture([event(2)]),
    fixture({}, 200),
    fixture([], 403),
    fixture(Array.from({ length: 100 }, () => event())),
  ]) {
    await guardLabelRemoval(f.fetch, baseline)(url, { method: "DELETE" });
    assert.equal(f.calls.filter((c) => c[1] === "DELETE").length, 0);
  }
  for (const history of [
    { rows: [event()], omitted: true },
    { rows: [], omitted: false },
    { rows: [event(1, "human", "User")], omitted: false },
  ]) {
    const f = fixture([event()]);
    await guardLabelRemoval(f.fetch, { ...baseline, history })(url, { method: "DELETE" });
    assert.equal(f.calls.length, 0);
  }
});
test("different labels do not invalidate ownership but target mismatch is rejected", async () => {
  const f = fixture([event(), { ...event(2), label: { name: "docs" } }]);
  await guardLabelRemoval(f.fetch, baseline)(url, { method: "DELETE" });
  assert.equal(f.calls.at(-1)[1], "DELETE");
  const g = fixture([event()]);
  await assert.rejects(
    guardLabelRemoval(g.fetch, baseline)(url.replace("/issues/1/", "/issues/2/"), {
      method: "DELETE",
    })
  );
  assert.equal(g.calls.length, 0);
});
test("Request method and credentials are preserved; non-deletions pass through", async () => {
  const f = fixture([event()]);
  await guardLabelRemoval(
    f.fetch,
    baseline
  )(new Request(url, { method: "DELETE", headers: { Authorization: "Bearer test" } }));
  assert.equal(f.calls.length, 2);
  const g = fixture([]);
  await guardLabelRemoval(g.fetch, baseline)(url, { method: "POST" });
  assert.equal(g.calls.length, 1);
});

test("published CLI removal is blocked after a human takes ownership", async () => {
  const { mkdtemp, writeFile, readFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { spawnSync } = await import("node:child_process");
  const { fileURLToPath } = await import("node:url");
  const dir = await mkdtemp(join(tmpdir(), "label-ownership-"));
  try {
    const config = join(dir, "policy.json"),
      hook = join(dir, "mock.mjs"),
      context = join(dir, "context.json");
    await writeFile(
      config,
      JSON.stringify({
        only_configured: true,
        labels: { "needs reproduction": { apply_when: "Matches", can_remove: true } },
      })
    );
    await writeFile(context, JSON.stringify(baseline));
    await writeFile(
      hook,
      `import {writeFileSync} from 'node:fs';
      globalThis.fetch=async(input,init={})=>{
        const u=new URL(String(input));
        if(u.hostname==='api.typesafe.ai') {const body=JSON.parse(init.body);return Response.json({answers:Object.fromEntries(Object.keys(body.questions).map(k=>[k,{noul:0}]))});}
        if(u.hostname!=='api.github.com')throw Error('Unexpected network target');
        if(init.method&&init.method!=='GET'){writeFileSync(process.env.MUTATIONS,init.method);return Response.json({});}
        if(u.pathname.endsWith('/timeline'))return Response.json(${JSON.stringify([event(), event(2, "human", "User")])});
        if(u.pathname.endsWith('/labels'))return Response.json([{name:'needs reproduction',description:null}]);
        if(u.pathname.endsWith('/issues/1'))return Response.json({number:1,title:'Example',body:'Example',labels:['needs reproduction']});
        return Response.json([]);
      };`
    );
    for (const guarded of [false, true]) {
      const mutations = join(dir, guarded ? "guarded.txt" : "unguarded.txt");
      const args = [
        "--import",
        hook,
        ...(guarded
          ? ["--import", fileURLToPath(new URL("./guard-label-removal.mjs", import.meta.url))]
          : []),
        "--import",
        fileURLToPath(new URL("./guard-model-response.mjs", import.meta.url)),
        fileURLToPath(new URL("./node_modules/@ieedan/label/dist/bin.mjs", import.meta.url)),
        "label",
        "-R",
        "owner/repo",
        "1",
        "--config",
        config,
        "--cwd",
        dir,
        "--remove",
      ];
      const result = spawnSync(process.execPath, args, {
        env: {
          ...process.env,
          GITHUB_TOKEN: "fixture",
          TYPESAFE_API_KEY: "fixture",
          MUTATIONS: mutations,
          LABEL_REMOVAL_CONTEXT: context,
        },
        encoding: "utf8",
        timeout: 10000,
      });
      assert.equal(result.signal, null);
      assert.equal(result.status, 0, result.stderr);
      if (guarded) {
        await assert.rejects(readFile(mutations));
        assert.match(result.stdout, /ownership changed/);
      } else assert.equal(await readFile(mutations, "utf8"), "DELETE");
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("fresh ownership read preserves credentials and DELETE errors propagate", async () => {
  let reads = 0;
  const guarded = guardLabelRemoval(async (input, init) => {
    if (init.method === "GET") {
      reads++;
      assert.equal(new Headers(init.headers).get("Authorization"), "Bearer fixture");
      return Response.json([event()]);
    }
    throw new Error("DELETE failed");
  }, baseline);
  await assert.rejects(
    guarded(url, { method: "DELETE", headers: { Authorization: "Bearer fixture" } }),
    /DELETE failed/
  );
  assert.equal(reads, 1);
});
