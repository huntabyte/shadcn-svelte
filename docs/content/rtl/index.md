---
title: RTL
description: Add right-to-left support to your project.
---

<script>
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

shadcn-svelte supports right-to-left languages like Arabic, Hebrew, and Persian.

When `rtl` is enabled, the CLI transforms physical Tailwind classes to logical equivalents while adding or updating components. For example, `ml-auto` becomes `ms-auto`, `left-4` becomes `start-4`, and border radius utilities are mapped to their logical corners.

## Get Started

- [SvelteKit](/docs/rtl/sveltekit)
- [Vite](/docs/rtl/vite)
- [Astro](/docs/rtl/astro)

## How it works

Set `rtl` to `true` in your `components.json` file.

```json title="components.json"
{
  "rtl": true
}
```

The CLI will:

- Transform physical spacing, inset, border, and rounded classes to logical classes.
- Transform supported side props from physical values to logical values.
- Keep component behavior aligned with the active `dir` value.

## Direction

Add the Direction component and wrap your app with `DirectionProvider`.

<PMAddComp name="direction" />

```svelte showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>

<DirectionProvider direction="rtl">
  <!-- Your app content -->
</DirectionProvider>
```

## Manual review

Some components may need manual review after conversion, especially when your application has custom layout logic or directional animations.

<Steps>
<Step>

Set the document direction with `dir="rtl"`.

</Step>
<Step>

Review components that use directional placement, including dropdown menus, context menus, menubars, popovers, sheets, sidebars, and pagination.

</Step>
<Step>

Review custom animations and any portals rendered outside your provider tree.

</Step>
</Steps>
