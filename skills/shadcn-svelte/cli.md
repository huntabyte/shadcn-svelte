# shadcn-svelte CLI Reference

The shadcn-svelte CLI manages component installation and configuration through `components.json`.

> Always use the project's package runner: `npx shadcn-svelte@latest`, `pnpm dlx shadcn-svelte@latest`, or `bunx --bun shadcn-svelte@latest`.

## Key Commands

### Init

Sets up shadcn-svelte in an existing project. Prompts for base color, global CSS file, and import aliases.

```bash
shadcn-svelte init [options]
```

**What it does:**

- Prompts for base color, global CSS file path, and aliases (`lib`, `components`, `ui`, `utils`, `hooks`)
- Writes or updates `components.json`
- Configures CSS variables and supporting files
- Installs dependencies unless `--no-deps` is used

**Options:**

| Flag                        | Description                  |
| --------------------------- | ---------------------------- |
| `-c, --cwd <path>`          | Working directory            |
| `-o, --overwrite`           | Overwrite existing files     |
| `--no-deps`                 | Skip dependency installation |
| `--skip-preflight`          | Skip preflight checks        |
| `--base-color <name>`       | Base color preset            |
| `--css <path>`              | Global CSS file path         |
| `--components-alias <path>` | Components import alias      |
| `--lib-alias <path>`        | Lib import alias             |
| `--utils-alias <path>`      | Utils import alias           |
| `--hooks-alias <path>`      | Hooks import alias           |
| `--ui-alias <path>`         | UI import alias              |
| `--proxy <proxy>`           | HTTP proxy                   |

### Add

Installs components from the configured registry.

```bash
shadcn-svelte add [components...] [options]
```

**What it does:**

- Adds one or more components by name
- Can install all available components with `--all`
- Can fetch a component from a URL
- Installs dependencies unless `--no-deps` is used

**Options:**

| Flag               | Description                  |
| ------------------ | ---------------------------- |
| `-c, --cwd <path>` | Working directory            |
| `--no-deps`        | Skip dependency installation |
| `--skip-preflight` | Skip preflight checks        |
| `-a, --all`        | Install all components       |
| `-y, --yes`        | Skip confirmation prompts    |
| `-o, --overwrite`  | Overwrite existing files     |
| `--proxy <proxy>`  | HTTP proxy                   |

### Registry Build

Generates distributable registry JSON files from a `registry.json` file.

```bash
shadcn-svelte registry build [registry] [options]
```

**Options:**

| Flag                  | Description       |
| --------------------- | ----------------- |
| `-c, --cwd <path>`    | Working directory |
| `-o, --output <path>` | Output directory  |

Use this only when building a custom component registry, not for routine app usage.

## Important: Non-Equivalent Upstream Features

The following upstream `shadcn` features do **not** have a verified equivalent in `shadcn-svelte`:

- `info` — inspect local files directly (`components.json`, `package.json`, `svelte.config.*`)
- `docs` — read `docs/content/components/<name>.md` directly
- `search` — check installed component folders under the configured `ui` alias
- `view` — read component source files directly
- Presets and preset switching
- `add --dry-run`, `add --diff`, `add --view`

Do not suggest these commands. Use local file inspection as the alternative.
