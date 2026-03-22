# Migration & Compatibility

Use this reference when the user is working with older shadcn-svelte, Svelte 4, Tailwind v3, or stale community examples.

## Svelte 5

shadcn-svelte has a documented migration path for Svelte 4 → Svelte 5. Key changes include:

- `components.json` configuration updates
- Import alias changes
- Generated `utils` helper updates
- Dependency version bumps
- Bits UI-backed component reimplementations using runes (`$props()`, `$bindable()`, `$state()`)
- Slot-based composition replaced with `{#snippet}` / `{@render}` patterns

If the user's code predates Svelte 5, consult the local migration docs before assuming modern API shapes.

## Tailwind v4

shadcn-svelte has a documented Tailwind v4 migration path that includes:

- `@theme inline` for CSS-first token registration
- Replacement of older animation packages
- Updated generated styles and tokens
- Migration from `tailwind.config.js` to CSS-first configuration

When the user's project is still on Tailwind v3, do not assume the newest component source or CSS layout matches the current docs.

## Bits UI

Modern shadcn-svelte components are built on Bits UI primitives. That means:

- Old examples from earlier releases may be stale
- Prop names and composition can change across major Bits UI versions
- The local docs page plus the installed source should always beat copied examples from elsewhere

## Safe Process

1. Check the user's installed versions in `package.json`
2. Check `components.json` for alias and registry state
3. Read the relevant migration doc before proposing changes
4. Inspect the installed component source if the project looks older than the current docs
