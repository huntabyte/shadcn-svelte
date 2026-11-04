---
"shadcn-svelte": patch
---

fix(cli): a non-color token outside a Tailwind theme namespace is no longer mapped into `@theme`, so it no longer gets a variable that refers to itself (`--x: var(--x)`).
