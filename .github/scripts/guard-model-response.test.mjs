import assert from "node:assert/strict";
import test from "node:test";
import { validateAnswers, guardFetch } from "./guard-model-response.mjs";
test("accepts complete probabilities without changing the payload", () => {
  const payload = { answers: { a: { noul: 0 }, b: { noul: 1 } } };
  const before = JSON.stringify(payload);
  validateAnswers({ a: {}, b: {} }, payload);
  assert.equal(JSON.stringify(payload), before);
});
test("rejects incomplete, nonnumeric and out-of-range decisions", () => {
  for (const answer of [
    undefined,
    { noul: undefined },
    { noul: null },
    { noul: "0.9" },
    { noul: NaN },
    { noul: Infinity },
    { noul: -0.1 },
    { noul: 1.1 },
  ])
    assert.throws(
      () => validateAnswers({ a: {} }, { answers: { a: answer } }),
      /Incomplete or invalid/
    );
});

test("published CLI cannot turn a missing answer into a removal when guarded", async () => {
  const { mkdtemp, writeFile, readFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { spawnSync } = await import("node:child_process");
  const { fileURLToPath } = await import("node:url");
  const dir = await mkdtemp(join(tmpdir(), "label-response-"));
  const config = join(dir, "policy.json"),
    hook = join(dir, "mock.mjs");
  try {
    await writeFile(
      config,
      JSON.stringify({
        only_configured: true,
        labels: { status: { apply_when: "Matches the report", can_remove: true } },
      })
    );
    await writeFile(
      hook,
      `import {writeFileSync} from 'node:fs';
      globalThis.fetch=async(input,init={})=>{
        const u=new URL(String(input));
        if(u.hostname==='api.typesafe.ai')return Response.json({answers:{}});
        if(u.hostname!=='api.github.com')throw Error('Unexpected network target');
        if(init.method&&init.method!=='GET'){writeFileSync(process.env.MUTATIONS,init.method);return Response.json({});}
        if(u.pathname.endsWith('/labels'))return Response.json([{name:'status',description:null}]);
        if(u.pathname.endsWith('/issues/1'))return Response.json({number:1,title:'Example',body:'Example',labels:['status']});
        return Response.json([]);
      };`
    );
    for (const guarded of [false, true]) {
      const mutations = join(dir, guarded ? "guarded.txt" : "unguarded.txt");
      const args = [
        "--import",
        hook,
        ...(guarded
          ? ["--import", fileURLToPath(new URL("./guard-model-response.mjs", import.meta.url))]
          : []),
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
        },
        encoding: "utf8",
        timeout: 10000,
      });
      assert.equal(result.signal, null);
      if (guarded) {
        assert.notEqual(result.status, 0);
        await assert.rejects(readFile(mutations));
      } else {
        assert.equal(result.status, 0);
        assert.equal(await readFile(mutations, "utf8"), "DELETE");
      }
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("reports actual input usage, preserves retries and never substitutes zero for missing usage", async () => {
  let calls = 0;
  const observations = [];
  const fetch = guardFetch(
    async () => {
      calls++;
      return Response.json({
        answers: { item_0_label_0: { noul: 0.7 } },
        ...(calls === 3 ? {} : { usage: { input_tokens: 42 } }),
      });
    },
    (usage) => observations.push(usage)
  );
  const init = {
    body: JSON.stringify({
      state: { prompt: "Rules", items: [{}], labels: [{ name: "example" }] },
      questions: { item_0_label_0: {} },
    }),
  };
  for (let i = 0; i < 3; i++) await fetch("https://api.typesafe.ai/v1/systemone", init);
  assert.equal(calls, 3);
  assert.deepEqual(observations, [{ inputTokens: 42 }, { inputTokens: 42 }, { inputTokens: null }]);
});

test("passes HTTP retry metadata through without fabricating usage", async () => {
  const original = Response.json(
      { error: "limited" },
      { status: 429, headers: { "retry-after": "2" } }
    ),
    usage = [];
  const fetch = guardFetch(
    async () => original,
    (value) => usage.push(value)
  );
  const response = await fetch("https://api.typesafe.ai/v1/systemone", {
    body: JSON.stringify({
      state: { prompt: "Rules", items: [{}], labels: [{ name: "example" }] },
      questions: { item_0_label_0: {} },
    }),
  });
  assert.equal(response, original);
  assert.equal(response.headers.get("retry-after"), "2");
  assert.deepEqual(usage, [{ inputTokens: null }]);
});
