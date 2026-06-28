---
title: Vite
description: Add RTL support to a Vite project.
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

Set the document direction in `index.html`.

</Step>

```html title="index.html" showLineNumbers
<!doctype html>
<html lang="en" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My app</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
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

```svelte title="src/App.svelte" showLineNumbers
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>

<DirectionProvider direction="rtl">
  <div></div>
</DirectionProvider>
```

</Steps>
