## Prompt

Please refer to [shadcn/ui repo](https://github.com/shadcn-ui/ui) and the [shadcn/ui website](https://ui.shadcn.com/) to complete the items I explicitly assign you. This project, shadcn-svelte, is a Svelte port of the shadcn/ui component library, so content and design should closely follow the original library, tailwind classes should be identical except where language differences require. Refer to the [react-to-svelte skill](https://raw.githubusercontent.com/Tsurgcom/react-to-svelte/refs/heads/master/SKILL.md) for functional differences between the two lanuages. If you encounter any issues or have questions about specific tasks, please don't hesitate to ask for clarification or assistance. If any changes are needed to bits-ui primitives, leave a TODO.md note in the directory.

1. Stylistic differences - ignore where `svelte-orange` is used.
2. Functional differences:

- Svelte's reactivity and component structure may require different approaches to state management and component composition compared to React. Refer to the react-to-svelte skill for guidance on these differences.
- instead of both Radix UI and Base UI primitives, we are using one - the [bits-ui library](https://bits-ui.com/docs/introduction). Use the Radix UI primitives as a reference for functionality and accessibility, but implement using bits-ui components and utilities. Refer to the bits-ui documentation for guidance on how to use their components and utilities effectively.

## Updates remaining

_note: `?` indicates that feature may have already been implemented but I am not sure, so check first._

- [blocked by Bits] [Combobox component](https://ui.shadcn.com/docs/components/radix/combobox) - new, completely replaces old implementation using popover + command
- [blocked by Bits] [RTL support](https://ui.shadcn.com/docs/rtl) & [Direction component](https://ui.shadcn.com/docs/components/radix/direction)
- [ ] Revise [Step components](../InstallationSteps.png) used in Manual install tab

- [blocked by Bits] Select component - item-aligned default, popper option
- [ ] fix docs sidebar - top missing opaque div?
- [ ] Changelog "More Updates" section - dont change content, check new format with links at bottom [here](https://ui.shadcn.com/docs/changelog)
- [x] Move API reference from top badge to separate section at bottom of each .md file, remove API reference, Docs, Component Source badge from `slug...` rendering
- [ ] fix new api doc links
- [x] add Scira to copy page dropdown (refer to https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/docs-copy-page.tsx)
- [ ] fix max size of component previews so that they don't overflow, compare preview of `Aspect Ratio` component on both sites to verify (check original shadcn/ui repo!!)

- [ ] evaluate difficulty of moving RangeCalendar into mode of Calendar component, leave a todo note (dont change!)
- [ ] revise pm command logic

---

## Documentation Review Report (2025-03-23)

Reviewed by 8 parallel agents covering: component docs (A-Z), non-component docs, cross-referencing with source code, code example validation, and Svelte 5 syntax audit.

### Fixed Issues

#### Critical (broken code examples)

| # | File | Issue | Status |
|---|------|-------|--------|
| 1 | `button.md:239` | React `className` -> Svelte `class` | Fixed |
| 2 | `breadcrumb.md:180,184,211` | JSX comments `{/* ... */}` -> `<!-- ... -->` | Fixed |
| 3 | `installation/index.md:41` | Mismatched quotes in import | Fixed |
| 4 | `field.md:77` | React `autoComplete` -> HTML `autocomplete` | Fixed |
| 5 | `sidebar.md:411-421` | `Sidebar.Inset` incorrectly nested inside `Sidebar.Root` (should be sibling) | Fixed |
| 6 | `tooltip.md:69-81` | `+layout.svelte` example split into two code blocks | Fixed |
| 7 | `forms.md:150` | Text said `attrs` but code uses `props` | Fixed |
| 8 | `alert-dialog.md:67` | Typo `showLineNumbersw` (extra `w`) | Fixed |

#### Medium (misleading/incorrect info)

| # | File | Issue | Status |
|---|------|-------|--------|
| 9 | All ~55 component docs | Source links used non-existent `next` branch and `sites/docs/` path | Fixed |
| 10 | `hover-card.md:6` | Source link pointed to `link-preview` instead of `hover-card` | Fixed |
| 11 | `drawer.md:85` | `Button` used but never imported | Fixed |
| 12 | `empty.md:74` | `Button` used but never imported | Fixed |
| 13 | `field.md:70,77,81` | `Input` and `Switch` used but never imported | Fixed |
| 14 | `carousel.md:232` | Text said `bind:api` but code uses `setApi` callback | Fixed |
| 15 | `installation/index.md:15` | React frameworks in callout (Next.js, TanStack Start) | Fixed |
| 16 | `native-select.md:148` | Code block tagged as `tsx` instead of `svelte` | Fixed |
| 17 | `installation/index.md:51` | Referenced "Rollup" instead of "your bundler" | Fixed |

#### Low (typos, inconsistencies)

| # | File | Issue | Status |
|---|------|-------|--------|
| 18 | `calendar.md:34` | Typo: "See call" -> "See all" | Fixed |
| 19 | `empty.md:3` | Grammar: "a empty" -> "an empty" | Fixed |
| 20 | `date-picker.md:23` | Typo: "installations" -> "installation" | Fixed |
| 21 | `field.md:210` | Stray "Copy" text (copy-paste artifact) | Fixed |
| 22 | `sidebar.md:407` | Prose said `SidebarInset` -> `Sidebar.Inset` | Fixed |
| 23 | `breadcrumb.md:27,91` | Duplicate `## Examples` heading; section before Installation | Fixed |
| 24 | `breadcrumb.md:95` | Referenced Svelte 4 `<slot>` -> updated to "children" | Fixed |
| 25 | `badge.md` | Missing `component: true` in frontmatter | Fixed |
| 26 | `menubar.md:24` | Missing `<div></div>` inside ComponentPreview | Fixed |

### Not Fixed (intentional/low-risk)

| # | File | Issue | Reason |
|---|------|-------|--------|
| - | `forms.md:123` | `zod4Client` vs `zod4` in examples | `zod4Client` is correct for the documented SvelteKit load-function pattern |
| - | `button.md:186,354` | Duplicate `### Link` heading | Two legitimately different sections (variant vs href behavior) |
| - | `changelog/2023-10` | Svelte 4 syntax in code example | Historical changelog entry |
| - | `changelog/2024-02` | `@lucide/svelte` package name | Retroactive update for current package name |
| - | `chart.md:32` | `chart-bar-interactive` ComponentPreview may not render | Needs `type="block"` attribute — requires verification |

### Positive Findings

- **Svelte 5 syntax is excellent** — all 385+ example components use correct `$props()`, `$state()`, `$derived()`, `{#snippet}`, `{@render}`, and `onclick` syntax
- **Zero instances of Svelte 4 patterns** in current component docs
- **All 373 non-chart ComponentPreview references resolve correctly** to existing registry entries
- **No React-isms in `.svelte` demo files**
- **Import paths are consistent** across all example files

---

## Example Files Review Report (2025-03-23)

Reviewed all 388 `.svelte` example files in `docs/src/lib/registry/examples/` using 8 parallel agents.

### Fixed Issues

#### Bugs / Incorrect Code

| # | File | Issue | Status |
|---|------|-------|--------|
| 1 | `toggle-group-demo.svelte` + 5 variants | `value="strikethrough"` and `aria-label="Toggle strikethrough"` but renders `UnderlineIcon` — fixed to `value="underline"` | Fixed |
| 2 | `checkbox-disabled.svelte` | Label `for="terms2"` doesn't match Checkbox `id="terms"` — clicking label won't toggle checkbox | Fixed |
| 3 | `combobox-form.svelte` | `let open = false` missing `$state()` rune — `bind:open` won't work reactively | Fixed |
| 4 | `dialog-close-button.svelte` | React `defaultValue` prop — should be `value` | Fixed |
| 5 | `dialog-demo.svelte` | React `defaultValue` prop (2 occurrences) — should be `value` | Fixed |
| 6 | `dialog-no-close-button.svelte` | React `defaultValue` prop (2 occurrences) — should be `value` | Fixed |
| 7 | `card-demo.svelte` | Submit button outside `<form>` element — click won't trigger submission | Fixed |
| 8 | `empty-card-demo.svelte` | `<a>` nested inside `<Button>` — invalid HTML (interactive in interactive) | Fixed |
| 9 | `empty-demo.svelte` | `<a>` nested inside `<Button>` — invalid HTML (interactive in interactive) | Fixed |
| 10 | `pagination-demo.svelte` | Extra hard-coded `Pagination.Ellipsis` outside the loop — always shows duplicate ellipsis | Fixed |
| 11 | `radio-group-form.svelte` | Typo: "Direction messages" should be "Direct messages" | Fixed |
| 12 | `breadcrumb-responsive.svelte` | `Breadcrumb.Separator` nested inside `Breadcrumb.Item` — produces invalid `<li>` inside `<li>` HTML | Fixed |
| 13 | `tooltip-demo.svelte` | Relative import `../ui/button` inconsistent with all other examples using `$lib/registry/ui/button` | Fixed |
| 14 | `table-demo.svelte` | `#each` key uses entire object `(invoice)` instead of unique field `(invoice.invoice)` | Fixed |

#### Not Fixed (low-risk / intentional)

| # | File | Issue | Reason |
|---|------|-------|--------|
| - | `sheet-demo.svelte`, `sheet-side.svelte` | Two import statements from same module (cosmetic) | Style preference, not a bug |
| - | `field-checkbox-demo` / `field-checkbox` (+ 3 similar pairs) | Exact duplicate files | Likely intentional — one for preview, one for code display |
| - | `combobox-responsive.svelte` | Redundant `browser` check inside `onMount` | Dead code but harmless |
| - | `carousel-api.svelte` | Missing cleanup for Embla event listener in `$effect` | Matches upstream shadcn/ui pattern |
| - | `data-table-demo.svelte` | `createRawSnippet` with unescaped data (potential XSS) | Static demo data only — low risk |
| - | `navigation-menu-demo.svelte` | `HTMLAttributes<HTMLAnchorElement>` should be `HTMLAnchorAttributes` | Works correctly, just incomplete types |
| - | `select-scrollable.svelte` | Missing `label` props on Select.Items (typeahead uses `value` fallback) | Functional but suboptimal UX |

### Summary Stats

- **388 files reviewed** across 8 parallel agents
- **14 bugs fixed** (React-isms, invalid HTML, mismatched attributes, missing reactivity, logic errors)
- **0 Svelte 4 patterns found** — all examples use correct Svelte 5 syntax
- **0 React imports found** — no files import from `react`
- **5 React-isms fixed** (`defaultValue` x5 across 3 dialog files)
- **All import paths correct** (one relative path inconsistency fixed)
