---
title: CLI
description: Use the CLI to add components to your project.
---

## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and creates CSS variables for the project.

```bash
npx shadcn-svelte init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shadcn-svelte add [component]
```

### Example

```bash
npx shadcn-svelte add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shadcn-svelte add
```
