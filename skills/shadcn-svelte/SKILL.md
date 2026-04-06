---
name: shadcn-svelte
description: Manages shadcn-svelte components and projects — adding, fixing, debugging, styling, and composing UI. Provides project context, component patterns, and usage examples. Applies when working with shadcn-svelte, component registries, or any project with a components.json file.
user-invocable: false
allowed-tools: Bash(npx shadcn-svelte@latest *), Bash(pnpm dlx shadcn-svelte@latest *), Bash(bunx --bun shadcn-svelte@latest *)
---

# shadcn-svelte

A framework for building UI, components and design systems for Svelte. Components are added as source code to the user's project via the CLI.

> **IMPORTANT:** Run all CLI commands using the project's package runner: `npx shadcn-svelte@latest`, `pnpm dlx shadcn-svelte@latest`, or `bunx --bun shadcn-svelte@latest` — based on the project's `packageManager`. Examples below use `npx shadcn-svelte@latest` but substitute the correct runner for the project.

## Current Project Context

Read `components.json` to understand the project's framework, aliases, installed components, and Tailwind version. Check the `ui` alias directory to see what components are already installed.

## Principles

1. **Use existing components first.** Check the `ui` alias directory before writing custom UI.
2. **Compose, don't reinvent.** Settings page = Tabs + Card + form controls. Dashboard = Sidebar + Card + Chart + Table.
3. **Use built-in variants before custom styles.** `variant="outline"`, `size="sm"`, etc.
4. **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-blue-500`.

## Critical Rules

These rules are **always enforced**. Each links to a file with Incorrect/Correct code pairs.

### Styling & Tailwind → [styling.md](./rules/styling.md)

- **`class` for layout, not styling.** Never override component colors or typography.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`. For vertical stacks, `flex flex-col gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`, `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal ternaries.
- **No manual `z-index` on overlay components.** Dialog, Sheet, Popover, etc. handle their own stacking.

### Forms & Inputs → [forms.md](./rules/forms.md)

- **Forms use `Field.Group` + `Field.Field`.** Never use raw `div` with `space-y-*` or `grid gap-*` for form layout.
- **`InputGroup` uses `InputGroup.Input`/`InputGroup.Textarea`.** Never raw `Input`/`Textarea` inside `InputGroup`.
- **Buttons inside inputs use `InputGroup` + `InputGroup.Addon`.**
- **Option sets (2–7 choices) use `ToggleGroup`.** Don't loop `Button` with manual active state.
- **`Field.Set` + `Field.Legend` for grouping related checkboxes/radios.** Don't use a `div` with a heading.
- **Field validation uses `data-invalid` + `aria-invalid`.** `data-invalid` on `Field.Field`, `aria-invalid` on the control. For disabled: `data-disabled` on `Field.Field`, `disabled` on the control.

### Component Structure → [composition.md](./rules/composition.md)

- **Items always inside their Group.** `Select.Item` → `Select.Group`. `DropdownMenu.Item` → `DropdownMenu.Group`. `Command.Item` → `Command.Group`.
- **Dialog, Sheet, and Drawer always need a Title.** `Dialog.Title`, `Sheet.Title`, `DrawerTitle` required for accessibility. Use `class="sr-only"` if visually hidden.
- **Use full Card composition.** `Card.Header`/`Card.Title`/`Card.Description`/`Card.Content`/`Card.Footer`. Don't dump everything in `Card.Content`.
- **Button has no `isPending`/`isLoading`.** Compose with `Spinner` + `disabled`.
- **`Tabs.Trigger` must be inside `Tabs.List`.** Never render triggers directly in `Tabs`.
- **`Avatar` always needs `Avatar.Fallback`.** For when the image fails to load.

### Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

- **Use existing components before custom markup.** Check if a component exists before writing a styled `div`.
- **Callouts use `Alert`.** Don't build custom styled divs.
- **Empty states use `Empty`.** Don't build custom empty state markup.
- **Toast via `sonner`.** Use `toast()` from `sonner`.
- **Use `Separator`** instead of `<hr>` or `<div class="border-t">`.
- **Use `Skeleton`** for loading placeholders. No custom `animate-pulse` divs.
- **Use `Badge`** instead of custom styled spans.

### Icons → [icons.md](./rules/icons.md)

- **Import from `@lucide/svelte`.** Use per-icon imports: `import Search from "@lucide/svelte/icons/search"`.
- **No sizing classes on icons inside components.** Components handle icon sizing via CSS. No `size-4` or `w-4 h-4`.
- **Pass icons as components, not string keys.** `icon={Check}`, not a string lookup.

### CLI

- **Use `shadcn-svelte` CLI only.** Do not suggest upstream `shadcn` commands — they do not exist in this project.

## Key Patterns

These are the most common patterns that differentiate correct shadcn-svelte code.

```svelte
<!-- Namespace imports — always use this pattern. -->
<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<!-- Form layout: Field.Group + Field.Field, not div + Label. -->
<Field.Group>
  <Field.Field>
    <Field.Label for="email">Email</Field.Label>
    <Input id="email" type="email" />
  </Field.Field>
</Field.Group>

<!-- Validation: data-invalid on Field.Field, aria-invalid on the control. -->
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" aria-invalid />
  <Field.Error>Invalid email address.</Field.Error>
