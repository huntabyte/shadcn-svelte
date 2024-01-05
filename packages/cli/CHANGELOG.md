# shadcn-svelte

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
