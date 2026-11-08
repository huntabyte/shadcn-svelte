# Automatic labeling

The workflow pins the published `@ieedan/label@0.0.1`; it does not depend on the open labeler PRs. Duplicate and slop application remain automatic. No review queue or approval step is introduced.

`label-context.mjs` collects bounded related-item discussion/state, submitted reviews and changed-file excerpts. It ignores foreign-repository cross references, marks omissions and retries rate limits. Failed collection stops the job before inference or label writes.

`automatic-label.mjs` invokes the published CLI once with all configured labels. The CLI normally makes one batched inference request and one similar-issues request. Request count is not the cost target; all provider-reported input tokens count toward the comparison. The fetch adapter in `guard-model-response.mjs` resolves indirect array references into literal label names and policies in each outgoing question. It does not modify the installed package or add inference calls. The measured draft uses about 14,400 input tokens per item versus 9,270 for the deployed workflow on the regression set. Smaller-context alternatives were tested but introduced false slop labels or wrong removals; they are not shipped. See the evaluation for the complete cost/quality comparison.

Automatic cleanup is permitted for **every configured category** whose latest label event was application by `github-actions[bot]`. Human-applied labels, labels applied by other automations and incomplete ownership histories are preserved. Removal remains subject to the published CLI's conservative low-confidence buffer, so some stale labels can remain. History is a snapshot and GitHub writes are not atomic.

The adapter validates every expected probability before the CLI receives a successful response, and logs provider-reported input tokens per request and cumulatively. Missing usage is marked unavailable, never counted as zero. SDK retry behavior is preserved; cost comparisons sum actual input tokens rather than using a call quota. Missing answers cannot become implicit negative scores. It preserves returned probabilities and thresholds.

Local checks require no GitHub or TypeSafe credentials:

```sh
npm ci --prefix .github/scripts --ignore-scripts --no-audit --no-fund
node --test .github/scripts/*.test.mjs
```

See [label-evaluation.md](label-evaluation.md) for the local before/after results and remaining errors. The regression evaluation used the published CLI with `--dry-run`, frozen GitHub responses and a write-blocking fetch adapter; no live labels changed.
