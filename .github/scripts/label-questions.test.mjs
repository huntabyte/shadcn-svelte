import assert from "node:assert/strict";
import test from "node:test";
import { buildLabelRequest } from "./label-questions.mjs";
const input = {
  state: {
    prompt:
      "Repository rules\n" +
      JSON.stringify({
        source: "GitHub API",
        current: { number: 1 },
        files: [{ path: "src/index.ts" }],
        filesOmitted: true,
        reviews: [
          { isBot: false, state: "CHANGES_REQUESTED" },
          { isBot: true, state: "COMMENTED" },
        ],
      }),
    items: [
      {
        title: "Example",
        body: "Source evidence",
        comments: [
          { author: "human", body: "Human clarification" },
          { author: "automation[bot]", body: "Boilerplate" },
        ],
      },
    ],
    labels: [
      {
        name: "feature",
        description: "Public functionality",
        apply_when: "Adds public behavior",
        remove_when: "Only repairs existing behavior",
        examples: ["New supported mode"],
      },
    ],
  },
  questions: { item_0_label_0: { type: "noul" } },
};
test("one batch contains direct rules and stable question IDs without duplicated policies", () => {
  const before = JSON.stringify(input),
    request = buildLabelRequest(input);
  assert.equal(JSON.stringify(input), before);
  assert.deepEqual(Object.keys(request.questions), ["item_0_label_0"]);
  assert.equal(request.questions.item_0_label_0.criteria.true, "Adds public behavior");
  assert.equal(request.questions.item_0_label_0.criteria.false, "Only repairs existing behavior");
  assert.equal(request.questions.item_0_label_0.instructions.label, "feature");
  assert(!("labels" in request.state));
});
test("keeps source evidence and omission flags while filtering known bot boilerplate", () => {
  const request = buildLabelRequest(input);
  assert.equal(request.state.current_item.body, "Source evidence");
  assert.equal(request.state.current_item.comments.length, 1);
  assert.equal(request.state.current_item.comments[0].author, "human");
  assert.equal(request.state.repository_evidence.filesOmitted, true);
  assert.equal(request.state.repository_evidence.reviews.length, 1);
  assert.equal(request.state.repository_evidence.reviews[0].state, "CHANGES_REQUESTED");
});
test("malformed targets and unknown label questions fail before inference", () => {
  for (const change of [
    (r) => r.state.items.push({}),
    (r) => (r.questions = { unknown: {} }),
    (r) => (r.questions = { item_0_label_10: {} }),
    (r) => (r.questions = { item_1_label_0: {} }),
  ]) {
    const request = structuredClone(input);
    change(request);
    assert.throws(() => buildLabelRequest(request));
  }
});
