---
title: Skills
description: Give your AI assistant deep knowledge of shadcn-svelte components, patterns, and best practices.
---

<script>
	import PMExecute from "$lib/components/pm-execute.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData, links } = $props();
</script>

Skills give AI assistants like Claude Code project-aware context about shadcn-svelte. When installed, your AI assistant knows how to find, install, compose, and customize components using the correct APIs and patterns for your project.

For example, you can ask your AI assistant to:

- _"Add a login form with email and password fields."_
- _"Create a settings page with a form for updating profile information."_
- _"Build a dashboard with a sidebar, stats cards, and a data table."_

The skill reads your project's `components.json` and provides the assistant with your framework, aliases, installed components, icon library, and base library so it can generate correct code on the first try.

---

## Install

<PMExecute command="skills add shadcn-svelte" />

This installs the shadcn-svelte skill into your project. Once installed, your AI assistant automatically loads it when working with shadcn-svelte components.

Learn more about skills at [skills.sh](https://skills.sh).

---

## What's Included

The skill provides your AI assistant with the following knowledge:

### Project Context

On every interaction, the skill reads your `components.json` to get your project's configuration: framework (SvelteKit, Vite, Astro), Tailwind version, aliases, installed components, icon library, and resolved file paths.

### CLI Commands

Full reference for the shadcn-svelte CLI commands: `init`, `add`, and `registry build`. Includes flags and smart merge workflows.

### Theming and Customization

How CSS variables, OKLCH colors, dark mode, custom colors, border radius, and component variants work. Includes guidance for both Tailwind v3 and v4.

### Registry Authoring

How to build and publish custom component registries: `registry.json` format, item types, file objects, dependencies, CSS variables, building, and hosting.

---

## How It Works

1. **Project detection** — The skill activates when it finds a `components.json` file in your project.
2. **Context injection** — It reads your project configuration and injects it into the assistant's context.
3. **Pattern enforcement** — The assistant follows shadcn-svelte composition rules: using `Field.Group` for forms, namespace imports, Svelte 5 runes, and correct Bits UI APIs.
4. **Component discovery** — The assistant checks installed components and local docs before generating code.

<!--## Differences from shadcn/ui

The shadcn-svelte skill is adapted for the Svelte ecosystem:

- **Bits UI** instead of Radix UI — different primitive APIs and prop names
- **Svelte 5 runes** — `$props()`, `$bindable()`, `$state()` instead of React hooks
- **Snippets** — `{#snippet}` / `{@render}` instead of JSX children
- **No MCP server** — uses local file inspection instead
- **Reduced CLI surface** — no `info`, `docs`, `search`, `view`, or `diff` commands
- **Multi-file components** — `.svelte` files with `index.ts` barrels, namespace imports
-->

## Learn More

- [CLI](/docs/cli) — Full CLI command reference
- [Theming](/docs/theming) — CSS variables and customization
- [Registry](/docs/registry) — Building and publishing custom registries
- [skills.sh](https://skills.sh) — Learn more about AI skills
