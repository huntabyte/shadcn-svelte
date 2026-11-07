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

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const response = await originalFetch(input, init);
  const url = new URL(
    typeof input === "string" || input instanceof URL ? String(input) : input.url
  );
  if (url.hostname === "api.typesafe.ai" && url.pathname === "/v1/systemone" && response.ok) {
    const request = JSON.parse(String(init.body));
    validateAnswers(request.questions, await response.clone().json());
  }
  return response;
};
