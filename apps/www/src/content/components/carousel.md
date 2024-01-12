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
  import * as Carousel from "$lib/components/ui/carousel";
</script>

<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Examples

### With Text

<ComponentPreview name="checkbox-with-text">

<div />

</ComponentPreview>
