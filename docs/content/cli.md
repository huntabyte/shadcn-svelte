---
title: shadcn-svelte
description: Use the shadcn-svelte CLI to add components to your project.
---

<script>
	import PMExecute from "$lib/components/pm-execute.svelte";
</script>

## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, and creates CSS variables for the project.

<PMExecute command="shadcn-svelte@latest init" />

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

**Options**

```bash
Usage: shadcn-svelte init [options]

initialize your project and install dependencies

Options:
  --preset <preset>          the preset to use
  -c, --cwd <path>           the working directory
  --no-deps-install          add dependencies to package.json without running install
  --skip-preflight           ignore preflight checks and continue (default: false)
  --reinstall                reinstall existing components when style changes
  --no-reinstall             skip reinstalling existing components when style changes
  --base-color <name>        the base color for the components (choices: "neutral", "stone", "zinc", "mauve", "olive", "mist", "taupe")
  --css <path>               path to the global CSS file
  --components-alias <path>  import alias for components
  --lib-alias <path>         import alias for lib
  --utils-alias <path>       import alias for utils
  --hooks-alias <path>       import alias for hooks
  --ui-alias <path>          import alias for ui
  --proxy <proxy>            fetch items from registry using a proxy
  -h, --help                 display help for command
```

---

## add

Use `add` to install components and their dependencies. Pass bare component names, configured namespaced addresses, GitHub item addresses, URLs, or paths to local item JSON files. You can mix sources in one command.

<PMExecute command="shadcn-svelte@latest add button @acme/card acme/toolkit/login#v1 ./item.json" />

Local paths are relative to the working directory (or `--cwd`). See [Namespaced Registries](/docs/registry/namespace) and [GitHub Registries](/docs/registry/github) for setup and authentication.

<PMExecute command="shadcn-svelte@latest add [component]" />

**Options**

```bash
Usage: shadcn-svelte add [options] [components...]

add components to your project

Arguments:
  components         component names, @namespace/item, GitHub item addresses, URLs, or local JSON files

Options:
  -c, --cwd <path>   the working directory (default: the current directory)
  --no-deps-install add dependencies to package.json without running install
  --skip-preflight  ignore preflight checks and continue (default: false)
  -a, --all         install all components to your project (default: false)
  -y, --yes         skip confirmation prompt (default: false)
  -o, --overwrite   overwrite existing files (default: false)
  --proxy <proxy>   fetch components from registry using a proxy
  -h, --help        display help for command
```

---

## apply

Use the `apply` command to apply a preset to an existing project.

<PMExecute command="shadcn-svelte@latest apply a2r6bw" />

You can apply only the theme or fonts from a preset without reinstalling UI components:

<PMExecute command="shadcn-svelte@latest apply a2r6bw --only theme" />

Supported values for `--only` are `theme` and `font`.

**Options**

```bash
Usage: shadcn-svelte apply [options]

apply a preset to an existing project

Arguments:
  preset             the preset to apply

Options:
  --preset <preset>  the preset to apply
  --only [parts]     apply only parts of a preset: theme, font
  -c, --cwd <path>   the working directory (default: the current directory)
  -y, --yes          overwrite existing files without confirmation (default: false)
  -s, --silent       mute output (default: false)
  --no-deps-install  add dependencies to package.json without running install
  --skip-preflight   ignore preflight checks and continue (default: false)
  --proxy <proxy>    fetch items from registry using a proxy
  -h, --help         display help for command
```

---

## registry add

Register a namespace by providing its URL template. The command updates `components.json` if it exists, or `package.json` otherwise. Use `--cwd` to target another project and `--force` to replace an existing mapping.

```bash
pnpm dlx shadcn-svelte@latest registry add '@acme=https://acme.example/r/{name}.json'
```

## registry build

Use the `registry build` command to generate the registry JSON files.

<PMExecute command="shadcn-svelte@latest registry build [registry.json]" />

This command reads the source `registry.json` and writes item JSON files, the legacy `index.json`, and a flattened `registry.json` catalog to `static/r`. See [include](/docs/registry/registry-json#include) for splitting the source registry across files.

**Options**

```bash
Usage: shadcn-svelte registry build [options] [registry]

build components for a shadcn-svelte registry

Arguments:
  registry             path to registry.json file (default: ./registry.json)

Options:
  -c, --cwd <path>     the working directory (default: the current directory)
  -o, --output <path>  destination directory for json files (default: ./static/r)
  -h, --help           display help for command
```

---

## registry validate

Check a GitHub source registry at `owner/repo` or `owner/repo#ref`. The CLI checks the source manifest, included manifests, and declared files. It prints diagnostics and exits with status 1 if validation fails. Private repositories use the same [GitHub credentials](/docs/registry/github#private-repositories) as installation.

<PMExecute command="shadcn-svelte@latest registry validate acme/toolkit#v1" />

## search

Search configured registries or pass an explicit namespace, GitHub repository, or URL to a registry catalog. The CLI returns JSON with results, pagination, and any per-registry errors.

```bash
pnpm dlx shadcn-svelte@latest search @acme owner/repo#v1 --query dashboard --type ui,block
```

Omit the registry arguments to search every namespace configured in `components.json` or `package.json`. The command can also take multiple explicit catalogs. A namespace resolves the catalog by setting `{name}` to `registry` in its URL template; pass the complete catalog URL when supplying a URL directly.

- `-q, --query <query>` matches names, titles, and descriptions without regard to case.
- `-t, --type <types>` accepts comma-separated values such as `ui,block` or `registry:ui,registry:block`.
- `-l, --limit <number>` (default 100) and `-o, --offset <number>` (default 0) paginate the combined, filtered results.
- `-c, --cwd <path>` selects the project configuration.

`list` is an alias for `search`. A failed source is reported under `errors`; the command exits with status 1 if every source fails.

## view

Print a JSON array of items without installing files or resolving dependencies. Use `--cwd` to select the project config and the base directory for local paths. Pass a component name, a namespaced item, a GitHub item address, a URL, or a local JSON file.

```bash
pnpm dlx shadcn-svelte@latest view @acme/dashboard owner/repo/button#v1 ./item.json
```

## Outgoing Requests

### Proxy

This enables the use of a proxy when sending out requests to fetch from the `shadcn-svelte` registry. If the `HTTP_PROXY` or `http_proxy` environment variables have been set, the request library underneath will respect the proxy settings.

```bash
HTTP_PROXY="<proxy-url>" npx shadcn-svelte@latest init
```
