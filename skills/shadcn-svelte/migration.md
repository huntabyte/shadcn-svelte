# Migration & Compatibility

Use this reference when the user is working with older `shadcn-svelte`, Svelte 4, Tailwind v3, or stale community examples.

## Svelte 5

`shadcn-svelte` has a documented migration path for Svelte 4 to Svelte 5. It includes meaningful changes to:

- `components.json`
- aliases
- the generated `utils` helpers
- dependency versions
- Bits UI-backed component implementations

If the user's code predates Svelte 5, consult the local migration docs before assuming modern API shapes.

## Tailwind v4

`shadcn-svelte` has a documented Tailwind v4 migration path that includes:

- `@theme inline`
- CSS-first token registration
- replacement of older animation packages
- updated generated styles and tokens

When the user's project is still on Tailwind v3, do not assume the newest component source or CSS layout matches the current docs.

## Bits UI

Many modern `shadcn-svelte` components sit on top of Bits UI primitives. That means:

- old examples from earlier releases may be stale
- prop names and composition can change across major Bits UI migrations
- the local docs page plus the installed source should beat any copied example from elsewhere

## Safe Process

1. Check the user's installed versions in `package.json`.
2. Check `components.json` for alias and registry state.
3. Read the relevant migration doc before proposing changes.
4. Inspect the installed component source if the project looks older than the current docs.
