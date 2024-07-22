---
title: Carousel
description: A carousel with motion and swipe built using Embla.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/carousel
bits: https://www.embla-carousel.com/get-started/svelte/
---

<script>
  import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="carousel-demo">

<div />

</ComponentPreview>

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/get-started/svelte/) library.

## Installation

```bash
npx shadcn-svelte@latest add carousel
```

<ManualInstall>

1. Install `embla-carousel-svelte`:

```bash
npm install embla-carousel-svelte -D
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

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

<div />

</ComponentPreview>

```svelte title="Example" showLineNumbers {4-6}
<!-- 33% of the carousel width. -->
<Carousel.Root>
  <Carousel.Content>
    <Carousel.Item class="basis-1/3">...</Carousel.Item>
    <Carousel.Item class="basis-1/3">...</Carousel.Item>
    <Carousel.Item class="basis-1/3">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

```svelte title="Responsive" showLineNumbers {4-6}
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

To set the spacing between the items, we use a `pl-[VALUE]` utility on the `<Carousel.Item />` and a negative `-ml-[VALUE]` on the `<Carousel.Content />`.

<ComponentPreview name="carousel-spacing">

<div />

</ComponentPreview>

```svelte title="Example" showLineNumbers /-ml-4/ /pl-4/
<Carousel.Root>
  <Carousel.Content class="-ml-4">
    <Carousel.Item class="pl-4">...</Carousel.Item>
    <Carousel.Item class="pl-4">...</Carousel.Item>
    <Carousel.Item class="pl-4">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

```svelte title="Responsive" showLineNumbers /-ml-2/ /pl-2/ /md:-ml-4/ /md:pl-4/
<Carousel.Root>
  <Carousel.Content class="-ml-2 md:-ml-4">
    <Carousel.Item class="pl-2 md:pl-4">...</Carousel.Item>
    <Carousel.Item class="pl-2 md:pl-4">...</Carousel.Item>
    <Carousel.Item class="pl-2 md:pl-4">...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

<ComponentPreview name="carousel-orientation">

<div />

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

Use reactive state and the `bind:api` directive to get an instance of the carousel API.

<ComponentPreview name="carousel-api">

<div />

</ComponentPreview>

```svelte showLineNumbers {2,5,18}
<script lang="ts">
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

  let api: CarouselAPI;
  let count = 0;
  let current = 0;

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1;
    });
  }
</script>

<Carousel.Root bind:api>
  <Carousel.Content>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
    <Carousel.Item>...</Carousel.Item>
  </Carousel.Content>
</Carousel.Root>
```

## Events

You can listen to events using the api instance from `bind:api`.

```svelte showLineNumbers {2,5,7-11,14}
<script lang="ts">
  import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

  let api: CarouselAPI;

  $: if (api) {
    api.on("select", () => {
      // do something on select
    });
  }
</script>

<Carousel.Root bind:api>
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

<div />

</ComponentPreview>

See the [Embla Carousel docs](https://www.embla-carousel.com/api/plugins/) for more information on using plugins.
