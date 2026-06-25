---
title: RTL
description: Add right-to-left support to your project.
---

<script>
	import Callout from "$lib/components/callout.svelte";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

shadcn-svelte components have first-class support for right-to-left (RTL) layouts. Text alignment, positioning, and directional styles automatically adapt for languages like Arabic, Hebrew, and Persian.

<ComponentPreview
	name="card-rtl"
	hideCode
	class="mb-8"
	description="A card component in RTL mode."
/>

When you install components, the CLI automatically transforms physical positioning classes to logical equivalents, so your components work seamlessly in both LTR and RTL contexts.

## Get Started

Select your framework to get started with RTL support.

- [SvelteKit](/docs/rtl/sveltekit)
- [Vite](/docs/rtl/vite)
- [Astro](/docs/rtl/astro)

## How it works

When you add components with `rtl: true` set in your `components.json`, the shadcn-svelte CLI automatically transforms classes and props to be RTL compatible:

- Physical positioning classes like `left-*` and `right-*` are converted to logical equivalents like `start-*` and `end-*`.
- Directional props are updated to use logical values.
- Text alignment and spacing classes are adjusted accordingly.
- Supported icons are automatically flipped using `rtl:rotate-180`.

```json title="components.json"
{
  "rtl": true
}
```

## Supported Styles

Automatic RTL transformation via the CLI is available for projects using the registry styles in this release.

## Font Recommendations

For the best RTL experience, we recommend using fonts that have proper support for your target language. [Noto](https://fonts.google.com/noto) is a great font family for this and pairs well with Inter and Geist.

See your framework's RTL guide under [Get Started](#get-started) for details on installing and configuring RTL fonts.

## Animations

The CLI also handles animation classes, automatically transforming physical directional animations to their logical equivalents. For example, `slide-in-from-right` becomes `slide-in-from-end`.

This ensures animations like dropdowns, popovers, and tooltips animate in the correct direction based on the document's text direction.

**A note on tw-animate-css:**

There is a [known issue](https://github.com/Wombosvideo/tw-animate-css/issues/67) with the `tw-animate-css` library where the logical slide utilities are not working as expected. For now, make sure you pass in the `dir` prop to portal elements.

```svelte showLineNumbers /dir="rtl"/
<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content dir="rtl">
    <div>Content</div>
  </Popover.Content>
</Popover.Root>
```

```svelte showLineNumbers /dir="rtl"/
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>Open</Tooltip.Trigger>
    <Tooltip.Content dir="rtl">
      <div>Content</div>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
```

## Migrating existing components

If you have existing components installed before enabling RTL, set `rtl` to `true` in your `components.json`, then update the components you want to migrate.

<Steps>

<Step>Set `rtl` to `true` in your `components.json` file.</Step>

```json title="components.json"
{
  "rtl": true
}
```

<Step>Update existing components with the CLI.</Step>

<PMExecute command="shadcn-svelte@latest update [component]" />

<Callout class="mt-4">

The upstream shadcn/ui docs include a dedicated `migrate rtl` command. shadcn-svelte currently applies RTL transforms when components are added or updated.

</Callout>

### Manual Migration (Optional)

Some components may need manual review after conversion, especially when your application has custom layout logic or directional placement.

- [Calendar](/docs/components/calendar)
- [Pagination](/docs/components/pagination)
- [Sidebar](/docs/components/sidebar)

### Migrate Icons

Some icons like arrow or chevron icons might need the `rtl:rotate-180` class to be flipped correctly. Add the `rtl:rotate-180` class to the icon component to flip it correctly.

```svelte showLineNumbers /rtl:rotate-180/
<ArrowRightIcon class="rtl:rotate-180" />
```

### Add direction component

Add the direction component to your project.

<PMAddComp name="direction" />

### Add DirectionProvider

Follow your framework's documentation for details on how to add the `DirectionProvider` component to your project.

See the [Get Started](#get-started) section for details on how to add the `DirectionProvider` component to your project.

```svelte showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>

<DirectionProvider direction="rtl">
  <!-- Your app content -->
</DirectionProvider>
```

</Steps>
