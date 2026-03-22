---
name: shadcn-svelte
description: Manages shadcn-svelte components and projects for Svelte and SvelteKit apps — initializing, adding components, debugging imports and composition, migrating to Svelte 5 or Tailwind v4, and customizing generated UI. Applies when working with shadcn-svelte, components.json, Bits UI-backed shadcn components, or code imported from $lib/components/ui.
user-invocable: false
---

# shadcn-svelte

`shadcn-svelte` is a community-led Svelte port of `shadcn/ui`. Do not assume React API parity. Verify the local docs and installed component source before giving usage or migration advice.

## Principles

1. Use the local project as the source of truth.
2. Use the documented `shadcn-svelte` CLI only. Do not invent upstream `shadcn` commands.
3. Prefer installed component source over memory when fixing or extending a component.
4. Check the component's local docs page before using Bits UI docs.
5. Treat Svelte 5, Tailwind v4, and Bits UI migrations as first-class compatibility constraints.

## Current Project Context

Before suggesting imports or component usage, inspect these files if they exist:

- `components.json`
- `package.json`
- `svelte.config.*`
- `vite.config.*`
- the global CSS file referenced by `components.json.tailwind.css`

Use that inspection to determine:

- the configured aliases for `lib`, `components`, `ui`, `utils`, and `hooks`
- whether the project is SvelteKit, Vite, Astro, or manual
- whether the project has already been initialized for `shadcn-svelte`
- whether the requested component already exists under the configured `ui` alias

## Workflow

1. Read `components.json` first when present.
2. Confirm the requested component exists in the local docs set or is already installed in the project.
3. Read the matching local docs page under `docs/content/components/<component>.md`.
4. If the docs page links to Bits UI `doc` or `api`, use those only as secondary references for primitive behavior.
5. When modifying an installed component, inspect its local folder and `index.ts` file before advising on imports or composition.
6. For setup work, use [cli.md](./cli.md) and [customization.md](./customization.md).
7. For behavioral rules, use the files in [rules](./rules).
8. For compatibility work, use [migration.md](./migration.md).

## Critical Differences From Upstream shadcn/ui

- The public CLI is not feature-equivalent to upstream `shadcn`.
- There is no verified local equivalent for upstream `info`, `docs`, `search`, `view`, presets, or `add --dry-run/--diff/--view`.
- Components are commonly split across multiple `.svelte` files inside a folder with an `index.ts` barrel.
- Many components are documented with namespace imports such as `import * as Dialog from "$lib/components/ui/dialog/index.js"`, though named exports often exist too via the barrel file.
- `shadcn-svelte` components are commonly built on Bits UI primitives, so local docs and local source matter more than upstream React examples.

## Choosing Commands

Use the project's package runner for CLI commands. Examples:

- `npx shadcn-svelte@latest init`
- `pnpm dlx shadcn-svelte@latest add button`
- `bunx --bun shadcn-svelte@latest add dialog`

Prefer the runner that matches the project's package manager.

Only rely on the commands documented in [cli.md](./cli.md):

- `init`
- `add`
- `registry build`

Do not suggest undocumented preview, diff, search, docs, or project-info commands.

## Component Usage

When the user asks how to use a component:

1. Check whether the component is documented in `docs/content/components`.
2. Read the component's `index.ts` barrel or installed project barrel to confirm export names.
3. Prefer the import style shown by the local docs for that component.
4. Preserve Svelte-specific composition, props, and markup.

Examples of local import shapes:

```ts
import * as Dialog from "$lib/components/ui/dialog/index.js";
import * as Tabs from "$lib/components/ui/tabs/index.js";
import { Button } from "$lib/components/ui/button/index.js";
```

## When To Inspect Installed Source

Inspect the local component folder before advising when any of these apply:

- the user already has the component installed
- the user wants to customize variants, slots, or styling
- the user is debugging props, exports, or composition
- the docs page is ambiguous or thin

Focus on the component's `index.ts` and its sibling `.svelte` files.

## References

- [cli.md](./cli.md)
- [customization.md](./customization.md)
- [migration.md](./migration.md)
- [rules/composition.md](./rules/composition.md)
- [rules/forms.md](./rules/forms.md)
- [rules/icons.md](./rules/icons.md)
- [rules/styling.md](./rules/styling.md)
