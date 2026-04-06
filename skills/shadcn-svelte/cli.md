# shadcn-svelte CLI Reference

Configuration is read from `components.json`.

> **IMPORTANT:** Always run commands using the project's package runner: `npx shadcn-svelte@latest`, `pnpm dlx shadcn-svelte@latest`, or `bunx --bun shadcn-svelte@latest`. Check `packageManager` from `components.json` or the project's lockfile to choose the right one. Examples below use `npx shadcn-svelte@latest` but substitute the correct runner for the project.

> **IMPORTANT:** Only use the flags documented below. Do not invent or guess flags — if a flag isn't listed here, it doesn't exist.

## Contents

- Commands: init, add, registry build
- Non-existent upstream features

---

## Commands

### `init` — Initialize a project

```bash
npx shadcn-svelte@latest init [options]
```

Initializes shadcn-svelte in an existing project. Prompts for base color, global CSS file path, and import aliases. Writes or updates `components.json`, configures CSS variables, and installs dependencies.

| Flag                        | Short | Description                  | Default |
| --------------------------- | ----- | ---------------------------- | ------- |
| `--cwd <path>`              | `-c`  | Working directory            | current |
| `--overwrite`               | `-o`  | Overwrite existing files     | `false` |
| `--no-deps`                 |       | Skip dependency installation | —       |
| `--skip-preflight`          |       | Skip preflight checks        | —       |
| `--base-color <name>`       |       | Base color preset            | —       |
| `--css <path>`              |       | Global CSS file path         | —       |
| `--components-alias <path>` |       | Components import alias      | —       |
| `--lib-alias <path>`        |       | Lib import alias             | —       |
| `--utils-alias <path>`      |       | Utils import alias           | —       |
| `--hooks-alias <path>`      |       | Hooks import alias           | —       |
| `--ui-alias <path>`         |       | UI import alias              | —       |
| `--proxy <proxy>`           |       | HTTP proxy                   | —       |

### `add` — Add components

```bash
npx shadcn-svelte@latest add [components...] [options]
```

Installs one or more components by name. Can also install from a URL.

| Flag               | Short | Description                  | Default |
| ------------------ | ----- | ---------------------------- | ------- |
| `--cwd <path>`     | `-c`  | Working directory            | current |
| `--no-deps`        |       | Skip dependency installation | —       |
| `--skip-preflight` |       | Skip preflight checks        | —       |
| `--all`            | `-a`  | Install all components       | `false` |
| `--yes`            | `-y`  | Skip confirmation prompts    | `false` |
| `--overwrite`      | `-o`  | Overwrite existing files     | `false` |
| `--proxy <proxy>`  |       | HTTP proxy                   | —       |

### `registry build` — Build a custom registry

```bash
npx shadcn-svelte@latest registry build [registry] [options]
```

Generates distributable registry JSON files from a `registry.json` file.

| Flag                  | Short | Description       | Default      |
| --------------------- | ----- | ----------------- | ------------ |
| `--cwd <path>`        | `-c`  | Working directory | current      |
| `--output <path>`     | `-o`  | Output directory  | `./public/r` |

---

## Non-Existent Upstream Features

The following upstream `shadcn` CLI features do **not** exist in `shadcn-svelte`. Do not suggest them.

| Upstream feature             | shadcn-svelte alternative                                          |
| ---------------------------- | ------------------------------------------------------------------ |
| `shadcn info --json`         | Read `components.json` and `package.json` directly                 |
| `shadcn docs <component>`    | Read `docs/content/components/<name>.md` directly                  |
| `shadcn search`              | List the `resolvedPaths.ui` directory                              |
| `shadcn view`                | Read the component source files directly                           |
| `add --dry-run`              | Read source files before deciding to install                       |
| `add --diff`                 | Use `git diff` after adding                                        |
| `add --view`                 | Read source files directly                                         |
| Presets (`--preset`)         | Not supported                                                      |
| Templates (`--template`)     | Not supported                                                      |
| `shadcn mcp`                 | No MCP server — use local file inspection                          |

---

## Differences from shadcn/ui

- **Package is `shadcn-svelte`**, not `shadcn` — commands use `shadcn-svelte@latest`.
- **No `info`, `docs`, `search`, `view`, `diff` commands** — use local file inspection instead.
- **No preset system** — `--preset`, `--reinstall`, and preset switching do not exist.
- **No `--dry-run` / `--diff` / `--view` flags** on `add`.
- **No templates** (`next`, `vite`, etc.) — projects are created with SvelteKit, Vite, or Astro tooling directly.
- **No MCP server** — `shadcn mcp` and related tools do not exist.
