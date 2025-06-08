---
title: FAQ
description: Frequently asked questions about running a registry.
---

## Frequently asked questions

### What does a complex component look like?

Here's an example of a complex component that installs a page, two components, a hook, a format-date utils and a config file.

```json showLineNumbers
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/hello-world/page.svelte",
      "type": "registry:page",
      "target": "src/routes/hello/+page.svelte"
    },
    {
      "path": "registry/hello-world/components/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/components/formatted-message.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/hooks/use-hello.svelte.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/hello-world/lib/format-date.ts",
      "type": "registry:utils"
    },
    {
      "path": "registry/hello-world/hello.config.ts",
      "type": "registry:file",
      "target": "hello.config.ts"
    }
  ]
}
```

### How do I add a new Tailwind color?

To add a new color you need to add it to `cssVars` under `light` and `dark` keys.

```json showLineNumbers {10-18}
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    },
    "dark": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    }
  }
}
```

The CLI will update the project CSS file. Once updated, the new colors will be available to be used as utility classes: `bg-brand` and `text-brand-accent`.

### How do I add or override a Tailwind theme variable?

To add or override a theme variable you add it to `cssVars.theme` under the key you want to add or override.

```json showLineNumbers {10-15}
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "theme": {
      "text-base": "3rem",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      "font-heading": "Poppins, sans-serif"
    }
  }
}
```
