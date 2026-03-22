# Styling & Customization

See [../customization.md](../customization.md) for CSS variable setup and theme extension.

## Semantic Colors

Use theme tokens instead of raw Tailwind colors:

- `bg-primary`, `text-primary-foreground` — not `bg-blue-500`
- `text-muted-foreground` — not `text-gray-500`
- `text-destructive` — not `text-red-500`
- `bg-background`, `text-foreground` — not `bg-white` / `text-black`

Use `Badge` variants or semantic tokens for status indicators rather than raw color values.

## Built-in Variants

Prefer component variants like `variant="outline"` over manual className styling. Check whether the local component already exposes the desired variant or size before overriding.

## className for Layout Only

Reserve the `class` prop for spacing and layout (margins, padding, widths). Use variants or semantic tokens for appearance changes.

> In shadcn-svelte, components may expose `class`, `className`, or both. Follow the local docs or installed source for each component.

## Spacing

Replace `space-x-*` and `space-y-*` with `gap-*` and flexbox.

## Concise Utilities

- Use `size-10` instead of `w-10 h-10` when dimensions match
- Use `truncate` instead of manual `overflow-hidden text-ellipsis whitespace-nowrap`

## Dark Mode

Let semantic tokens handle light/dark automatically via CSS variables. Avoid manual `dark:` color overrides.

## Conditional Classes

Use the `cn()` utility (from `$lib/utils`) for merging conditional class names instead of template literals with ternaries.

## Overlay Stacking

Dialog, Sheet, Drawer, Popover, Tooltip, and HoverCard manage their own z-index. Don't add manual values — inspect the local component source first if stacking looks wrong.
