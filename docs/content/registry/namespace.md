---
title: Namespaced Registries
description: Install components from multiple registries using @namespace/name.
---

<script>
	import PMExecute from "$lib/components/pm-execute.svelte";
</script>

Namespaces let you give a registry a name in `components.json` and use that name
when installing its items.

## Configure a registry

Add the `registries` property to your project's `components.json`:

```json title="components.json"
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

The namespace must start with `@`. Use letters, numbers, hyphens, or underscores,
with a letter or number at each end. The URL must contain `{name}`, which the CLI
replaces with the item name.

## Install an item

<PMExecute command="shadcn-svelte@latest add @acme/button" />

This fetches `https://acme.com/r/button.json` and installs its files using your
project's aliases and TypeScript settings. Each response must follow the
[registry item schema](/docs/registry/registry-item-json). A namespaced registry
does not need to serve an `index.json` file.

You can mix items from different registries in one command:

<PMExecute command="shadcn-svelte@latest add button @acme/data-table" />

Bare names such as `button` continue to use the existing `registry` setting.
Running `add` without arguments, or with `--all`, lists items from that registry.

To update an installed namespaced item, run `add` again with `--overwrite`:

<PMExecute command="shadcn-svelte@latest add @acme/button --overwrite" />

## Style-specific URLs

Use `{style}` in the URL to select the style configured in `components.json`:

```json title="components.json"
{
  "registries": {
    "@acme": "https://acme.com/r/{style}/{name}.json"
  }
}
```

For a project using `nova`, `@acme/button` resolves to
`https://acme.com/r/nova/button.json`.

## Registry dependencies

Use namespaced references in `registryDependencies` to depend on items from the
same registry or another one:

```json title="registry-item.json"
{
  "registryDependencies": ["button", "@acme/chart", "@other/calendar"]
}
```

The installing project must configure every referenced namespace. Each
namespaced dependency uses its own registry's URL, headers, and parameters.
Bare names resolve through the project's `registry` setting, even when the
parent item comes from a namespaced registry.

For private registries, see [Authentication](/docs/registry/authentication).
