---
title: registry.json
description: Schema for running your own component registry.
---

<script>
	import Callout from "$lib/components/callout.svelte";
</script>

The `registry.json` schema is used to define your custom component registry.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "shadcn-svelte",
  "homepage": "https://shadcn-svelte.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "src/lib/registry/blocks/hello-world/hello-world.svelte",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

## Definitions

You can see the JSON Schema for `registry.json` [here](/schema/registry.json).

### $schema

The `$schema` property is used to specify the schema for the `registry.json` file.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json"
}
```

### name

The `name` property is used to specify the name of your registry. This is used for data attributes and other metadata.

```json title="registry.json" showLineNumbers
{
  "name": "acme"
}
```

### homepage

The homepage of your registry. This is used for data attributes and other metadata.

```json title="registry.json" showLineNumbers
{
  "homepage": "https://acme.com"
}
```

### items

The `items` in your registry. Each item must implement the [registry-item schema specification](/schema/registry-item.json).

```json title="registry.json" showLineNumbers
{
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "src/lib/registry/blocks/hello-world/hello-world.svelte",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

See the [registry-item schema documentation](/docs/registry/registry-item-json) for more information.

### aliases

`aliases` define how your registry's internal import paths will be transformed when users install your components. These should match how you import components within your registry code.

For example, if your registry's component has:

```svelte
<script lang="ts">
  import { Button } from "@/lib/registry/ui/button/index.js";
  import { cn } from "@/lib/utils.js";
</script>
```

Then your `registry.json` should have matching aliases:

```json title="registry.json" showLineNumbers
{
  "aliases": {
    "lib": "@/lib", // Matches your internal imports
    "ui": "@/lib/registry/ui", // Matches your internal imports
    "components": "@/lib/registry/components", // Matches your internal imports
    "utils": "@/lib/utils", // Matches your internal imports
    "hooks": "@/lib/hooks" // Matches your internal imports
  }
}
```

When users install your component, these paths will be transformed according to their `components.json` configuration. The aliases you define here are the "source" paths that will be replaced.

Default aliases (if you don't specify any):

```json title="registry.json" showLineNumbers
{
  "aliases": {
    "lib": "$lib/registry/lib", // For internal library code
    "ui": "$lib/registry/ui", // For UI components
    "components": "$lib/registry/components", // For component-specific code
    "utils": "$lib/utils", // For utility functions
    "hooks": "$lib/registry/hooks" // For reactive state and logic (.svelte.js|ts)
  }
}
```

### overrideDependencies

`overrideDependencies` lets you force specific version ranges for dependencies, overriding what `shadcn-svelte registry build` detects in your `package.json`.

Common use cases:

- Using latest pre-release versions: `"overrideDependencies": ["paneforge@next"]`
- Pinning to specific versions: `"overrideDependencies": ["dep@1.5.0"]`

<Callout class="bg-blue-50 mt-6 border-blue-600 dark:border-blue-900 dark:bg-blue-950 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900 text-foreground">

**Warning**: Overriding dependencies can lead to version conflicts if not carefully managed. This option should be used sparingly.

</Callout>

Example transformation:

```json
// Your registry's package.json
{
  "dependencies": {
    "paneforge": "1.0.0-next.1"
  }
}
```

When the user installs your component, the latest `@next` version will be used instead of `1.0.0-next.1`

```json
{
  "dependencies": {
    "paneforge": "1.0.0-next.1", // overrideDependencies: []
    "paneforge": "1.0.0-next.5" // overrideDependencies: ["paneforge@next"]
  }
}
```
