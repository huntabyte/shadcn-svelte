import { buildLabelRequest } from "./label-questions.mjs";

/** Stop the published CLI from interpreting an absent answer as a negative score. */
export function validateAnswers(questions, payload) {
  for (const id of Object.keys(questions)) {
    const answer = payload?.answers?.[id];
    if (
      !answer ||
      typeof answer.noul !== "number" ||
      !Number.isFinite(answer.noul) ||
      answer.noul < 0 ||
      answer.noul > 1
    ) {
      throw new Error(
        "Incomplete or invalid label decision; no labels may be written by this pass."
      );
    }
  }
}

/** Validate decisions and report actual provider usage without changing SDK retry behavior. */
export function guardFetch(fetch, onUsage = () => {}) {
  return async (input, init) => {
    const url = new URL(
      typeof input === "string" || input instanceof URL ? String(input) : input.url
    );
    const inference = url.hostname === "api.typesafe.ai" && url.pathname === "/v1/systemone";
    if (!inference) return fetch(input, init);
    const request = buildLabelRequest(JSON.parse(String(init.body)));
    const response = await fetch(input, { ...init, body: JSON.stringify(request) });
    if (response.ok) {
      const payload = await response.clone().json();
      const tokens = payload.usage?.input_tokens;
      onUsage({ inputTokens: Number.isSafeInteger(tokens) && tokens >= 0 ? tokens : null });
      validateAnswers(request.questions, payload);
    } else onUsage({ inputTokens: null });
    return response;
  };
}

let totalInputTokens = 0;
let usageComplete = true;
globalThis.fetch = guardFetch(globalThis.fetch, ({ inputTokens }) => {
  if (inputTokens === null) usageComplete = false;
  else totalInputTokens += inputTokens;
  console.log(
    `TypeSafe reported input tokens: ${inputTokens ?? "unavailable"}; cumulative: ${usageComplete ? totalInputTokens : "incomplete"}`
  );
});
