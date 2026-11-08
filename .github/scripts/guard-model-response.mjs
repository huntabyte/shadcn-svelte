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

/** Resolve the published CLI's array references into literal per-question policies. */
export function explicitQuestions(request) {
  for (const [id, question] of Object.entries(request.questions ?? {})) {
    const match = /^item_(\d+)_label_(\d+)$/.exec(id);
    if (!match) throw Error("Unrecognized label question");
    const label = request.state?.labels?.[Number(match[2])];
    if (!label?.name || !request.state?.items?.[Number(match[1])])
      throw Error("Missing label question context");
    question.instructions = {
      ...question.instructions,
      question: `Should the GitHub label ${JSON.stringify(label.name)} apply to items[${match[1]}] in its current state?`,
      label: JSON.stringify({
        name: label.name,
        description: label.description,
        apply_when: label.apply_when,
        remove_when: label.remove_when,
        examples: label.examples,
      }),
    };
  }
  return request;
}

/** Each CLI process gets at most the deployed two inference requests, including retries. */
export function guardFetch(fetch) {
  let requests = 0;
  return async (input, init) => {
    const url = new URL(
      typeof input === "string" || input instanceof URL ? String(input) : input.url
    );
    const inference = url.hostname === "api.typesafe.ai" && url.pathname === "/v1/systemone";
    if (inference && ++requests > 2) throw Error("Inference request budget exceeded");
    if (inference)
      init = { ...init, body: JSON.stringify(explicitQuestions(JSON.parse(String(init.body)))) };
    const response = await fetch(input, init);
    if (inference && response.ok) {
      const request = JSON.parse(String(init.body));
      validateAnswers(request.questions, await response.clone().json());
    }
    return response;
  };
}

globalThis.fetch = guardFetch(globalThis.fetch);
