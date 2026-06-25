---
title: SvelteKit
description: Add RTL support to a SvelteKit project.
---

<script>
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
</script>

## Enable RTL

<Steps>
<Step>

Set `rtl` to `true` in your `components.json` file.

</Step>

```json title="components.json"
{
  "rtl": true
}
```

<Step>

Set the document direction in `src/app.html`.

</Step>

```html title="src/app.html" showLineNumbers
<!doctype html>
<html lang="en" dir="rtl">
  <head>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

<Step>

Add the Direction component.

</Step>

<PMAddComp name="direction" />

<Step>

Wrap your application with `DirectionProvider`.

</Step>

```svelte title="src/routes/+layout.svelte" showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";

  let { children } = $props();
</script>

<DirectionProvider direction="rtl">
  {@render children()}
</DirectionProvider>
```

</Steps>
