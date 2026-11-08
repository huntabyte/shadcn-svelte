# Automatic labeling

The workflow pins the published `@ieedan/label@0.0.1`; it does not depend on the open labeler PRs. Every configured label is judged automatically, including duplicate and slop. No review queue or approval step is introduced.

`label-context.mjs` collects bounded related-item discussion/state, submitted reviews and changed-file excerpts. It ignores foreign-repository cross references, marks omissions and retries rate limits. Independent GitHub reads run concurrently, capped at four, with deterministic output order. Failed collection stops the job before inference or label writes. Duplicate evidence comes from this collector rather than a second broad similar-item inference pass.

`label-questions.mjs` puts each configured positive and negative rule directly into the typed question's criteria. Item text and repository evidence are shared once, rather than repeating policies in both state and instructions. Known bot comment/review boilerplate is filtered; source inputs and returned probabilities are not rewritten. One request contains all fourteen questions for the single labeling target. There is no routing or group executor in the action. HTTP failure responses preserve the original response and SDK retry metadata.

`guard-model-response.mjs` validates every expected probability before the CLI can write labels. Missing answers cannot become implicit negative scores. It logs actual provider-reported per-request and cumulative input tokens; unavailable usage is never counted as zero. Cost is total input usage, not call count.

Automatic cleanup is permitted for every configured category whose latest label event was application by `github-actions[bot]`. Human-applied labels, other bots' labels and incomplete ownership histories are preserved. The published CLI's conservative removal buffer still applies. History is a snapshot and GitHub writes are not atomic.

The 22 local checks require no GitHub or TypeSafe credentials:

```sh
npm ci --prefix .github/scripts --ignore-scripts --no-audit --no-fund
node --test .github/scripts/*.test.mjs
```

See [label-evaluation.md](label-evaluation.md) for measured token cost, decision errors, latency and the empirical frontier. All model evaluations use the published CLI with `--dry-run`, frozen GitHub responses and an adapter that rejects GitHub writes. Labeling-step timings exclude live GitHub reads, dependency installation and Actions queue time.
