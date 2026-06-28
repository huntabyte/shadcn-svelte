---
title: Astro
description: Add RTL support to an Astro project.
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

Set the document direction in your Astro layout.

</Step>

```astro title="src/layouts/Layout.astro" showLineNumbers
---
const { title = "My app" } = Astro.props;
---

<!doctype html>
<html lang="en" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

<Step>

Add the Direction component.

</Step>

<PMAddComp name="direction" />

<Step>

Wrap Svelte islands that use direction-aware components with `DirectionProvider`.

</Step>

```svelte showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>

<DirectionProvider direction="rtl">
  <div></div>
</DirectionProvider>
```

</Steps>
