# Dependencies

Short map for dependency updates. The repository wins if this disagrees with it.

## Surfaces

- `package.json` (root), `docs/package.json`, `packages/cli/package.json`, `sv-addons/registry/package.json`, `sv-addons/sv/package.json`
- `pnpm-workspace.yaml`: `catalog:` (kit, vite-plugin-svelte, svelte, svelte-check, tsdown, typescript, vite, zod) and `onlyBuiltDependencies`
- `pnpm-lock.yaml`. pnpm 10 only (`packageManager`, `only-allow`). No other package manager.

## Clusters

- Svelte: `svelte`, `svelte-check`, `@sveltejs/vite-plugin-svelte`, `vite` (catalog; docs pins its own newer kit/vite/plugin-svelte).
- Test: `vitest` in `packages/cli` and `sv-addons/registry`.
- sv add-ons: `sv` + `@sveltejs/sv-utils` move together.
- dnd-kit: `@dnd-kit-svelte/svelte` + `@dnd-kit/{abstract,collision,helpers}` (docs).
- Lint/format: `eslint`, `typescript-eslint`, `eslint-plugin-svelte`, `oxfmt`.

## Constraints (held back)

- `typescript` stays on 6.x: 7.x fails `svelte-check` (needs TS 6 alongside via `--tsgo`) and peer ranges of svelte-check/typescript-eslint stop at 6. Release: svelte-check supports TS 7.
- `@sveltejs/kit` stays on 2.x and `@sveltejs/adapter-cloudflare` on 7.x: kit 3 leaves unmet peers in `runed`/`layerchart`.
- `sveltekit-superforms` stays on 2.x: `formsnap` peer is `^2.19.0`.
- `@tanstack/table-core` stays on 8.x: v9 is an API rewrite that the data-table registry components are written against.
- dnd-kit cluster: `@dnd-kit-svelte/svelte` is pinned exactly to 0.1.5 with `@dnd-kit/*` 0.1.x. 0.1.6 pulls `@dnd-kit/dom` 0.2.x and breaks the dashboard data-table typecheck. Release: wrapper and core packages align on one version.

## Commands

- Update: `pnpm -r update --latest`, then revert held-back packages above (catalog entries update with it).
- Install: `pnpm install` (postinstall builds the CLI and add-ons, then `pnpm -r sync`).
- Verify: `pnpm check`, `pnpm test`, `pnpm lint`, `pnpm build`. `pnpm build` is long (docs site, tens of minutes).
- `pnpm lint` includes `oxfmt --check`; run `pnpm exec oxfmt <file>` after pnpm rewrites `pnpm-workspace.yaml`.
