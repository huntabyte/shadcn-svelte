---
title: Direction
description: A provider component that sets the reading direction for your application.
component: true
links:
  doc: https://bits-ui.com/docs/utilities/bits-config
  api: https://bits-ui.com/docs/utilities/bits-config#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	let { viewerData } = $props();
</script>

The `DirectionProvider` sets the reading direction (`ltr` or `rtl`) for Bits UI components. Use it together with the HTML `dir` attribute for languages such as Arabic, Hebrew, and Persian.

<ComponentPreview name="direction-demo">
<div></div>
</ComponentPreview>

## Installation

This draft requires the upcoming Bits UI release containing [#2288](https://github.com/huntabyte/bits-ui/pull/2288), which has already merged. Bits UI 2.21.0 does not include `BitsConfig.dir`.

<InstallTabs>
{#snippet cli()}
<PMAddComp name="direction" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>Install `bits-ui`:</Step>
<PMInstall command="bits-ui -D" />
<Step>Copy and paste the following code into your project.</Step>
{#if viewerData}
<ComponentSource item={viewerData} data-llm-ignore />
{/if}
</Steps>
{/snippet}
</InstallTabs>

## Usage

Set `dir="rtl"` and the appropriate `lang` on the `<html>` element in `src/app.html`. Wrap your layout in the provider:

```svelte title="src/routes/+layout.svelte"
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
  let { children } = $props();
</script>

<DirectionProvider direction="rtl">
  {@render children()}
</DirectionProvider>
```

The provider does not render an element or modify the document. For a section of a page, set `dir` on a containing element as well. This matters for text, Tailwind's `rtl:` variants, and components such as Tabs that read direction from the DOM.

`dir` is also accepted as an alias. `direction` takes precedence when both are set. Nested providers inherit their parent's direction unless overridden, and changing either prop updates descendants reactively. Existing `BitsConfig` options such as locale and portal target are preserved.

## useDirection

Call `useDirection` during component initialization, then read `current` in markup or a derived value. It defaults to `ltr` outside a provider.

```svelte
<script lang="ts">
  import { useDirection } from "$lib/components/ui/direction/index.js";
  const direction = useDirection();
</script>

<p>Current direction: {direction.current}</p>
```

## RTL styles

Set `"rtl": true` in `components.json` before adding or updating components. The CLI converts physical spacing, alignment, and corner classes to logical equivalents, mirrors directional icons, and adds RTL translation overrides. These styles work in both reading directions.

```json title="components.json"
{
  "rtl": true
}
```

Review custom classes when updating existing components. There is no automatic migration command. Use `ms-*`, `pe-*`, `start-*`, `end-*`, `text-start`, and `rtl:rotate-180` in your own components.

## Portals and other libraries

Bits UI menus and floating content inherit the provider through Svelte context, including content portalled to `body`. Use a local `dir` override when a popup's text direction differs from its provider. For full-page RTL, the document's `dir` also covers portalled content.

Bits UI's floating `side` API still uses physical `left` and `right`; it does not accept shadcn/ui's `inline-start` and `inline-end`. Submenu keyboard navigation follows the provider, but Bits UI still defaults submenu placement to `right` in RTL. Pass `side="left"` on `DropdownMenu.SubContent`, `ContextMenu.SubContent`, or `Menubar.SubContent` when needed, as the example does. Explicit physical sides stay physical.

The provider configures Bits UI. Set direction separately on components supplied by other libraries. For Carousel, `opts.direction` takes precedence over `dir` and the provider; the carousel adapts its options and arrow keys to the resolved direction. For Calendar, use a matching locale for localized labels and direction.