</Field.Field>

<!-- Spacing: gap-*, not space-y-*. -->
<div class="flex flex-col gap-4">  <!-- correct -->
<div class="space-y-4">           <!-- wrong -->

<!-- Equal dimensions: size-*, not w-* h-*. -->
<Avatar.Root class="size-10">   <!-- correct -->
<Avatar.Root class="w-10 h-10"> <!-- wrong -->

<!-- Status colors: Badge variants or semantic tokens, not raw colors. -->
<Badge variant="secondary">+20.1%</Badge>      <!-- correct -->
<span class="text-emerald-600">+20.1%</span>   <!-- wrong -->
```

## Component Selection

| Need                       | Use                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| Button/action              | `Button` with appropriate variant                                                                   |
| Form inputs                | `Input`, `Select`, `Combobox`, `Switch`, `Checkbox`, `RadioGroup`, `Textarea`, `InputOTP`, `Slider` |
| Toggle between 2–5 options | `ToggleGroup` + `ToggleGroup.Item`                                                                  |
| Data display               | `Table`, `Card`, `Badge`, `Avatar`                                                                  |
| Navigation                 | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination`                                     |
| Overlays                   | `Dialog` (modal), `Sheet` (side panel), `Drawer` (bottom sheet), `AlertDialog` (confirmation)       |
| Feedback                   | `sonner` (toast), `Alert`, `Progress`, `Skeleton`, `Spinner`                                        |
| Command palette            | `Command` inside `Dialog`                                                                           |
| Charts                     | `Chart` (wraps Chart.js)                                                                            |
| Layout                     | `Card`, `Separator`, `Resizable`, `ScrollArea`, `Accordion`, `Collapsible`                          |
| Empty states               | `Empty`                                                                                             |
| Menus                      | `DropdownMenu`, `ContextMenu`, `Menubar`                                                            |
| Tooltips/info              | `Tooltip`, `HoverCard`, `Popover`                                                                   |

## Key Fields in components.json

- **`aliases`** → use the actual alias prefix for imports (e.g. `$lib/`, `~/`), never hardcode.
- **`tailwindVersion`** → `"v4"` uses `@theme inline` blocks; `"v3"` uses `tailwind.config.js`.
- **`tailwindCssFile`** → the global CSS file where custom CSS variables are defined. Always edit this file, never create a new one.
- **`iconLibrary`** → determines icon imports. Use `@lucide/svelte` for `lucide`. Never assume the wrong package.
- **`resolvedPaths`** → exact file-system destinations for components, utils, hooks, etc.
- **`framework`** → routing and file conventions (SvelteKit, Vite, Astro).

## Workflow

1. **Get project context** — read `components.json`, `package.json`, `svelte.config.*`, and the global CSS file.
2. **Check installed components first** — list the `resolvedPaths.ui` directory. Don't import components that haven't been added, and don't re-add ones already installed.
3. **Read local docs** — check `docs/content/components/<name>.md` and the installed component source before generating code. Never guess APIs.
4. **Install or update** — `npx shadcn-svelte@latest add`.
5. **Review added components** — after adding a component, read the added files. Check for missing sub-components, incorrect composition, or rule violations. Fix all issues before moving on.

## Quick Reference

```bash
# Initialize existing project.
npx shadcn-svelte@latest init

# Add components.
npx shadcn-svelte@latest add button card dialog
npx shadcn-svelte@latest add --all

# Build a custom registry.
npx shadcn-svelte@latest registry build
```

## Detailed References

- [rules/forms.md](./rules/forms.md) — Field.Group, Field.Field, InputGroup, ToggleGroup, Field.Set, validation states
- [rules/composition.md](./rules/composition.md) — Groups, overlays, Card, Tabs, Avatar, Alert, Empty, Toast, Separator, Skeleton, Badge, Button loading
- [rules/icons.md](./rules/icons.md) — icon imports, icon sizing, passing icons as components
- [rules/styling.md](./rules/styling.md) — Semantic colors, variants, class, spacing, size, truncate, dark mode, cn(), z-index
- [cli.md](./cli.md) — Commands and flags
- [customization.md](./customization.md) — Theming, CSS variables, extending components

## Differences from shadcn/ui

- **No `info` command** — Read `components.json` and the `ui` directory directly instead.
- **No `docs`, `search`, `view`, `diff` commands** — Read local docs and component source instead.
- **No preset system** — No `--preset` flag or preset switching workflow.
- **No `--dry-run`, `--diff`, `--view` flags** — Inspect source files directly.
- **No MCP server** — Use local file inspection instead.
- **Bits UI primitives** — Components are built on Bits UI, not Radix. Prop names and composition differ.
- **Svelte 5 runes** — Use `$props()`, `$bindable()`, `$state()`, `{#snippet}`, `{@render}` instead of React hooks and JSX.
- **Namespace imports** — `import * as Dialog from "..."` rather than named React component imports.
- **`class` not `className`** — All Svelte components use the `class` prop.
- **`for` not `htmlFor`** — `Field.Label` uses standard HTML `for` attribute.
- **Multi-file components** — Components span multiple `.svelte` files with an `index.ts` barrel.
