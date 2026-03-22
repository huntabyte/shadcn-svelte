# Customization & Theming

`shadcn-svelte` uses semantic CSS variable tokens and generated component source that lives in the user's project.

## How It Works

1. Theme values live in the global CSS file referenced by `components.json.tailwind.css`.
2. Those values are mapped into Tailwind tokens with `@theme inline`.
3. Components consume semantic classes such as `bg-primary`, `text-muted-foreground`, and `border-border`.

## Theme Tokens

These conventions are verified locally:

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

## Dark Mode

Use class-based dark mode and the project's existing CSS setup. Do not import React-specific provider guidance from upstream `shadcn/ui`.

## Adding Custom Colors

Add custom CSS variables in the configured global stylesheet, then register them via `@theme inline` so Tailwind utility classes can reference them.

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

## Editing Components

Prefer these approaches in order:

1. Use the built-in variant or prop API already exposed by the local component.
2. Use semantic utility classes with the component's `class` or `className` prop when the docs or source already support it.
3. Edit the generated component source in the user's project.
4. Compose wrapper components around the generated UI primitives.

When customizing, inspect the installed component folder before advising. In `shadcn-svelte`, a component often spans multiple `.svelte` files plus an `index.ts` barrel.

## Important Local Differences

- Do not tell users to switch presets. No verified local preset workflow exists.
- Do not tell users to preview upstream changes with CLI diff flags. No verified public equivalent exists.
- Keep examples in Svelte syntax, not JSX.
