# Automatic labeling

The workflow uses the pinned `@ieedan/label` CLI with the repository rules in `.github/.label.yml`. It collects bounded related-item discussion, submitted reviews and changed-file excerpts, then evaluates all configured labels in one model request. Independent GitHub reads run concurrently, capped at four. Human references, release notes and source changes get priority within the context limits; omissions are marked explicitly.

The request adapter places each label's rules directly in its question and shares item evidence once. The response guard checks every expected probability before labels can be written and logs provider-reported input-token usage. Failed context collection or missing model answers stop the pass.

Automatic removal is allowed only when complete history shows this action most recently applied the label. Human applications and other bots' labels are preserved. The CLI's conservative removal buffer still applies.

Run the local checks without GitHub or TypeSafe credentials:

```sh
npm ci --prefix .github/scripts --ignore-scripts --no-audit --no-fund
node --test .github/scripts/*.test.mjs
```
