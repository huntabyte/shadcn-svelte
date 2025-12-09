# shadcn-svelte

## 1.1.0

### Minor Changes

- feat: add `--skip-preflight` flag to bypass initialization preflight checks ([#2437](https://github.com/huntabyte/shadcn-svelte/pull/2437))

- feat: add `--no-deps` flag to `update` command ([#2436](https://github.com/huntabyte/shadcn-svelte/pull/2436))

### Patch Changes

- fix: Fix an issue where dev dependencies were not shown in `--no-deps` prompt ([#2436](https://github.com/huntabyte/shadcn-svelte/pull/2436))

## 1.0.12

### Patch Changes

- fix: ensure `layout.css` is detected during initialization ([#2412](https://github.com/huntabyte/shadcn-svelte/pull/2412))

## 1.0.11

### Patch Changes

- fix: Ensure `filename` is provided when parsing ts code ([#2399](https://github.com/huntabyte/shadcn-svelte/pull/2399))

## 1.0.10

### Patch Changes

- fix: Log `error.stack` and `error.cause` to disambiguate errors ([#2374](https://github.com/huntabyte/shadcn-svelte/pull/2374))

## 1.0.9

### Patch Changes

- fix: improve error message when `svelte-kit` CLI cannot be found ([#2366](https://github.com/huntabyte/shadcn-svelte/pull/2366))

## 1.0.8

### Patch Changes

- fix: prompt users before overwriting existing components when adding from external registry ([#2302](https://github.com/huntabyte/shadcn-svelte/pull/2302))

## 1.0.7

### Patch Changes

- fix: Reorder `ALIASES` so that replacements run in a more sensical order ([#2262](https://github.com/huntabyte/shadcn-svelte/pull/2262))

## 1.0.6

### Patch Changes

- fix: add `npm:` specifier when installing packages with Deno ([#2196](https://github.com/huntabyte/shadcn-svelte/pull/2196))

## 1.0.5

### Patch Changes

- fix: bump `@svecosystem/strip-types` to strip `?` from optional params ([#2184](https://github.com/huntabyte/shadcn-svelte/pull/2184))

## 1.0.4

### Patch Changes

- fix: ensure `meta` property from registry.json passes through to generated json ([#2164](https://github.com/huntabyte/shadcn-svelte/pull/2164))

## 1.0.3

### Patch Changes

- chore: use `picocolors` for terminal color rendering ([#2107](https://github.com/huntabyte/shadcn-svelte/pull/2107))

- fix: Update `components.json` registry before running `init` ([#2129](https://github.com/huntabyte/shadcn-svelte/pull/2129))

## 1.0.2

### Patch Changes

- chore: update minimum supported Node version to v20 ([#2097](https://github.com/huntabyte/shadcn-svelte/pull/2097))

- fix: don't throw on missing directories ([#2088](https://github.com/huntabyte/shadcn-svelte/pull/2088))

## 1.0.1

### Patch Changes

- 6c4acfd: fix: `update` failing in Node 24+

## 1.0.0

### Major Changes

- b479077: Svelte 5

### Patch Changes

- 61d98fd: chore: Add warning for incompatible dependency
- 633a6de: fix: ensure path aliases resolve to the correct path
- 8826014: feat: Improved error message when fetching the registry fails
- d764bdf: fix(cli)(next): Add missing ui alias option
- 44b2445: feat: allow import maps to be used as path aliases
- 962d8be: fix: Improve error message when failing to fetch base colors.
- e29f8f5: fix: Ensure `utils.(js|ts)` is not fetched from the registry on `update` command
- 670a3e4: fix: respect `utils` path-alias
- ad4cd6b: breaking: svelte 5 + tailwindcss v4
- 9488a61: feat: add customizable `typescript.config` path option to `components.json`
- ea9f77c: fix: remove dangling comma in 'components to install' list
- 7669720: fix: workaround caching issue preventing the correct registry from being fetched
- f932494: fix: ensure `ui` and `hooks` paths are normalized
- dc196c3: chore: point to `tw3.shadcn-svelte.com` subdomain on `init`
- 11d0ff3: fix: Ensure `svelte-kit sync` executes locally
- 425edb7: fix: disable ES transformations when stripping types
- 9c94564: feat: add support for registry-item type `registry:style`
- 6c54fae: fix: always strip trailing slashes from path aliases
- e29f8f5: fix: `update` command now properly updates components
- 5bddbc6: fix: resolve deps from node_modules when evaluating their versions
- 34d0a9f: chore: display the output of a package manager's `install` process during dependency installation
- fb7c683: fix(next): add newline to end of `components.json`

## 1.0.0-next.19

### Patch Changes

- 9c94564: feat: add support for registry-item type `registry:style`

## 1.0.0-next.18

### Patch Changes

- 670a3e4: fix: respect `utils` path-alias

## 1.0.0-next.17

### Patch Changes

- 44b2445: feat: allow import maps to be used as path aliases
- 425edb7: fix: disable ES transformations when stripping types

## 1.0.0-next.16

### Patch Changes

- 9488a61: feat: add customizable `typescript.config` path option to `components.json`

## 1.0.0-next.15

### Patch Changes

- 6c54fae: fix: always strip trailing slashes from path aliases

## 1.0.0-next.14

### Patch Changes

- 633a6de: fix: ensure path aliases resolve to the correct path

## 1.0.0-next.13

### Patch Changes

- ea9f77c: fix: remove dangling comma in 'components to install' list

## 1.0.0-next.12

### Patch Changes

- 5bddbc6: fix: resolve deps from node_modules when evaluating their versions
- 34d0a9f: chore: display the output of a package manager's `install` process during dependency installation

## 1.0.0-next.11

### Patch Changes

- ad4cd6b: breaking: svelte 5 + tailwindcss v4

## 1.0.0-next.10

### Patch Changes

- dc196c3: chore: point to `tw3.shadcn-svelte.com` subdomain on `init`

## 1.0.0-next.9

### Patch Changes

- 962d8be: fix: Improve error message when failing to fetch base colors.

## 1.0.0-next.8

### Patch Changes

- d764bdf: fix(cli)(next): Add missing ui alias option

## 1.0.0-next.7

### Patch Changes

- 8826014: feat: Improved error message when fetching the registry fails

## 1.0.0-next.6

### Patch Changes

- 7669720: fix: workaround caching issue preventing the correct registry from being fetched

## 1.0.0-next.5

### Patch Changes

- 61d98fd: chore: Add warning for incompatible dependency

## 1.0.0-next.4

### Patch Changes

- f932494: fix: ensure `ui` and `hooks` paths are normalized

## 1.0.0-next.3

### Patch Changes

- 11d0ff3: fix: Ensure `svelte-kit sync` executes locally

## 1.0.0-next.2

### Patch Changes

- fb7c683: fix(next): add newline to end of `components.json`

## 1.0.0-next.1

### Patch Changes

- e29f8f5: fix: Ensure `utils.(js|ts)` is not fetched from the registry on `update` command
- e29f8f5: fix: `update` command now properly updates components

## 1.0.0-next.0

### Major Changes

- b479077: Svelte 5

## 0.14.3

### Patch Changes

- b36c8f8: chore: update default registry url

## 0.14.2

### Patch Changes

- 9f96ae1: chore: remove `exports` and `main` fields

## 0.14.1

### Patch Changes

- 283c5dc: chore: update `package-manager-detector`

## 0.14.0

### Minor Changes

- bc787f3: Install all dependencies as dev dependencies

## 0.13.0

### Minor Changes

- 06a19d8: feat: Added selection prompt for package managers if one cannot be detected

## 0.12.2

### Patch Changes

- e67c1fd: chore: use `package-manager-detector`

## 0.12.1

### Patch Changes

- d43d140: fix: Use correct cwd when syncing SvelteKit projects

## 0.12.0

### Minor Changes

- b6b4601: feat: Added `--no-deps` flag to `init` command

### Patch Changes

- b6b4601: breaking: Changed `--nodep` flag to `--no-deps` for `add` command

## 0.11.1

### Patch Changes

- c2d1ed6: fix: Fixes bug with incorrect flag assignments

## 0.11.0

### Minor Changes

- 6c9b9ee: feat: Added CLI flags for each option for `init`
- 6c9b9ee: feat: Removed TypeScript prompt in favor of auto detection

## 0.10.7

### Patch Changes

- f201baa: chore: Replaced `node-fetch` for `node-fetch-native`

## 0.10.6

### Patch Changes

- becb41d: chore: Added more http proxy options

## 0.10.5

### Patch Changes

- 2d80e21: chore: Added an overwrite notice for the global stylesheet and tailwind config

## 0.10.4

### Patch Changes

- ba14ef5: fix: Allow a registry dependency to optionally be overwritten

## 0.10.3

### Patch Changes

- 6a30f8a: fix: Changed unsupported runtime error into a warning and fixed a Bun specific issue

## 0.10.2

### Patch Changes

- 9c20e7a: fix: Added an error for unsupported runtimes

## 0.10.1

### Patch Changes

- 7f487a5: fix: Updating `utils` in JS mode now updates with the proper syntax

## 0.10.0

### Minor Changes

- 231f674: feat: Added TypeScript support for the tailwind config

### Patch Changes

- ebd04c4: chore: Added import path validators for the `init` command
- c5afe89: chore: Improved printed error messages
- c5afe89: chore: Certain config files can now be auto-detected and suggested during `init`

## 0.9.4

### Patch Changes

- 226f09e: chore: Removed `typescript` as a peer dependency
- 226f09e: chore: Provide a descriptive error when import aliases do not reference a valid `[tsconfig|jsconfig].json` path alias

## 0.9.3

### Patch Changes

- 222f462: chore: Replaced `tsconfig-paths` for a custom path alias resolver

## 0.9.2

### Patch Changes

- 7f39dbf: fix: Icons are now installed in the `add` command

## 0.9.1

### Patch Changes

- 8c43ad3: chore: Optimized dependencies and minified package
- 8c43ad3: chore: Replaced `zod` for `valibot`

## 0.9.0

### Minor Changes

- 66931b3: feat: Added support for the `--proxy` flag to the `update` command
- 66931b3: feat: Graphical overhaul, replacing `prompts` for `@clack/prompts`
- 66931b3: feat: Added a prompt to overwrite existing components to the `add` command

### Patch Changes

- 66931b3: perf: Optimized dependency installation

## 0.8.3

### Patch Changes

- 0b1836e: fix: Fixed component update warning and malformed filename for `utils`

## 0.8.2

### Patch Changes

- 1f6ea79: chore: Simplified use of internal aliases

## 0.8.1

### Patch Changes

- fd888487: chore: Added unused file warnings for the `update` command

## 0.8.0

### Minor Changes

- d7ae8b54: feat: Replaced `radix-icons-svelte` with [svelte-radix](https://github.com/shinokada/svelte-radix) for New York style

## 0.7.0

### Minor Changes

- bfdc861: feat: Add support for JS

## 0.6.1

### Patch Changes

- 59dca2c: fix: Support use of `jsconfig.json`

## 0.6.0

### Minor Changes

- 024cd2a: feat: Added support for non SvelteKit frameworks

## 0.5.0

### Minor Changes

- dcceae8: feat: Added a `utils` option for `update`

## 0.4.2

### Patch Changes

- 004f7f0: fix: Removed redundant overwrite warning in `add`

## 0.4.1

### Patch Changes

- 3068583: fix: `tailwind.config.ts` is no longer mistakenly deleted on `init`

## 0.4.0

### Minor Changes

- 3151474: feat: Added an `--all` flag to the `update` command

### Patch Changes

- d9cc40c: fix: If no lockfile is found, install dependencies with the current PM of the proccess

## 0.3.8

### Patch Changes

- 744f149: Bump zod from 3.21.4 to 3.22.3 in /packages/cli

## 0.3.7

### Patch Changes

- 9660a09: rename extension name from .postcss to .pcss

## 0.3.6

### Patch Changes

- 614681f: feat: Ability to use a proxy when adding components
- efb9694: Fix: destructive a11y contrast issues

## 0.3.5

### Patch Changes

- 9456656: Feat: update add command with -a flag to install all components in the registry

## 0.3.4

### Patch Changes

- 9c21525: safelist `"dark"` in tailwind config for out-of-the-box dark mode support

## 0.3.3

### Patch Changes

- e218143: Update file overwrite warning to include the css file

## 0.3.2

### Patch Changes

- 47b7008: - Strip unicode characters from CLI input

## 0.3.1

### Patch Changes

- b791a75: - Remove `tailwindcss-animate` from dependencies

## 0.3.0

### Minor Changes

- 8b72f01: - Add `flyAndScale` transitions util

## 0.2.0

### Minor Changes

- c4e2a41: Refactored to use the new registry system

## 0.1.2

### Patch Changes

- 9c10deb: fix: typo in svelte4 warnings

## 0.1.1

### Patch Changes

- 78962e9: add warnings for svelte v4 support

## 0.1.0

### Minor Changes

- 58a62ef: Added `update` command for updating existing components

### Patch Changes

- 58a62ef: Fixed select-all option during multiselect prompts

## 0.0.13

### Patch Changes

- fa77377: Replaced `tailwind.config.cjs` for an ESM template

## 0.0.12

### Patch Changes

- 5bc78d5: fix: properly order opts and args in `add` CLI command

## 0.0.11

### Patch Changes

- ae47aa6: add --nodep flag to disable adding and installing dependencies (advanced)

## 0.0.10

### Patch Changes

- 1b41d9c: Add parser to CLI prettier config

## 0.0.9

### Patch Changes

- 2c0f259: Fixed dynamic import path error for Windows

## 0.0.8

### Patch Changes

- d704098: Modify destructive background color to be meet AA contrast

## 0.0.7

### Patch Changes

- fa06a5d: Displays the correct version number
- edb3089: Preserve the content of `svelte.config.js` when running the `init` command

## 0.0.6

### Patch Changes

- 86c696f: Add shadcn config to svelte.config.js to remember the component location after initial add
- bc8cd90: Automatically add aliases to `svelte.config.js`

## 0.0.5

### Patch Changes

- a5ddff2: Update link to shadcn-svelte in prompt

## 0.0.4

### Patch Changes

- d4e0883: Add `type ClassValue` to import in `lib/utils.ts`

## 0.0.3

### Patch Changes

- 4c3ff02: Change dark destructive color to meet contrast accessibility guidelines

## 0.0.2

### Patch Changes

- Initial release
