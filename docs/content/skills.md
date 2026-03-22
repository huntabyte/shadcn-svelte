---
title: Skills
description: Give AI assistants project-aware context about shadcn-svelte.
---

<script>
	import PMExecute from "$lib/components/pm-execute.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData, links } = $props();
</script>

Skills give AI assistants deep, project-aware context about **shadcn-svelte** — so they can locate, install, compose, and customize components using the correct APIs, patterns, and conventions.

## What's Included

The shadcn-svelte skill provides context across several areas:

### Project Context

The skill reads your `components.json` to understand your project's configuration — aliases, framework type (SvelteKit, Vite, Astro), Tailwind version, and installed components. This means the agent works with your actual project setup, not assumptions.

### CLI Commands

A reference for the verified shadcn-svelte CLI commands:

- **`init`** — Set up shadcn-svelte in an existing project
- **`add`** — Install components from the registry
- **`registry build`** — Build distributable registry JSON files

The skill explicitly prevents agents from suggesting upstream `shadcn` commands that don't exist in shadcn-svelte (like `info`, `docs`, `search`, `view`, or `--dry-run`).

### Theming & Customization

Guidance on the three-layer theming system:

1. CSS variables in your global stylesheet (OKLCH format)
2. Tailwind utilities via `@theme inline`
3. Semantic classes consumed by components (`bg-primary`, `text-muted-foreground`, etc.)

Includes the customization hierarchy: built-in variants → Tailwind classes → source edits → wrapper components.

### Component Composition

Rules for proper component structure:

- Namespace import patterns (`import * as Dialog from "..."`)
- Group/item relationships (`Select.Item` inside `Select.Group`)
- Accessibility requirements (overlay titles, Avatar fallbacks)
- Preferred components over custom markup (use `Alert`, `Badge`, `Skeleton`, `Separator`)

### Forms & Inputs

Patterns for building accessible forms:

- `Field.Group` + `Field.Field` layout (never raw divs)
- `InputGroup` for embedded addons
- Validation with `data-invalid` and `aria-invalid`
- Control selection guidance (Select, Combobox, Switch, Toggle Group, etc.)

### Icons

Rules for consistent icon usage:

- Import from `@lucide/svelte` (the project's configured library)
- Let components handle icon sizing — no `size-4` or `w-4 h-4` inside Buttons
- Pass icons as components, not strings

### Styling

Semantic token usage, `gap-*` over `space-y-*`, `cn()` utility for conditional classes, overlay stacking rules, and dark mode guidance.

### Migration

Support for Svelte 5 (runes, snippets), Tailwind v4 (`@theme inline`), and Bits UI version changes.

## How It Works

The skill operates in four steps:

1. **Detection** — Recognizes shadcn-svelte projects by `components.json`, Bits UI imports, or `$lib/components/ui` paths
2. **Context Injection** — Loads relevant rules based on what you're working on (forms, dialogs, styling, etc.)
3. **Pattern Enforcement** — Applies composition rules, styling guidelines, and accessibility requirements
4. **Component Discovery** — Checks installed components and local docs before suggesting changes

## Differences from upstream shadcn/ui skill

The shadcn-svelte skill is adapted for the Svelte ecosystem:

- **Bits UI** instead of Radix UI — different primitive APIs and prop names
- **Svelte 5 runes** — `$props()`, `$bindable()`, `$state()` instead of React hooks
- **Snippets** — `{#snippet}` / `{@render}` instead of JSX children
- **No MCP server** — uses local file inspection instead
- **Reduced CLI surface** — no `info`, `docs`, `search`, `view`, or diff-preview flags
- **Multi-file components** — `.svelte` files with `index.ts` barrels, namespace imports

## Source

The skill source is available at [`skills/shadcn-svelte`](https://github.com/huntabyte/shadcn-svelte/tree/main/skills/shadcn-svelte) in the repository.
