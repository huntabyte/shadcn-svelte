# Styling & Customization

See [../customization.md](../customization.md) for CSS variable setup and theme extension.

## Prefer semantic tokens

Use semantic utilities backed by CSS variables:

- `bg-background`
- `text-foreground`
- `bg-primary`
- `text-primary-foreground`
- `text-muted-foreground`
- `border-border`

Avoid hardcoding raw Tailwind palette colors when an existing token fits the use case.

## Use built-in variants first

Before overriding classes, check whether the local component already exposes the desired variant or size. This is especially important for components like `Button`.

## Use the local class prop shape

In `shadcn-svelte`, components may expose `class`, `className`, or both through their wrappers. Follow the local docs or installed source for the specific component instead of assuming React-style `className`.

## Prefer `gap-*` over manual spacing hacks

Use layout primitives and `gap-*` utilities instead of ad hoc margin chains when composing component groups.

## Prefer concise utilities

Use `size-*` when width and height are equal, and use `truncate` when the standard one-line truncation behavior is desired.

## Let overlay components own stacking

Avoid adding manual z-index overrides to overlay components such as:

- `Dialog`
- `Sheet`
- `Drawer`
- `Popover`
- `Tooltip`
- `HoverCard`

Inspect the local component source first if stacking looks wrong.

## Use `cn()` when editing generated component source

The generated component source commonly relies on the local `cn()` utility. When changing conditional classes inside installed components, follow that existing pattern instead of rewriting class concatenation manually.
