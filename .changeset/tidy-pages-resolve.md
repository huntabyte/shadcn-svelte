---
"shadcn-svelte": patch
"@shadcn-svelte/registry": patch
---

fix(registry): resolve `registry:page` targets relative to `src/routes` without duplicating a leading `src/routes/`, and fix the registry template `complex-component` so its imports resolve after install
