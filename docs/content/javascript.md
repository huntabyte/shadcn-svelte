---
title: JavaScript
description: How to use shadcn-svelte with JavaScript.
---

This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.

However, we provide a JavaScript version of the components as well. The JavaScript version is _only_ available via the [CLI](/docs/cli).

To opt-out of TypeScript, you can use the `typescript` flag in your `components.json` file.

```json {6} title="components.json" showLineNumbers
{
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components",
    "hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
  },
  "registry": "https://shadcn-svelte.com/registry"
}
```

To configure import aliases, create a `jsconfig.json` file:

```json {4} title="jsconfig.json" showLineNumbers
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```
