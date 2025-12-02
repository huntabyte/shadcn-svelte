---
title: Getting Started
description: Learn how to get setup and run your own component registry.
---

<script>
	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import PMRun from "$lib/components/pm-run.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import Callout from "$lib/components/callout.svelte";
</script>

This guide will walk you through the process of setting up your own component registry.

It assumes you already have a project with components and would like to turn it into a registry.

If you're starting a new registry project, you can use the [registry template](https://github.com/huntabyte/shadcn-svelte/tree/main/registry-template) as a starting point. It's already configured for you.

## registry.json

The `registry.json` file is only required if you're using the `shadcn-svelte` CLI to build your registry.

If you're using a different build system, you can skip this step as long as your build system produces valid JSON files that conform to the [registry-item schema specification](/docs/registry/registry-item-json).

<Steps>

### Add a registry.json file

Create a `registry.json` file in the root of your project.

```json title="registry.json" showLineNumbers
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

This `registry.json` file must conform to the [registry schema specification](/docs/registry/registry-json).

</Steps>

## Add a registry item

<Steps>

### Create your component

Add your first component. Here's an example of a simple `<HelloWorld />` component:

```svelte title="registry/hello-world/hello-world.svelte" showLineNumbers
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Hello World</Button>
```

<Callout class="mt-6">

**Note:** This example places the component in the `registry/`
directory. You can place it anywhere in your project as long as you set the
correct path in the `registry.json` file and you follow the `registry/[NAME]`
directory structure.

</Callout>

```txt
registry
└── hello-world
    └── hello-world.svelte
```

<Callout class="mt-6 [&_[data-rehype-pretty-code-title]]:pt-1 [&_pre]:mb-0">

**Important:** If you're placing your component in a custom directory, make sure it can be detected by Tailwind CSS.

```css showLineNumbers title="src/routes/layout.css"
@source "./registry/@acmecorp/ui-lib";
```

</Callout>

### Add your component to the registry

To add your component to the registry, you need to add your component definition to `registry.json`.

```json title="registry.json" showLineNumbers {6-17}
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "./src/lib/hello-world/hello-world.svelte",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

You define your registry item by adding a `name`, `type`, `title`, `description` and `files`.

For every file you add, you must specify the `path` and `type` of the file. The `path` is the relative path to the file from the root of your project. The `type` is the type of the file.

You can read more about the registry item schema and file types in the [registry item schema docs](/docs/registry/registry-item-json).

</Steps>

## Build your registry

<Steps>

### Install the shadcn-svelte CLI

<PMInstall command="shadcn-svelte@latest" />

### Add a build script

Add a `registry:build` script to your `package.json` file.

```json title="package.json" showLineNumbers
{
  "scripts": {
    "registry:build": "pnpm shadcn-svelte registry build"
  }
}
```

### Run the build script

Run the build script to generate the registry JSON files.

<PMRun command="registry:build" />

<Callout class="mt-6">

**Note:** By default, the build script will generate the registry JSON files in `static/r` e.g `static/r/hello-world.json`.

You can change the output directory by passing the `--output` option. See the [shadcn-svelte registry build command](/docs/cli#registry-build) for more information.

</Callout>

</Steps>

## Serve your registry

You can serve your registry by running the dev server.

<PMRun command="dev" />

Your files will now be served at `http://localhost:5173/r/[NAME].json` eg. `http://localhost:5173/r/hello-world.json`.

## Publish your registry

To make your registry available to other developers, you can publish it by deploying your project to a public URL.

## Adding Auth

The `shadcn-svelte` CLI does not offer a built-in way to add auth to your registry. We recommend handling authorization on your registry server.

A common simple approach is to use a `token` query parameter to authenticate requests to your registry. e.g. `http://localhost:5173/r/hello-world.json?token=[SECURE_TOKEN_HERE]`.

Use the secure token to authenticate requests and return a 401 Unauthorized response if the token is invalid. The `shadcn-svelte` CLI will handle the 401 response and display a message to the user.

<Callout class="mt-6">

**Note:** Make sure to encrypt and expire tokens.

</Callout>

## Guidelines

Here are some guidelines to follow when building components for a registry.

- The following properties are required for the block definition: `name`, `description`, `type` and `files`.
- Make sure to list all registry dependencies in `registryDependencies`. A registry dependency is the name of the component in the registry eg. `input`, `button`, `card`, etc or a URL to a registry item eg. `http://localhost:5173/r/editor.json`
- Ideally, place your files within a registry item in `components`, `hooks`, `lib` directories.

## Install using the CLI

To install a registry item using the `shadcn-svelte` CLI, use the `add` command followed by the URL of the registry item.

<PMExecute command="shadcn-svelte@latest add http://localhost:5173/r/hello-world.json" />
