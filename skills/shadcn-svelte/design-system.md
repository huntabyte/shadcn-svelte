# Design Systems from DESIGN.md

Build a new app from a preset, install every component, restyle it from a `DESIGN.md`, then render a design system page.

Trigger phrases: "build me a design system using <preset>", "apply this DESIGN.md", "create a showcase / design system page", "make shadcn-svelte look like <brand>".

## Contents

- Inputs to confirm
- Step 1: Scaffold
- Step 2: Install everything
- Step 3: Read the DESIGN.md
- Step 4: Map tokens to the theme
- Step 5: Map component recipes to variants
- Step 6: Build the design system page ([design-system-page.md](./design-system-page.md))
- Step 7: Verify
- Report back

---

## Inputs to Confirm

| Input     | Default                                  | Notes                                                                                                                                                            |
| --------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preset    | Optional                                 | An encoded **shadcn-svelte** preset from [the builder](https://shadcn-svelte.com/create). Pass it through unchanged. React preset codes are not interchangeable. |
| DESIGN.md | Required                                 | A path, URL or pasted content. Keep a copy in the app root as `DESIGN.md`.                                                                                       |
| App       | Existing project, or a new SvelteKit app | Use Svelte + Vite when requested.                                                                                                                                |
| App name  | Derived from the brand in DESIGN.md      | Kebab-case.                                                                                                                                                      |

If the DESIGN.md path cannot be read, ask for an accessible copy. Do not guess its contents.

## Step 1: Scaffold and Initialize

For an existing app, work in its root and read `components.json` before changing anything. Preserve installed components and intentional customizations. Only install missing components; do not use `--overwrite` or reinitialize an existing project without authorization.

For a new app, scaffold **separately** from shadcn-svelte initialization:

```bash
npx sv create <app>
cd <app>
```

Choose TypeScript and add Tailwind CSS through `sv` or follow the [SvelteKit installation guide](https://shadcn-svelte.com/docs/installation/sveltekit). For Svelte + Vite, use `npm create vite@latest <app> -- --template svelte-ts` and follow the [Vite installation guide](https://shadcn-svelte.com/docs/installation/vite).

Then initialize with the user's shadcn-svelte preset:

```bash
npx shadcn-svelte@latest init --preset <code>
```

Without a preset, run `npx shadcn-svelte@latest init` and select a style based on the DESIGN.md. Use a builder-generated preset if unattended initialization is required. Do not invent a preset string or pass a bare style name to `--preset`.

The shadcn-svelte CLI initializes an existing project; it has no React `--template`, `--name`, `--base`, `--no-monorepo`, or `init -y` flags, and no `info` command. Read `style`, `iconLibrary`, `tailwind.css` and `aliases` from `components.json` instead. Use the project's package runner for every command (see [cli.md](./cli.md)).

### Picking a style

The theme gets replaced by the DESIGN.md anyway. The style decides geometry the CSS variables can't reach: control padding, density, how rounded and how raised the components are. Read the DESIGN.md's radius scale, control heights, shadows and layout density, then pick:

| Style  | Character                                             | Pick when the DESIGN.md has                                            |
| ------ | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| `vega` | The classic shadcn/ui look.                           | Neutral, conventional SaaS geometry; nothing extreme.                  |
| `nova` | Reduced padding and margins for compact layouts.      | 32–36px controls, 6–8px radius, hairlines over shadows.                |
| `maia` | Soft and rounded, with generous spacing.              | 40px+ controls, 12px+ card radius, generous padding, editorial pacing. |
| `lyra` | Boxy and sharp.                                       | 0–4px radius, hard edges, mono or technical type.                      |
| `mira` | Compact.                                              | Dense data UIs, 28–32px controls, tight tables.                        |
| `luma` | Rounded geometry, soft elevation, breathable layouts. | Pill buttons, soft layered shadows, glassy or macOS-like surfaces.     |
| `rhea` | Luma, but more compact.                               | Luma's softness with product-UI density.                               |
| `sera` | Editorial and typographic.                            | Serif display type, editorial pacing, magazine-like hierarchy.         |

State the choice and the reason in one line ("Picked maia: 40px controls, 12–16px cards, generous padding"). If the user names a style, use it. Read `style`, `iconLibrary`, `tailwind.css` and `aliases` from `components.json` before writing any code.

## Step 2: Install Everything

In a new app:

```bash
npx shadcn-svelte@latest add --all --yes
```

Count installed component **directories with an `index.ts` barrel** under the resolved `aliases.ui` path, not individual `.svelte` files. Never quote a count from memory. In an existing app, add only the missing components to preserve local work.

Wire up the providers in `src/routes/+layout.svelte` (SvelteKit) or the root component (Vite):

```svelte
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  import { ModeWatcher } from "mode-watcher";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<ModeWatcher />
<Tooltip.Provider>
  {@render children()}
  <Toaster />
</Tooltip.Provider>
```

Call `toast()` from `svelte-sonner` for notifications. Use `mode-watcher` for the theme toggle (see [customization.md](./customization.md#dark-mode)). Adapt aliases to `components.json`; do not assume `$lib` in a Vite app.

Run the app's check script (usually `npm run check`, `pnpm check` or `bun run check`). It should run `svelte-check`, not just `tsc`, so `.svelte` templates are checked too. In SvelteKit, run `svelte-kit sync` first if generated types are missing. Fix type errors before moving on.

---

## Step 3: Read the DESIGN.md

DESIGN.md files usually carry YAML frontmatter (`colors`, `typography`, `rounded`, `spacing`, `components`) and prose sections (Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts, Responsive, Known Gaps). Some only have prose with `{colors.x}` references. Handle both.

Long files exceed one read. Search the headings with `rg` first, then read frontmatter, **Do's and Don'ts**, **Iteration Guide** and **Known Gaps** in full. Those sections hold the rules that override defaults.

Extract into a working table before editing anything:

| Extract               | Look for                                                              |
| --------------------- | --------------------------------------------------------------------- |
| Canvas and ink        | `canvas`, `surface`, `ink`, "page floor", "body text"                 |
| Action color + states | `primary`, `-hover`, `-active`, `-pressed`, `-disabled`, `on-primary` |
| Secondary actions     | `button-secondary` fill, text and border                              |
| Surfaces              | card fills, soft bands, dark product surfaces                         |
| Lines                 | `hairline`, border alpha, "1px solid"                                 |
| Focus                 | outline vs ring, color, width, offset, alpha                          |
| Type families         | display, body, mono, and the documented **substitutes**               |
| Type scale            | size, weight, line height, tracking per token                         |
| Radius scale          | every value and what it applies to                                    |
| Elevation             | each shadow tier, verbatim                                            |
| Control heights       | button, input, ghost, icon-button heights and padding                 |
| Hard rules            | every "Don't" and "never"                                             |

---

## Step 4: Map Tokens to the Theme

Edit the global CSS file named by `tailwind.css` in `components.json`. Keep hex values when the DESIGN.md gives hex. Don't convert them to OKLCH.

### Role mapping

| DESIGN.md role                               | shadcn variable                                             |
| -------------------------------------------- | ----------------------------------------------------------- |
| canvas / surface / page floor                | `--background`                                              |
| ink / headline text                          | `--foreground`, `--card-foreground`, `--popover-foreground` |
| primary CTA fill / on-primary                | `--primary` / `--primary-foreground`                        |
| primary hover, pressed or active fill        | new `--primary-active` (or `--primary-pressed`)             |
| secondary button fill / text                 | `--secondary` / `--secondary-foreground`                    |
| soft band, alternating section               | `--muted`                                                   |
| secondary or descriptive text                | `--muted-foreground`                                        |
| ghost hover wash, active tab, menu highlight | `--accent` / `--accent-foreground`                          |
| card / feature card fill                     | `--card`                                                    |
| floating layer (menus, dialogs)              | `--popover` (usually the canvas)                            |
| hairline / structural border                 | `--border`, `--input`                                       |
| focus color                                  | `--ring`                                                    |
| error / validation                           | `--destructive`                                             |
| illustration accents                         | `--chart-1` … `--chart-5`, plus named tokens                |
| sidebar or nav rail surface                  | `--sidebar-*`                                               |

Every token without a shadcn slot gets a variable in `:root` (and `.dark` when it changes) and a registration in `@theme inline`:

```css
:root {
  --primary-active: #a9583e;
  --surface-card: #efe9de;
}

@theme inline {
  --color-primary-active: var(--primary-active);
  --color-surface-card: var(--surface-card);
}
```

### Radius

A DESIGN.md radius scale rarely fits the `--radius` multipliers. Pin each step in `@theme inline` instead. These are the classes the nova style uses; confirm them in the installed source or style CSS:

| Class         | Used by                                         |
| ------------- | ----------------------------------------------- |
| `rounded-sm`  | Small accents                                   |
| `rounded-md`  | Menu, select and command items                  |
| `rounded-lg`  | Buttons, inputs, selects, tabs, popovers, menus |
| `rounded-xl`  | Cards, dialogs, command                         |
| `rounded-2xl` | Toasts, large containers                        |
| `rounded-4xl` | Badges (pill)                                   |

```css
@theme inline {
  /* DESIGN.md step → Tailwind class used by that component. */
  --radius-sm: 4px; /* xs: accents. */
  --radius-md: 6px; /* sm: menu items. */
  --radius-lg: 8px; /* md: buttons, inputs. */
  --radius-xl: 12px; /* lg: cards, dialogs. */
  --radius-2xl: 16px; /* xl: toasts, hero containers. */
  --radius-3xl: 16px;
  --radius-4xl: 9999px; /* pill: badges. */
}
```

Replace the existing `--radius-*` lines in `@theme inline` rather than adding a second block. Confirm the classes for the installed style:

```bash
rg -o 'rounded-[a-z0-9-]+' <ui> <style-css> | sort | uniq -c
```

`rounded-[min(var(--radius-md),Npx)]` caps small buttons and select triggers. Edit the cap when the DESIGN.md wants rounder small controls.

### Elevation

Override Tailwind's shadow scale in `@theme`, not `@theme inline`. Copy multi-layer shadows verbatim. Set `--shadow-xs` to `0 0 #0000` when the system is hairline-only, because inputs and outline buttons use it.

```css
@theme {
  --shadow-xs: 0 0 #0000;
  --shadow-sm: 0 1px 3px rgb(20 20 19 / 0.08);
  --shadow-lg: 0 1px 3px rgb(20 20 19 / 0.08), 0 8px 24px rgb(20 20 19 / 0.06);
}
```

### Fonts

Brand fonts are usually licensed. Use the substitutes the DESIGN.md names, installed from Fontsource with the project's package manager, and import every face you reference at the top of the CSS file:

```bash
npm install @fontsource-variable/inter @fontsource-variable/cormorant-garamond @fontsource-variable/jetbrains-mono
```

```css
@import "@fontsource-variable/inter";
@import "@fontsource-variable/cormorant-garamond";
@import "@fontsource-variable/jetbrains-mono";

@theme inline {
  --font-sans: "Inter Variable", -apple-system, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond Variable", Garamond, serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --font-heading: var(--font-sans);
}
```

`--font-heading` styles small component titles (`Card.Title`, `Dialog.Title`, `Sheet.Title`). Point it at the display face only when that face reads well at 16px. Otherwise keep it on the sans and use display tokens for page headings.

### Type scale

Turn every typography token into a `type-*` utility. Don't use `--text-*` theme keys for this, because `cn()` treats unknown `text-*` classes as colors and drops whichever comes first when one sits next to `text-muted-foreground`.

```css
@utility type-display-lg {
  font-family: var(--font-serif);
  font-size: clamp(34px, 3vw + 16px, 48px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.021em;
}

@utility type-caption-upper {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
```

- Clamp display sizes so mobile works. Convert pixel tracking to `em` (`-1px / 48px = -0.021em`) so the ratio holds as the size shrinks.
- Respect the rules on tracking (none below a size) and weight (display never bold).

### Dark mode

- **DESIGN.md defines dark surfaces** (product mockups, footers): put them in `.dark`. The `.dark` variables are inherited by descendants, and `@custom-variant dark (&:is(.dark *))` scopes dark utilities. Use `class="dark"` on a section to render its children with dark tokens. Use it for dark bands, featured pricing cards and footers.
- **DESIGN.md is light-only**: derive `.dark` from the brand's known dark surfaces and tell the user it's derived.

### Focus

Match the documented focus treatment:

- **Ring with alpha** (for example "3px coral at 15%"): replace `ring-ring/50` with the documented alpha on field components (`input`, `textarea`, `input-group`, `select`, `native-select`, `combobox`, `input-otp`).
- **Solid outline with offset**: add an unlayered rule so it beats `outline-none`, and cancel the ring shadow:

```css
:is(
  button,
  a[href],
  [role="button"],
  [role="tab"],
  [role="checkbox"],
  [role="radio"],
  [role="switch"],
  [role="slider"]
):focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  --tw-ring-shadow: 0 0 #0000;
}
```

This covers actions only. Field controls keep their ring. When the DESIGN.md applies the outline to fields too, add `input, textarea, select, [role="combobox"]` to the selector.

---

## Step 5: Map Component Recipes to Variants

Restyle the installed component source: edit `tv` variants from `tailwind-variants` and utility classes in the `.svelte` files. The source registry uses `cn-*` style markers; the registry build injects the selected style's utilities into the distributed components. Inspect the installed files rather than assuming the source registry's markers are the only styles. If the app also has shared style CSS, inspect it before changing geometry or states. Do not edit `node_modules`. Keep existing variant names so usage stays standard. Add a variant only when the DESIGN.md defines a distinct recipe.

| DESIGN.md recipe                     | shadcn target                                |
| ------------------------------------ | -------------------------------------------- |
| `button-primary`                     | `Button` `default`                           |
| `button-secondary` (tinted fill)     | `Button` `secondary`                         |
| `button-secondary` (canvas + border) | `Button` `outline`                           |
| `button-ghost`, nav links            | `Button` `ghost`                             |
| text link                            | `Button` `link`                              |
| circular icon button                 | `Button` `icon*` sizes + `rounded-full`      |
| `badge-pill`, `badge-<accent>`       | `Badge` `secondary`, `default`, new variants |
| `card`, `feature-card`               | `Card` (fill, ring, `--card-spacing`)        |
| `text-input`, `-focused`             | `Input`, `InputGroup`, `Select`, `Textarea`  |
| `category-tab`, filter row           | `Tabs` `default` list + trigger              |

**Control heights move together.** When the button height changes, change the field controls to match, or forms misalign. Inspect the installed style and these component files together:

| Component    | Source to inspect                                             |
| ------------ | ------------------------------------------------------------- |
| Button       | `button/button.svelte`, default and icon sizes                |
| Input        | `input/input.svelte`                                          |
| InputGroup   | `input-group/input-group.svelte` and its input                |
| Select       | `select/select-trigger.svelte`, default size                  |
| NativeSelect | `native-select/native-select.svelte`                          |
| Combobox     | Installed composition from the docs (often Popover + Command) |
| Toggle       | `toggle/toggle.svelte`                                        |
| InputOTP     | `input-otp/input-otp-slot.svelte`                             |
| Tabs         | `tabs/tabs-list.svelte` and trigger                           |
| Menubar      | `menubar/menubar.svelte`                                      |
| Command      | `command/command-input.svelte` and input group                |

```bash
rg 'h-8|size-8|min-h-8|cn-button-size-default|cn-input|cn-select-trigger' <ui> <style-css>
```

The nova style has compact defaults; other styles use different values. Preserve conditional sizes and responsive behavior when editing.

**States.** Follow the documented states exactly. If the DESIGN.md says "darken on press only", use `active:` instead of `hover:`. Keep hover on ghost buttons and menu items even when the spec omits it, and tell the user you did.

**Hard rules.** Turn each "Don't" into a check before you finish, for example: no radius outside the scale, no accent color on buttons, no bold display type.

---

## Step 6: Build the Design System Page

Follow [design-system-page.md](./design-system-page.md). It sets the section outline, how to present each foundation, the component tiers and block anatomy, pinned state matrices, edge cases, do/don't pairs, and recipes.

In short:

1. Foundations first: color roles as contrast-checked pairs, palette, type specimen table, spacing, radius and elevation ladders.
2. Components by tier: primitives get a variant × state matrix, size ladder and icon row. Composed components get a typical example, additions and edge cases. Overlays get real triggers.
3. Then rendered do/don't pairs for the DESIGN.md's rules, the DESIGN.md's named recipes rebuilt from components, and one example screen.

Copy the helpers from `assets/showcase/` (`preview-states.css`, `state-matrix.svelte`, `preview-state.ts`, `color-pair.svelte`). Put sections in `src/lib/showcase/<section>.svelte` with `src/routes/design-system/+page.svelte` (SvelteKit), or `src/showcase/<section>.svelte` (Vite). Write copy in the brand's voice.

### Known traps

| Component        | Trap                                                               | Fix                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Command inline   | Initial selection or autofocus can steal scroll.                   | Use the installed Bits UI API: `let value = $state("none")` and `<Command.Root bind:value>`; verify the page stays at the top. Do not copy cmdk's `onValueChange`. |
| Sidebar          | Default positioning escapes the preview frame.                     | `<Sidebar.Provider class="min-h-0">` and `<Sidebar.Root collapsible="none">`.                                                                                      |
| Select           | The label may show the raw value if item metadata is missing.      | Follow the installed docs: `<Select.Root type="single" items={items} bind:value>` and `<Select.Value placeholder="Choose an option" />` inside `Select.Trigger`.   |
| Message.Footer   | Beside Message.Content, the footer becomes a squeezed flex column. | Put `Message.Footer` inside `Message.Content`.                                                                                                                     |
| Resizable        | React panel APIs do not match Paneforge.                           | Use `Resizable.PaneGroup direction="horizontal"` and `Resizable.Pane defaultSize={40}`.                                                                            |
| RTL              | Setting direction on a preview alone may miss portaled content.    | Set `dir="rtl"` on the wrapper and direction-aware roots such as `NavigationMenu.Root`; verify portaled content against the installed Bits UI docs.                |
| NavigationMenu   | Content is clipped by the example frame.                           | Leave room for the content and avoid clipping overflow.                                                                                                            |
| Header nav links | React `asChild` / `render` patterns do not apply.                  | `<Button href="#foundations">Foundations</Button>` renders an anchor. Custom primitive triggers use Svelte child snippets.                                         |
| Browser helpers  | DOM access at module scope breaks SSR.                             | Keep canvas, observers and computed styles inside `$effect` or `onMount`; clean up observers.                                                                      |

### Coverage check

```bash
node <skill-dir>/scripts/showcase-coverage.mjs <resolved-ui-dir> src/lib/showcase src/routes/design-system
node <skill-dir>/scripts/showcase-coverage.mjs <resolved-ui-dir> src/showcase  # Vite.
```

It lists installed component directories that no showcase source imports. It recognizes `.svelte`, `.ts`, `.js`, namespace imports, barrel `index.js` paths and direct component paths. Keep the UI directory outside the showcase roots; the script excludes it even if a root contains it. Fix the missing list, then inspect the page: import coverage does not prove a component actually renders. Showcase composition-only examples from the docs separately when they have no installed barrel.

---

## Step 7: Verify

Start the dev server and check it in a browser:

1. The app check script and production build pass, including SvelteKit SSR (see Step 2).
2. No console errors.
3. Loads at `scrollY === 0`. Anything else means a component is stealing scroll on mount.
4. No horizontal overflow at 375px and 1280px: `document.documentElement.scrollWidth <= innerWidth`.
5. Screenshot the hero, Foundations, one form section and one dark band. Compare against the DESIGN.md: canvas color, CTA color, display font, radius, focus ring.
6. Toggle dark mode once.

---

## Report Back

- App path, dev URL, component count from disk.
- The style picked (when no preset was given) and why.
- What maps where: colors, fonts (and substitutes), radius, shadows, focus.
- Contrast pairs under 4.5:1, including ones the DESIGN.md itself specifies.
- Every component file you edited and why.
- Every deliberate deviation from the DESIGN.md (derived dark mode, kept hover, substituted fonts).
