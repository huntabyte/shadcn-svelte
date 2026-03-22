# shadcn-svelte CLI Reference

Configuration is read from `components.json`.

> Use the project's package runner for commands: `npx shadcn-svelte@latest`, `pnpm dlx shadcn-svelte@latest`, or `bunx --bun shadcn-svelte@latest`.

> Only use commands and flags verified below. Do not borrow upstream `shadcn` commands such as `info`, `docs`, `search`, `view`, or diff-preview flags.

## Commands

### `init`

Initializes `shadcn-svelte` in an existing project.

```bash
shadcn-svelte init [options]
```

What it does:

- prompts for base color
- prompts for the global CSS file
- prompts for aliases for `lib`, `components`, `ui`, `utils`, and `hooks`
- writes or updates `components.json`
- configures CSS variables and supporting files
- installs dependencies unless `--no-deps` is used

Verified flags:

- `-c, --cwd <path>`
- `-o, --overwrite`
- `--no-deps`
- `--skip-preflight`
- `--base-color <name>`
- `--css <path>`
- `--components-alias <path>`
- `--lib-alias <path>`
- `--utils-alias <path>`
- `--hooks-alias <path>`
- `--ui-alias <path>`
- `--proxy <proxy>`

### `add`

Adds components to the current project from the configured registry.

```bash
shadcn-svelte add [components...] [options]
```

What it does:

- adds one or more components by name
- can install all available components with `--all`
- can fetch a component from a URL
- installs dependencies unless `--no-deps` is used

Verified flags:

- `-c, --cwd <path>`
- `--no-deps`
- `--skip-preflight`
- `-a, --all`
- `-y, --yes`
- `-o, --overwrite`
- `--proxy <proxy>`

Do not claim support for upstream preview workflows such as `--dry-run`, `--diff`, or `--view`.

### `registry build`

Builds a distributable registry from a `registry.json` file.

```bash
shadcn-svelte registry build [registry] [options]
```

Verified flags:

- `-c, --cwd <path>`
- `-o, --output <path>`

Use this only when the user is working on a registry, not for routine app consumption.

## Non-Equivalent Upstream Features

The following upstream `shadcn` guidance does not have a verified public local equivalent:

- `info`
- `docs`
- `search`
- `view`
- presets and preset switching
- `add --dry-run`
- `add --diff`
- `add --view`

If the user needs project context, inspect local files directly:

- `components.json`
- `package.json`
- `svelte.config.*`
- installed component folders under the configured `ui` alias
