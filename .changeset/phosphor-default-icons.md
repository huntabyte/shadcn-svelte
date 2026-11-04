---
"shadcn-svelte": major
---

feat(cli): **breaking.** The default icon library for a new `components.json` is now `phosphor` (it was `lucide`). A project that already uses `@lucide/svelte` and has no `iconLibrary` key keeps Lucide and gets a one line notice; set `"iconLibrary"` to choose. Phosphor icons get `weight="duotone"` for form and field icons and `weight="bold"` for arrows, carets, dots, text format and the plain X, Check, Plus and Minus, from `phosphorWeight(name)`, exported from `shadcn-svelte/icons`. A weight the component sets itself is kept.
