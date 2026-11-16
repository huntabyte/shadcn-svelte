/** Last relevant event, using GitHub's timestamp and numeric event ID ordering. */
function latest(history, name) {
  if (history?.omitted !== false || !Array.isArray(history.rows)) return;
  return history.rows
    .filter(
      (e) =>
        ["labeled", "unlabeled"].includes(e.event) &&
        e.label?.name?.toLowerCase() === name.toLowerCase()
    )
    .sort(
      (a, b) =>
        String(a.created_at).localeCompare(String(b.created_at)) || (a.id ?? 0) - (b.id ?? 0)
    )
    .at(-1);
}
function owned(event) {
  return (
    Number.isSafeInteger(event?.id) &&
    event.event === "labeled" &&
    event.actor?.login === "github-actions[bot]" &&
    event.actor?.type === "Bot"
  );
}
/** Recheck immediately before each DELETE. This narrows, not eliminates, the GET/DELETE race. */
export function guardLabelRemoval(fetch, baseline, onSkip = () => {}) {
  return async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const method = (
      init?.method ?? (input instanceof Request ? input.method : "GET")
    ).toUpperCase();
    if (url.origin !== "https://api.github.com" || method !== "DELETE") return fetch(input, init);
    const match = url.pathname.match(/^\/repos\/([^/]+\/[^/]+)\/issues\/(\d+)\/labels\/([^/]+)$/);
    // This process must never perform an unguarded GitHub deletion.
    if (
      !match ||
      match[1].toLowerCase() !== baseline.repo.toLowerCase() ||
      Number(match[2]) !== baseline.number
    )
      throw Error("Unexpected label removal target");
    const name = decodeURIComponent(match[3]);
    const before = latest(baseline.history, name);
    const skip = () => {
      onSkip("Label removal skipped: ownership changed or could not be verified.");
      return new Response(null, { status: 204 });
    };
    if (!owned(before)) return skip();
    const rows = [];
    try {
      const headers = new Headers(
        init?.headers ?? (input instanceof Request ? input.headers : undefined)
      );
      headers.set("Accept", "application/vnd.github+json");
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(
          `https://api.github.com/repos/${baseline.repo}/issues/${baseline.number}/timeline?per_page=100&page=${page}`,
          { method: "GET", headers }
        );
        if (!response.ok) return skip();
        const batch = await response.json();
        if (!Array.isArray(batch) || batch.some((e) => !e || typeof e !== "object")) return skip();
        rows.push(...batch);
        if (batch.length < 100) {
          const after = latest({ rows, omitted: false }, name);
          if (!owned(after) || after.id !== before.id || after.created_at !== before.created_at)
            return skip();
          return fetch(input, init);
        }
      }
    } catch {
      return skip();
    }
    return skip();
  };
}
