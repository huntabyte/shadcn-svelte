---
title: components.json
description: Configuration for your project.
---

<script>
	import Callout from "$lib/components/callout.svelte";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
</script>

The `components.json` file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

<Callout class="mt-6">

Note: The `components.json` file is optional and **only required if you're using the CLI** to add components to your project. If you're using the copy and paste method, you don't need this file.

</Callout>

You can create a `components.json` file in your project by running the following command:

<PMExecute command="shadcn-svelte@latest init" />

See the [CLI section](/docs/cli) for more information.

## $schema

You can see the JSON Schema for `components.json` [here](https://shadcn-svelte.com/schema.json).

```json title="components.json"
{
  "$schema": "https://shadcn-svelte.com/schema.json"
}
```

## tailwind

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

See the [installation section](/docs/installation) for how to set up Tailwind CSS.

### tailwind.css

Path to the CSS file that imports Tailwind CSS into your project.

```json title="components.json"
{
  "tailwind": {
    "css": "src/app.{p,post}css"
  }
}
```

### tailwind.baseColor

This is used to generate the default color palette for your components. **This cannot be changed after initialization.**

```json title="components.json"
{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}
```

## aliases

The CLI uses these values and the `alias` config from your `svelte.config.js` file to place generated components in the correct location.

Path aliases have to be set up in your `svelte.config.js` file.

### aliases.lib

Import alias for your library, which is _typically_ where you store your components, utils, hooks, etc.

```json title="components.json"
{
  "aliases": {
    "lib": "$lib"
  }
}
```

### aliases.utils

Import alias for your utility functions.

```json title="components.json"
{
  "aliases": {
    "utils": "$lib/utils"
  }
}
```

### aliases.components

Import alias for your components.

```json title="components.json"
{
  "aliases": {
    "components": "$lib/components"
  }
}
```

### aliases.ui

Import alias for your UI components.

```json title="components.json"
{
  "aliases": {
    "ui": "$lib/components/ui"
  }
}
```

### aliases.hooks

Import alias for your hooks, which in Svelte 5 are reactive functions/classes whose files typically end in `.svelte.ts` or `.svelte.js`.

```json title="components.json"
{
  "aliases": {
    "hooks": "$lib/hooks"
  }
}
```

## Typescript

Typescript can be enabled or disabled.

```json title="components.json"
{
  "typescript": true | false
}
```

You can also specify a path to your own custom Typescript config file if it has a different name from `tsconfig.json` or `jsconfig.json`, or if it is located in a different directory:

```json title="components.json"
{
  "typescript": {
    "config": "path/to/tsconfig.custom.json"
  }
}
```

## iconLibrary

The icon library the CLI writes into the components it installs. It defaults to `phosphor`, the icon library of Another UI Svelte, and the CLI adds `phosphor-svelte` when it installs a component that uses an icon. A project that already uses `@lucide/svelte` and has no `iconLibrary` key keeps Lucide, and the CLI says so once. Set the key to choose.

```json title="components.json"
{
  "iconLibrary": "phosphor"
}
```

The weight follows one rule. Form and field icons (a user, an envelope, a lock in an input group) are duotone. Arrows, carets, plus, check, X, minus, dots and text format icons are bold, because a duotone fill makes a thin stroke read as a smudge. Installed components already carry the right weight. For an icon you add yourself, set it:

```svelte
<script lang="ts">
  import UserIcon from "phosphor-svelte/lib/User";
  import PlusIcon from "phosphor-svelte/lib/Plus";
</script>

<UserIcon weight="duotone" />
<PlusIcon weight="bold" />
```

The CLI exports the rule as `phosphorWeight(name)` from `shadcn-svelte/icons`, so a build script can use the same one. Any name containing `Circle` or `Square` (`CheckCircle`, `CaretCircleDown`, `ArrowSquareOut`) is a filled shape and stays duotone. `X`, `Check`, `Checks`, `CheckFat`, `Plus` and `Minus` match by exact name, so `XLogo` and `PlusMinus` stay duotone.

## Registry

The registry URL tells the CLI where to fetch the shadcn-svelte components/registry from. You can pin this to a specific preview release or your own fork of the registry.

```json title="components.json"
{
  "registry": "https://shadcn-svelte.com/registry"
}
```
