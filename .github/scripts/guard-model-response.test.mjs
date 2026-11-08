import assert from "node:assert/strict";
import test from "node:test";
import { validateAnswers, guardFetch, explicitQuestions } from "./guard-model-response.mjs";
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
        answers: {},
        ...(calls === 3 ? {} : { usage: { input_tokens: 42 } }),
      });
    },
    (usage) => observations.push(usage)
  );
  const init = { body: JSON.stringify({ questions: {} }) };
  for (let i = 0; i < 3; i++) await fetch("https://api.typesafe.ai/v1/systemone", init);
  assert.equal(calls, 3);
  assert.deepEqual(observations, [{ inputTokens: 42 }, { inputTokens: 42 }, { inputTokens: null }]);
});

test("embeds each literal policy while preserving IDs, context and probabilities", () => {
  const request = {
    state: {
      items: [{ title: "Example" }],
      labels: [
        { name: "feature", apply_when: "New functionality", remove_when: "Only repairs" },
        { name: "docs", apply_when: "Documentation content" },
      ],
    },
    questions: {
      item_0_label_0: { type: "noul", instructions: { judge_from: "Read prompt" } },
      item_0_label_1: { type: "noul", instructions: {} },
    },
  };
  const state = JSON.stringify(request.state);
  explicitQuestions(request);
  assert.equal(JSON.stringify(request.state), state);
  assert(request.questions.item_0_label_0.instructions.question.includes('"feature"'));
  assert(request.questions.item_0_label_1.instructions.question.includes('"docs"'));
  assert.equal(
    JSON.parse(request.questions.item_0_label_0.instructions.label).remove_when,
    "Only repairs"
  );
  assert.equal(request.questions.item_0_label_0.instructions.judge_from, "Read prompt");
  assert.throws(() => explicitQuestions({ questions: { unknown: {} } }), /Unrecognized/);
});
