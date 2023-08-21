---
title: Alert
description: Displays a callout for user attention.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/alert
---

<script>
  import { ComponentPreview, ManualInstall } from '$components/docs';
</script>

<ComponentPreview name="alert-demo">

<div />

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add alert
```

<ManualInstall>

1. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import * as Alert from "$lib/components/ui/alert";
</script>

<Alert.Root>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    You can add components to your app using the cli.
  </Alert.Description>
</Alert.Root>
```

## Examples

### Default

<ComponentPreview name="alert-demo">

<div />

</ComponentPreview>

### Destructive

<ComponentPreview name="alert-destructive">

<div />

</ComponentPreview>
