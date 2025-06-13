---
title: Registry
description: Run your own component registry.
---

<script>
	import Callout from "$lib/components/callout.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
</script>

<Callout>

**Note:** This feature is currently experimental. Help us improve it by
testing it out and sending feedback. If you have any questions, please [reach
out to us](https://github.com/huntabyte/shadcn-svelte/discussions).

</Callout>

You can use the `shadcn-svelte` CLI to create your own component registry. Creating your own registry allows you to distribute your own custom components, hooks, pages, and other files to any Svelte project.

Registry items are automatically compatible with the `shadcn-svelte` CLI.

## Requirements

You are free to design and host your custom registry as you see fit. The only requirement is that your registry items must be valid JSON files that conform to the [registry-item schema specification](/docs/registry/registry-item-json).

If you'd like to see an example of a registry, we have a [template project](https://github.com/huntabyte/shadcn-svelte/tree/main/registry-template) for you to use as a starting point.

You can clone it using `degit`

<PMExecute command="degit huntabyte/shadcn-svelte/registry-template#next-tailwind-4" />
