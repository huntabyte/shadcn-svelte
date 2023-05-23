---
title: Alert
description: Displays a callout for user attention.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/alert
---

<script>
  import { AlertDemo, AlertDestructiveDemo, ComponentExample, ManualInstall } from '$components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/alert/AlertDemo.svelte">

<div slot="example" style="width: 100%;">
<AlertDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add alert
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Alert, AlertDescription, AlertTitle } from "$components/ui/alert";
</script>
```

```svelte
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
