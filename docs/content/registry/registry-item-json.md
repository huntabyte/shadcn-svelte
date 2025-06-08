---
title: registry-item.json
description: Specification for registry items.
---

The `registry-item.json` schema is used to define your custom registry items.

```json title="registry-item.json" showLineNumbers
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A simple hello world component.",
  "files": [
    {
      "path": "registry/hello-world/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/use-hello-world.svelte.ts",
      "type": "registry:hook"
    }
  ],
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

<div class="flex gap-2 items-center mt-6">

[See more examples](/docs/registry/examples)

</div>

## Definitions

You can see the JSON Schema for `registry-item.json` [here](/schema/registry-item.json).

### $schema

The `$schema` property is used to specify the schema for the `registry-item.json` file.

```json title="registry-item.json" showLineNumbers
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json"
}
```

### name

The name of the item. This is used to identify the item in the registry. It should be unique for your registry.

```json title="registry-item.json" showLineNumbers
{
  "name": "hello-world"
}
```

### title

A human-readable title for your registry item. Keep it short and descriptive.

```json title="registry-item.json" showLineNumbers
{
  "title": "Hello World"
}
```

### description

A description of your registry item. This can be longer and more detailed than the `title`.

```json title="registry-item.json" showLineNumbers
{
  "description": "A simple hello world component."
}
```

### type

The `type` property is used to specify the type of your registry item. This is used to determine the type and target path of the item when resolved for a project.

```json title="registry-item.json" showLineNumbers
{
  "type": "registry:block"
}
```

The following types are supported:

| Type                 | Description                                      |
| -------------------- | ------------------------------------------------ |
| `registry:block`     | Use for complex components with multiple files.  |
| `registry:component` | Use for simple components.                       |
| `registry:lib`       | Use for lib and utils.                           |
| `registry:hook`      | Use for hooks.                                   |
| `registry:ui`        | Use for UI components and single-file primitives |
| `registry:page`      | Use for page or file-based routes.               |
| `registry:file`      | Use for miscellaneous files.                     |
| `registry:style`     | Use for registry styles. eg. `new-york`          |
| `registry:theme`     | Use for themes.                                  |

### author

The `author` property is used to specify the author of the registry item.

It can be unique to the registry item or the same as the author of the registry.

```json title="registry-item.json" showLineNumbers
{
  "author": "John Doe <john@doe.com>"
}
```

### dependencies

The `dependencies` property is used to specify the dependencies of your registry item. This is for `npm` packages.

Use `@version` to specify the version of your registry item.

```json title="registry-item.json" showLineNumbers
{
  "dependencies": ["bits-ui", "zod", "@lucide/svelte", "name@1.0.2"]
}
```

### registryDependencies

Defines other registry items that this item depends on.

Each entry may be one of the following:

#### shadcn-svelte Registry Item

The name of a shadcn-svelte registry item (e.g., `'button'`, `'input'`, `'select'`), which will resolve to that item in the shadcn-svelte registry.

```json title="registry-item.json" showLineNumbers
{
  "registryDependencies": ["button", "input", "select"]
}
```

#### Remote URL

A full URL to a custom registry item (e.g. `https://example.com/r/hello-world.json`)

```json title="registry-item.json" showLineNumbers
{
  "registryDependencies": ["https://example.com/r/hello-world.json"]
}
```

#### Local alias (when building with the CLI)

If you're defining the item in `registry.json` and using the CLI to build the registry, you can use a name prefixed with `local:` (e.g. `local:stepper`) to reference an item in the current registry. The CLI will convert this to a relative path (e.g. `./stepper.json`) in the output `registry-item.json` file.

```json title="registry.json" showLineNumbers
{
  "items": [
    {
      "name": "hello-world",
      "registryDependencies": ["local:stepper"]
    }
  ]
}
```

Which the CLI will convert to the following in the output `registry-item.json` file:

```json title="registry-item.json" showLineNumbers
{
  "registryDependencies": ["./stepper.json"]
}
```

#### Relative Path

If you're not using the CLI and defining the item directly in its `registry-item.json` file, you can specify a relative path, which is relative to the current item, to reference another item in the registry (e.g. `./stepper.json`).

```json title="registry-item.json" showLineNumbers
{
  "registryDependencies": ["./stepper.json"]
}
```

### files

The `files` property is used to specify the files of your registry item. Each file has a `path`, `type` and `target` (optional) property.

**The `target` property is required for `registry:page` and `registry:file` types.**

```json title="registry-item.json" showLineNumbers
{
  "files": [
    {
      "path": "registry/hello-world/page.svelte",
      "type": "registry:page",
      "target": "src/routes/hello/+page.svelte"
    },
    {
      "path": "registry/hello-world/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/use-hello-world.svelte.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/hello-world/.env",
      "type": "registry:file",
      "target": ".env"
    }
  ]
}
```

#### path

The `path` property is used to specify the path to the file in your registry. This path is used by the build script to parse, transform and build the registry JSON payload.

#### type

The `type` property is used to specify the type of the file. See the [type](#type) section for more information.

#### target

The `target` property is used to indicate where the file should be placed in a project. This is optional and only required for `registry:page` and `registry:file` types.

By default, the `shadcn-svelte` cli will read a project's `components.json` file to determine the target path. For some files, such as routes or config you can specify the target path manually.

Use `~` to refer to the root of the project e.g `~/foo.config.js`.

### cssVars

Use to define CSS variables for your registry item.

```json title="registry-item.json" showLineNumbers
{
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%",
      "radius": "0.5rem"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

### css

Use `css` to add new rules to the project's CSS file eg. `@layer base`, `@layer components`, `@utility`, `@keyframes`, etc.

```json title="registry-item.json" showLineNumbers
{
  "css": {
    "@layer base": {
      "body": {
        "font-size": "var(--text-base)",
        "line-height": "1.5"
      }
    },
    "@layer components": {
      "button": {
        "background-color": "var(--color-primary)",
        "color": "var(--color-white)"
      }
    },
    "@utility text-magic": {
      "font-size": "var(--text-base)",
      "line-height": "1.5"
    },
    "@keyframes wiggle": {
      "0%, 100%": {
        "transform": "rotate(-3deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      }
    }
  }
}
```

### docs

Use `docs` to show custom documentation or message when installing your registry item via the CLI.

```json title="registry-item.json" showLineNumbers
{
  "docs": "Remember to add the FOO_BAR environment variable to your .env file."
}
```

### categories

Use `categories` to organize your registry item.

```json title="registry-item.json" showLineNumbers
{
  "categories": ["sidebar", "dashboard"]
}
```

### meta

Use `meta` to add additional metadata to your registry item. You can add any key/value pair that you want to be available to the registry item.

```json title="registry-item.json" showLineNumbers
{
  "meta": { "foo": "bar" }
}
```
