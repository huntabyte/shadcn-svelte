# Automatic labeling

The workflow pins the published `@ieedan/label@0.0.1`; it does not depend on the open labeler PRs. Duplicate and slop application remain automatic. No review queue or approval step is introduced.

`label-context.mjs` collects bounded related-item discussion/state, submitted reviews and changed-file excerpts. It ignores foreign-repository cross references, marks omissions and retries rate limits. Failed collection stops the job before inference or label writes.

`automatic-label.mjs` invokes the unmodified CLI once per configured label, with that label's literal policy in the prompt. This avoids ambiguous array references in the deployed package. Concurrency is two. The tradeoff is **14 inference requests per item instead of two**; filtering bot comments reduces redundant runs, but is not a demonstrated net cost saving.

Automatic cleanup is limited to `duplicate`, `slop` and `needs reproduction` whose latest label event was application by GitHub Actions. All other labels, human-applied labels and labels with incomplete ownership history are preserved. Cleanup uses the published CLI's conservative low-confidence buffer, so some stale labels can remain. History is a snapshot and GitHub writes are not atomic.

`guard-model-response.mjs` validates every expected probability before the CLI receives a successful model response, preventing missing answers from becoming implicit negative scores. It never changes probabilities or label meanings.

Local checks require no GitHub or TypeSafe credentials:

```sh
npm ci --prefix .github/scripts --ignore-scripts --no-audit --no-fund
node --test .github/scripts/*.test.mjs
```

See [label-evaluation.md](label-evaluation.md) for the local before/after results and remaining errors. The regression evaluation used the published CLI with `--dry-run`, frozen GitHub responses and a write-blocking fetch adapter; no live labels changed.
