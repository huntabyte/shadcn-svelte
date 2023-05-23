---
title: Alert
description: A vertically stacked set of interactive headings that each reveal a section of content.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/alert
---

<script>
  import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '$ui/accordion';
  import { AlertDemo, AlertDestructiveDemo, ComponentExample, ManualInstall } from '$components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/alert/AlertDemo.svelte">

<div slot="example" style="width: 100%;">
<AlertDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add accordion
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Alert, AlertDescription, AlertTitle } from "$ui/alert";
</script>

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>
```

## Examples

### Default

<ComponentExample src="src/lib/components/docs/examples/alert/AlertDemo.svelte">

<div slot="example" style="width: 100%;">
<AlertDemo />
</div>

</ComponentExample>

### Destructive

<ComponentExample src="src/lib/components/docs/examples/alert/AlertDestructiveDemo.svelte">

<div slot="example" style="width: 100%;">
<AlertDestructiveDemo />
</div>

</ComponentExample>
