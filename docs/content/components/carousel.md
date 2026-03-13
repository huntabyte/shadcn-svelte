---
title: Carousel
description: A carousel with motion and swipe built using Embla.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/carousel
  doc: https://www.embla-carousel.com/get-started/svelte
  api: https://www.embla-carousel.com/api
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

<ComponentPreview name="carousel-demo">

<div></div>

</ComponentPreview>

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/get-started/svelte/) library.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="carousel" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `embla-carousel-svelte`:

</Step>

<PMInstall command="embla-carousel-svelte -D" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>
```

```svelte showLineNumbers
<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
```

## Examples

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<Carousel.Item />`.

<ComponentPreview name="carousel-size">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {4-6}
<!-- 33% of the carousel width. -->
<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item class="basis-1/3">...</Carousel.Item>
    <Carousel.Item class="basis-1/3">...</Carousel.Item>
    <Carousel.Item class="basis-1/3">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

```svelte showLineNumbers {4-6}
<!-- 50% on small screens and 33% on larger screens. -->
<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item class="md:basis-1/2 lg:basis-1/3">...</Carousel.Item>
    <Carousel.Item class="md:basis-1/2 lg:basis-1/3">...</Carousel.Item>
    <Carousel.Item class="md:basis-1/2 lg:basis-1/3">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

### Spacing

To set the spacing between the items, we use a `ps-[VALUE]` utility on the `<Carousel.Item />` and a negative `-ms-[VALUE]` on the `<Carousel.Content />`.

<ComponentPreview name="carousel-spacing">

<div></div>

</ComponentPreview>

```svelte showLineNumbers /-ms-4/ /ps-4/
<Carousel.Root>
  <Carousel.Content class="-ms-4">
    <Carousel.Item class="ps-4">...</Carousel.Item>
    <Carousel.Item class="ps-4">...</Carousel.Item>
    <Carousel.Item class="ps-4">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

```svelte showLineNumbers /-ms-2/ /ps-2/ /md:-ms-4/ /md:ps-4/
<Carousel.Root>
  <Carousel.Content class="-ms-2 md:-ms-4">
    <Carousel.Item class="ps-2 md:ps-4">...</Carousel.Item>
    <Carousel.Item class="ps-2 md:ps-4">...</Carousel.Item>
    <Carousel.Item class="ps-2 md:ps-4">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

<ComponentPreview name="carousel-orientation">

<div></div>

</ComponentPreview>

```svelte showLineNumbers /vertical | horizontal/
<Carousel.Root orientation="vertical | horizontal">
  <Carousel.Content>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```svelte showLineNumbers {2-5}
<Carousel.Root
  opts={{
    align: "start",
    loop: true,
  }}
>
  <Carousel.Content>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

## API

Use reactive state and the `setApi` callback to get an instance of the carousel API.

<ComponentPreview name="carousel-api">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {2,5,19}
<script lang="ts">
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

  let api = $state<CarouselAPI>();
  let current = $state(0);
  const count = $derived(api ? api.scrollSnapList().length : 0);

  $effect(() => {
    if (api) {
      current = api.selectedScrollSnap() + 1;
      api.on("select", () => {
        current = api!.selectedScrollSnap() + 1;
      });
    }
  });
</script>

<Carousel.Root setApi={(emblaApi) => (api = emblaApi)}>
  <Carousel.Content>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

## Events

You can listen to events using the api instance from `setApi`.

```svelte showLineNumbers {2,5,7-13,16}
<script lang="ts">
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

  let api = $state<CarouselAPI>();

  $effect(() => {
    if (api) {
      api.on("select", () => {
        // do something
      });
    }
  });
</script>

<Carousel.Root setApi={(emblaApi) => (api = emblaApi)}>
  <Carousel.Content>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

```svelte showLineNumbers {2,7-11}
<script lang="ts">
  import Autoplay from "embla-carousel-autoplay";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<Carousel.Root
  plugins={[
    Autoplay({
      delay: 2000,
    }),
  ]}
>
  <!-- ... -->
</Carousel.Root>
```

<ComponentPreview name="carousel-plugin">

<div></div>

</ComponentPreview>

See the [Embla Carousel docs](https://www.embla-carousel.com/api/plugins/) for more information on using plugins.
