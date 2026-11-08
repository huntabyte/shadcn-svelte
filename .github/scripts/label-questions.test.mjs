import assert from "node:assert/strict";
import test from "node:test";
import { planRequests, executePlans } from "./label-questions.mjs";
const request = {
  state: {
    prompt:
      "Use repository rules.\n" +
      JSON.stringify({
        source: "GitHub API",
        current: { number: 1 },
        related: [{ number: 2 }],
        files: [{ path: "src/index.ts" }],
        reviews: [
          { isBot: false, state: "CHANGES_REQUESTED" },
          { isBot: true, state: "COMMENTED" },
        ],
        filesOmitted: true,
      }),
    items: [
      {
        title: "Example",
        body: "Description",
        comments: [
          { author: "human", body: "Human evidence" },
          { author: "automation[bot]", body: "Boilerplate" },
        ],
      },
    ],
    labels: [
      { name: "content", apply_when: "Changes behavior", remove_when: "No behavior change" },
      { name: "authorship", apply_when: "Direct evidence" },
      { name: "status", apply_when: "Outstanding request" },
    ],
  },
  questions: Object.fromEntries(
    [0, 1, 2].map((i) => [`item_0_label_${i}`, { type: "noul", instructions: {} }])
  ),
};
test("policies are direct criteria, IDs and source input remain intact", () => {
  const before = JSON.stringify(request),
    plans = planRequests(request);
  assert.equal(plans.length, 1);
  assert.equal(JSON.stringify(request), before);
  assert.equal(plans[0].questions.item_0_label_0.criteria.true, "Changes behavior");
  assert.equal(plans[0].questions.item_0_label_0.criteria.false, "No behavior change");
  assert(!("labels" in plans[0].state));
  assert.equal(plans[0].state.current_item.body, "Description");
});
test("declarative scopes retain necessary evidence and omission flags", () => {
  const plans = planRequests(request, {
    mode: "scoped",
    scopes: { authorship: "authorship", status: "review" },
  });
  assert.equal(plans.length, 3);
  assert.equal(plans[0].state.repository_evidence.filesOmitted, true);
  assert.equal(plans[0].state.current_item.comments.length, 1);
  assert(!("files" in plans[1].state.repository_evidence));
  assert(!("reviews" in plans[1].state.repository_evidence));
  assert(!("related" in plans[1].state.repository_evidence));
  assert.equal(plans[2].state.repository_evidence.reviews.length, 1);
});
test("fan-out is concurrent, bounded and merges complete answers with measured usage", async () => {
  const plans = planRequests(request, { mode: "focused" });
  let active = 0,
    max = 0;
  const response = await executePlans(
    async (_, init) => {
      active++;
      max = Math.max(max, active);
      const p = JSON.parse(init.body);
      await new Promise((r) => setTimeout(r, 10));
      active--;
      return Response.json({
        model: "test",
        usage: { input_tokens: 123, output_tokens: 1 },
        answers: Object.fromEntries(Object.keys(p.questions).map((id) => [id, { noul: 0.7 }])),
      });
    },
    "https://api.typesafe.ai/v1/systemone",
    {},
    plans,
    2
  );
  const body = await response.json();
  assert.equal(max, 2);
  assert.equal(Object.keys(body.answers).length, 3);
  assert.equal(body.usage.input_tokens, 369);
});
test("an incomplete parallel result returns no combined decisions and awaits in-flight work", async () => {
  let complete = false;
  let n = 0;
  const plans = planRequests(request, { mode: "focused" });
  await assert.rejects(
    executePlans(
      async () => {
        const i = n++;
        if (i === 0) return Response.json({ answers: {} });
        await new Promise((r) => setTimeout(r, 10));
        complete = true;
        return Response.json({ answers: {} });
      },
      "https://api.typesafe.ai/v1/systemone",
      {},
      plans,
      2
    ),
    /Incomplete inference/
  );
  assert.equal(complete, true);
});

test("rate-limit responses retain retry metadata and stop new parallel work", async () => {
  const plans = planRequests(request, { mode: "focused" });
  let calls = 0;
  const response = await executePlans(
    async () => {
      calls++;
      return Response.json({ error: "limited" }, { status: 429, headers: { "retry-after": "2" } });
    },
    "https://api.typesafe.ai/v1/systemone",
    {},
    plans,
    1
  );
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "2");
  assert.equal(calls, 1);
});
