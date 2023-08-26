---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/accordion
bits: https://www.bits-ui.com/docs/components/accordion
---

<script>
    import { ComponentPreview, ManualInstall } from '$components/docs';
    import { AccordionDemo } from '@/registry/default/example'
</script>

<ComponentPreview name="accordion-demo" class="[&_[data-melt-accordion]]:sm:max-w-[70%]">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add accordion
```

<ManualInstall>

1. Install `bits-ui`:

```bash
npm install bits-ui
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion";
</script>

<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```
