---
"shadcn-svelte": patch
---

fix: detect the nearest `tsconfig.json`/`jsconfig.json` so a nested JS project no longer picks up an unrelated parent `tsconfig.json` (fixes false `$lib` path alias errors in monorepos)
