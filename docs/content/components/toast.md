---
title: Toast
description: A succinct message that is displayed temporarily.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/toast
  doc: https://base-ui.com/react/components/toast
  api: https://base-ui.com/react/components/toast#api-reference
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import ComponentSource from "$lib/components/component-source.svelte";
  import PMAddComp from "$lib/components/pm-add-comp.svelte";
  import InstallTabs from "$lib/components/install-tabs.svelte";
  import Steps from "$lib/components/steps.svelte";
  import Step from "$lib/components/step.svelte";

  let { viewerData } = $props();
</script>

<ComponentPreview name="toast-demo" />

## Installation

<InstallTabs>
{#snippet cli()}
<Steps>

<Step>Run the following command:</Step>

<PMAddComp name="toast" />

<Step>Add the Toaster component.</Step>

```svelte title="+layout.svelte" {2,7} showLineNumbers
<script lang="ts">
  import { Toaster } from "$lib/components/ui/toast/index.js";
  let { children } = $props();
</script>

{@render children?.()}
<Toaster />
```

</Steps>
{/snippet}
{#snippet manual()}
<Steps>

<Step>Add the Button component:</Step>

<PMAddComp name="button" />

<Step>Copy and paste the following code into your project.</Step>

{#if viewerData}
<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>Update the import paths to match your project setup.</Step>

<Step>Add the Toaster component.</Step>

```svelte title="+layout.svelte" {2,7} showLineNumbers
<script lang="ts">
  import { Toaster } from "$lib/components/ui/toast/index.js";
  let { children } = $props();
</script>

{@render children?.()}
<Toaster />
```

</Steps>
{/snippet}
</InstallTabs>

## Usage

```ts
import { toast } from "$lib/components/ui/toast/index.js";
```

```ts
toast.add({
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
});
```

## Types

Set the `type` option to render a status icon. The built-in renderer recognizes `success`, `info`, `warning`, `error`, and `loading`.

<ComponentPreview name="toast-types" />

## Action

Pass button props with `actionProps` to render an action.

```ts
const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onclick() {
      toast.close(id);
    },
  },
});
```

## Promise

Use `toast.promise` to update one toast as an asynchronous task moves through loading, success, and error states.

<ComponentPreview name="toast-promise" />

## API Reference

See the [Base UI Toast documentation](https://base-ui.com/react/components/toast#api-reference) for the upstream manager options, stacking, swipe dismissal, and primitive API.
