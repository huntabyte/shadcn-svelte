---
title: CLI
description: Use the CLI to add components to your project.
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

### Options

```txt
Usage: shadcn-svelte init [options]

initialize your project and install dependencies

Options:
  -c, --cwd <path>           the working directory (default: the current directory)
  -o, --overwrite            overwrite existing files (default: false)
  --no-deps                  disable adding & installing dependencies
  --base-color <name>        the base color for the components (choices: "slate", "gray", "zinc", "neutral", "stone")
  --css <path>               path to the global CSS file
  --components-alias <path>  import alias for components
  --lib-alias <path>         import alias for lib
  --utils-alias <path>       import alias for utils
  --hooks-alias <path>       import alias for hooks
  --ui-alias <path>          import alias for ui
  --proxy <proxy>            fetch items from registry using a proxy
  -h, --help                 display help for command
```

## add

Use the `add` command to add components and dependencies to your project.

<PMExecute command="shadcn-svelte@latest add [component]" />

You will be presented with a list of components to choose from:

```txt
Which components would you like to add? › Space to select. Return to submit.

◯  accordion
◯  alert
◯  alert-dialog
◯  aspect-ratio
◯  avatar
◯  badge
◯  button
◯  card
◯  checkbox
◯  collapsible
```

### Options

```txt
Usage: shadcn-svelte add [options] [components...]

add components to your project

Arguments:
  components         the components to add or a url to the component

Options:
  -c, --cwd <path>   the working directory (default: the current directory)
  --no-deps          skips adding & installing package dependencies
  -a, --all          install all components to your project (default: false)
  -y, --yes          skip confirmation prompt (default: false)
  -o, --overwrite    overwrite existing files (default: false)
  --proxy <proxy>    fetch components from registry using a proxy
  -h, --help         display help for command
```

## registry build

Use the `registry build` command to generate the registry JSON files.

<PMExecute command="shadcn-svelte@latest registry build [registry.json]" />

This command reads the `registry.json` file and generates the registry JSON files into the `static/r` directory.

### Options

```txt
Usage: shadcn-svelte registry build [options] [registry]

build components for a shadcn-svelte registry

Arguments:
  registry             path to registry.json file (default: ./registry.json)

Options:
  -c, --cwd <path>     the working directory (default: the current directory)
  -o, --output <path>  destination directory for json files (default: ./static/r)
  -h, --help           display help for command
```

## Outgoing Requests

### Proxy

This enables the use of a proxy when sending out requests to fetch from the `shadcn-svelte` registry. If the `HTTP_PROXY` or `http_proxy` environment variables have been set, the request library underneath will respect the proxy settings.

```bash
HTTP_PROXY="<proxy-url>" npx shadcn-svelte@latest init
```
