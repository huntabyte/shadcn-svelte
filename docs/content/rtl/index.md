---
title: RTL
description: Add right-to-left support to your project.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import LinkedCard from "$lib/components/linked-card.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import SvelteWhite from "$lib/components/svelte-white.svelte";
</script>

shadcn-svelte components have first-class support for right-to-left (RTL) layouts. Text alignment, positioning, and directional styles automatically adapt for languages like Arabic, Hebrew, and Persian.

<ComponentPreview
	name="card-rtl"
	direction="rtl"
	previewClassName="h-auto"
	hideCode
	caption="A card component in RTL mode."
	class="mb-8"
/>

When you install components, the CLI automatically transforms physical positioning classes to logical equivalents, so your components work seamlessly in both LTR and RTL contexts.

## Get Started

Select your framework to get started with RTL support.

<div class="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
	<LinkedCard href="/docs/rtl/sveltekit">
		<SvelteWhite />
		<p class="mt-2 font-medium">SvelteKit</p>
	</LinkedCard>
	<LinkedCard href="/docs/rtl/vite">
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			class="h-10 w-10"
			fill="currentColor"
		>
			<title>Vite</title>
			<path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z" />
		</svg>
		<p class="mt-2 font-medium">Vite</p>
	</LinkedCard>
	<LinkedCard href="/docs/rtl/astro">
		<svg
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			class="h-10 w-10"
			fill="currentColor"
		>
			<title>Astro</title>
			<path d="M8.358 20.162c-1.186-1.071-1.532-3.176-1.038-4.7.856 1.026 2.043 1.352 3.272 1.536 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.48.21.964.151 1.456-.144 1.194-.738 2.117-1.682 2.816-.377.28-.776.532-1.166.792-1.2.799-1.525 1.736-1.074 3.11l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.416 1.09-.012.053-.028.104-.063.184z" />
			<path d="M.599 14.599s3.486-1.697 6.982-1.697l2.635-8.142c.099-.395.39-.663.717-.663.326 0 .618.268.717.663l2.635 8.142c4.14 0 6.982 1.697 6.982 1.697L15.34 1.551C15.169 1.214 14.878 1 14.56 1H7.44c-.318 0-.61.214-.78.551z" />
		</svg>
		<p class="mt-2 font-medium">Astro</p>
	</LinkedCard>
</div>

## How it works

When you add components with `rtl: true` set in your `components.json`, the shadcn-svelte CLI automatically transforms classes and props to be RTL compatible:

- Physical positioning classes like `left-*` and `right-*` are converted to logical equivalents like `start-*` and `end-*`.
- Directional props are updated to use logical values.
- Text alignment and spacing classes are adjusted accordingly.
- Supported icons are automatically flipped using `rtl:rotate-180`.

## Try it out

Follow the [SvelteKit](/docs/rtl/sveltekit), [Vite](/docs/rtl/vite), or [Astro](/docs/rtl/astro) guide to enable RTL support in a new project.

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

If you have existing components installed before enabling RTL, you can migrate them using the CLI as follows:

<Steps>

<Step>Run the migrate command</Step>

<PMExecute command="shadcn-svelte@latest migrate rtl [path]" />

`[path]` accepts a path or component name to migrate. If you don't provide a path, it will migrate all the files in the `ui` directory.

### Manual Migration (Optional)

The following components are not automatically migrated by the CLI. Follow the RTL support section for each component to manually migrate them.

- [Calendar](/docs/components/calendar)
- [Pagination](/docs/components/pagination)
- [Sidebar](/docs/components/sidebar)

### Migrate Icons

Some icons like `ArrowRightIcon` or `ChevronLeftIcon` might need the `rtl:rotate-180` class to be flipped correctly. Add the `rtl:rotate-180` class to the icon component to flip it correctly.

```svelte showLineNumbers /rtl:rotate-180/
<ArrowRightIcon class="rtl:rotate-180" />
```

### Add direction component

Add the direction component to your project.

<PMAddComp name="direction" />

### Add DirectionProvider

Follow your framework's documentation for details on how to add the `DirectionProvider` component to your project.

See the [Get Started](#get-started) section for details on how to add the `DirectionProvider` component to your project.

</Steps>
