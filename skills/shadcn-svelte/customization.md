# Customization & Theming

This guide covers how to customize shadcn-svelte components through CSS variables, Tailwind configuration, and component composition.

## How It Works

The system works in three layers:

1. **CSS variables** defined in `:root` (light) and `.dark` (dark mode) in the global CSS file referenced by `components.json`
2. **Tailwind utilities** map them via `@theme inline` to classes like `bg-primary` and `text-muted-foreground`
3. **Components** reference those semantic utility classes

Changing a variable automatically updates all dependent components.

## Color System

Colors follow a `name` / `name-foreground` naming convention. Base variables apply to backgrounds, while `-foreground` variants handle text and icons. All use OKLCH format: `oklch(lightness chroma hue)`.

**Verified tokens:**

- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--popover` / `--popover-foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive`
- `--border`
- `--input`
- `--ring`
- `--chart-1` through `--chart-5`
- `--sidebar-*`
- `--radius`

## Customization Hierarchy

Prefer these approaches in order:

1. **Built-in variants** — Use component props like `variant="outline"` or `size="sm"`
2. **Tailwind className** — Apply utility classes via the component's `class` prop for layout adjustments
3. **Add new variants** — Modify the generated component source to add custom variants
4. **Wrapper components** — Compose primitives into domain-specific components

## Dark Mode

Use class-based dark mode with a `.dark` class on the root element. For SvelteKit projects, use the project's existing theme toggle approach (typically a store or cookie-based class toggle). Do not import React-specific patterns like `next-themes`.

## Adding Custom Colors

Define new CSS variables in the global stylesheet, then register them with Tailwind v4 using `@theme inline`:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Never create a separate CSS file for custom colors — add them to the existing global stylesheet.

## Editing Components

When customizing, inspect the installed component folder before advising. In shadcn-svelte, a component often spans multiple `.svelte` files plus an `index.ts` barrel.

**Important local differences:**

- No preset switching workflow exists — do not suggest preset commands
- No CLI diff/preview flags exist — inspect source directly
- Keep all examples in Svelte syntax, not JSX
