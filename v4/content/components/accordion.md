---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/accordion
  doc: https://bits-ui.com/docs/components/accordion
  api: https://bits-ui.com/docs/components/accordion#api-reference
---

<script>
    import { ComponentPreview, PMAddComp, PMInstall, InstallTabs, Steps } from '$lib/components/docs';
</script>

<ComponentPreview name="accordion-demo" class="[&_[data-melt-accordion]]:sm:max-w-[70%]">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>

{#snippet cli()}

<PMAddComp name="accordion" />

{/snippet}

{#snippet manual()}

<Steps>

### Install `bits-ui`

<PMInstall command="bits-ui" />

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>

{/snippet}

</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```
