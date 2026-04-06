# Customization & Theming

Components reference semantic CSS variable tokens. Change the variables to change every component.

## Contents

- How it works (CSS variables → Tailwind utilities → components)
- Color variables and OKLCH format
- Dark mode setup
- Adding custom colors (Tailwind v3 and v4)
- Border radius
- Customizing components (variants, class, wrappers)

---

## How It Works

1. CSS variables defined in `:root` (light) and `.dark` (dark mode).
2. Tailwind maps them to utilities: `bg-primary`, `text-muted-foreground`, etc.
3. Components use these utilities — changing a variable changes all components that reference it.

---

## Color Variables

Every color follows the `name` / `name-foreground` convention. The base variable is for backgrounds, `-foreground` is for text/icons on that background.

| Variable                                     | Purpose                          |
| -------------------------------------------- | -------------------------------- |
| `--background` / `--foreground`              | Page background and default text |
| `--card` / `--card-foreground`               | Card surfaces                    |
| `--popover` / `--popover-foreground`         | Popover surfaces                 |
| `--primary` / `--primary-foreground`         | Primary buttons and actions      |
| `--secondary` / `--secondary-foreground`     | Secondary actions                |
| `--muted` / `--muted-foreground`             | Muted/disabled states            |
| `--accent` / `--accent-foreground`           | Hover and accent states          |
| `--destructive`                              | Error and destructive actions    |
| `--border`                                   | Default border color             |
| `--input`                                    | Form input borders               |
| `--ring`                                     | Focus ring color                 |
| `--chart-1` through `--chart-5`              | Chart/data visualization         |
| `--sidebar-*`                                | Sidebar-specific colors          |

Colors use OKLCH: `--primary: oklch(0.205 0 0)` where values are lightness (0–1), chroma (0 = gray), and hue (0–360).

---

## Dark Mode

Class-based toggle via `.dark` on the root element. For SvelteKit, use a store or cookie-based approach to toggle the class — do not use React-specific packages like `next-themes`.

---

## Adding Custom Colors

Add variables to the file at `tailwindCssFile` from `components.json` (typically `app.css` or `globals.css`). Never create a new CSS file for this.

```css
/* 1. Define in the global CSS file. */
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}
.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}
```

```css
/* 2a. Register with Tailwind v4 (@theme inline). */
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

When `tailwindVersion` is `"v3"` (check `components.json`), register in `tailwind.config.js` instead:

```js
// 2b. Register with Tailwind v3 (tailwind.config.js).
module.exports = {
  theme: {
    extend: {
      colors: {
        warning: "oklch(var(--warning) / <alpha-value>)",
        "warning-foreground": "oklch(var(--warning-foreground) / <alpha-value>)",
      },
    },
  },
}
```

```svelte
<!-- 3. Use in components. -->
<div class="bg-warning text-warning-foreground">Warning</div>
```

---

## Border Radius

`--radius` controls border radius globally. Components derive values from it (`rounded-lg` = `var(--radius)`, `rounded-md` = `calc(var(--radius) - 2px)`).

---

## Customizing Components

See also: [rules/styling.md](./rules/styling.md) for Incorrect/Correct examples.

Prefer these approaches in order:

### 1. Built-in variants

```svelte
<Button variant="outline" size="sm">Click</Button>
```

### 2. Tailwind classes via `class`

```svelte
<Card class="max-w-md mx-auto">...</Card>
```

### 3. Add a new variant

Edit the component source to add a variant via `tailwind-variants` (or `cva` if used):

```svelte
<!-- components/ui/button/button.svelte -->
<!-- Add 'warning' to the variant map -->
```

### 4. Wrapper components

Compose primitives into higher-level components:

```svelte
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";

  let { title, description, onConfirm, children } = $props();
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>
    {@render children?.()}
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      <AlertDialog.Description>{description}</AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={onConfirm}>Confirm</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```

---

## Differences from shadcn/ui

- **No preset system** — CSS variables must be edited directly; there is no `--preset` flag or preset switching workflow.
- **No `--diff` for update preview** — use `git diff` after running `add --overwrite`, or read source files before adding.
- **SvelteKit dark mode** — use a store or cookie-based class toggle instead of `next-themes`.
- **`class` prop, not `className`** — all Svelte components use the standard `class` prop.
- **`tailwindCssFile` is typically `app.css`** — not `globals.css` as in Next.js projects.
- **Svelte 5 snippet syntax** — use `{#snippet}` / `{@render children?.()}` instead of JSX `children` prop.
