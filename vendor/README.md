Draft-only Bits UI snapshot, pending the release of the already-merged
[huntabyte/bits-ui#2288](https://github.com/huntabyte/bits-ui/pull/2288).

- Source: https://github.com/huntabyte/bits-ui
- Immutable revision: `8aff5151e251ffda2f88e29f26c8291420202b2b`
- Source package version: 2.21.0 (this archive includes unreleased changes).
- Build: Node 26.13.0, pnpm 10.33.0, frozen upstream lockfile,
  `pnpm build:packages`, then `pnpm -F bits-ui pack`.
- Archive SHA-256: `776aa4f933db08a0114874ab9c65b0004335e41de434a67020d552f9828970f6`.
- Rebuild with `node scripts/build-bits-ui-snapshot.mjs` from the repository root.
  Compare archive contents if a different Node/platform changes the tar metadata.

The workspace override uses this committed, built archive for local and CI installs.
No GitHub monorepo root, mutable branch, external preview service, or developer path
is used as a package dependency. The archive includes generated `dist` and its MIT
license. The pnpm lockfile records its integrity.

Registry output retains normal npm version ranges; the workspace override must not
leak into generated install commands. The new direction component is draft-only
until the compatible release is available.

Before marking the PR ready, bump the docs/registry Bits UI dependency to the first
release containing #2288, remove the workspace override, this directory and the
snapshot build script, regenerate the lockfile/registry, verify a clean consumer install with public dependencies, and rerun checks and
browser tests.
