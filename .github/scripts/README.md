# Automatic labeling

The workflow uses the pinned `@ieedan/label` CLI with the repository rules in `.github/.label.yml`. It collects bounded related-item discussion, submitted reviews and changed-file excerpts, then evaluates all configured labels in one model request. Independent GitHub reads run concurrently, capped at four. Human references, release notes and source changes get priority within the context limits; omissions are marked explicitly.

The request adapter places each label's rules directly in its question and shares item evidence once. The response guard checks every expected probability before labels can be written and logs provider-reported input-token usage. Failed context collection or missing model answers stop the pass.

Automatic removal is allowed only when complete history shows this action most recently applied the label. Human applications and other bots' labels are preserved. The CLI's conservative removal buffer still applies.

Run the local checks without GitHub or TypeSafe credentials:

```sh
npm ci --prefix .github/scripts --ignore-scripts --no-audit --no-fund
node --test .github/scripts/*.test.mjs
```

Each removal re-reads the bounded timeline immediately before DELETE and requires the same bot-owned label event as the original snapshot. Changed, failed, or incomplete history skips that removal and logs the skip. This narrows the race during inference; GitHub does not provide an atomic ownership-conditional label DELETE, so a human change between the final read and DELETE remains possible.

Review submissions, edits, and dismissals use an unprivileged wake-up workflow. The privileged follow-up validates authoritative run and current PR metadata, loads executable scripts only from the base repository's default branch, and never consumes PR code or signal artifacts. These workflows must be merged before review wake-ups are active; fork workflow approval may delay the signal. Stale review-run SHAs are skipped (the synchronize event covers new commits).
