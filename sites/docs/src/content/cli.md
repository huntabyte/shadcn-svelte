---
title: CLI
description: Use the CLI to add components to your project.
---

<script>
	import { PMExecute } from '$lib/components/docs'
</script>

## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and creates CSS variables for the project.

<PMExecute command="shadcn-svelte@latest init" />

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which style would you like to use? › Default
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/app.css
Where is your Tailwind config located? (this file will be overwritten) › tailwind.config.[cjs|js|ts]
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
```

### Options

```txt
Usage: shadcn-svelte init [options]

initialize your project and install dependencies

Options:
  -c, --cwd <cwd>            the working directory (default: the current directory)
  --no-deps                  disable adding & installing dependencies
  --style <name>             the style for the components (choices: "default", "new-york")
  --base-color <name>        the base color for the components (choices: "slate", "gray", "zinc", "neutral", "stone")
  --css <path>               path to the global CSS file
  --tailwind-config <path>   path to the tailwind config file
  --components-alias <path>  import alias for components
  --utils-alias <path>       import alias for utils
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
  components         name of components

Options:
  -c, --cwd <cwd>    the working directory (default: the current directory)
  --no-deps          skips adding & installing package dependencies
  -a, --all          install all components to your project (default: false)
  -y, --yes          skip confirmation prompt (default: false)
  -o, --overwrite    overwrite existing files (default: false)
  --proxy <proxy>    fetch components from registry using a proxy
  -p, --path <path>  the path to add the component to
  -h, --help         display help for command
```

## update

Use the `update` command to update components in your project. This will overwrite any modifications you've made to the components, so be sure to commit your changes before running this command.

<PMExecute command="shadcn-svelte@latest update [component]" />

### Options

```txt
Usage: shadcn-svelte update [options] [components...]

update components in your project

Arguments:
  components       name of components

Options:
  -c, --cwd <cwd>  the working directory (default: the current directory)
  -a, --all        update all existing components (default: false)
  -y, --yes        skip confirmation prompt (default: false)
  --proxy <proxy>  fetch components from registry using a proxy
  -h, --help       display help for command
```

## Outgoing Requests

### Proxy

This enables the use of a proxy when sending out requests to fetch from the `shadcn` registry. If the `HTTP_PROXY` or `http_proxy` environment variables have been set, the request library underneath will respect the proxy settings.

```bash
HTTP_PROXY="<proxy-url>" npx shadcn-svelte@latest init
```
