---
title: SvelteKit
description: Create a new SvelteKit project with RTL support.
---

<script>
  import Steps from "$lib/components/steps.svelte";
  import PMAddComp from "$lib/components/pm-add-comp.svelte";
  import PMInstall from "$lib/components/pm-install.svelte";
</script>

<Steps>

### Create Project

Create and initialize a project using the [SvelteKit installation guide](/docs/installation/sveltekit). You can skip this step if you have already created a project.

Add `"rtl": true` to your `components.json` file:

```json title="components.json" showLineNumbers {4}
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "nova",
  "rtl": true
}
```

Keep the other settings generated during initialization.

### Add DirectionProvider

Add the direction component to your project.

<PMAddComp name="direction" />

Wrap your application with the `DirectionProvider` component with the `direction="rtl"` prop.

```svelte title="src/routes/+layout.svelte" showLineNumbers {3,7-9}
<script lang="ts">
  import "../app.css";
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
  let { children } = $props();
</script>

<DirectionProvider direction="rtl">
  {@render children?.()}
</DirectionProvider>
```

Then add the `dir="rtl"` and `lang="ar"` attributes to the `html` tag in `src/app.html`. Update `lang="ar"` to your target language.

```html title="src/app.html" showLineNumbers {2}
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

### Add Font

For the best RTL experience, we recommend using fonts that have proper support for your target language. [Noto](https://fonts.google.com/noto) is a great font family for this and it pairs well with Inter and Geist.

Install the font using [Fontsource](https://fontsource.org/fonts/noto-sans-arabic):

<PMInstall command="@fontsource-variable/noto-sans-arabic" />

Import the font in your global CSS file:

```css title="src/app.css" showLineNumbers {4,7}
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn-svelte/tailwind.css";
@import "@fontsource-variable/noto-sans-arabic";

@theme inline {
  --font-sans: "Noto Sans Arabic Variable", sans-serif;
}
```

For other languages, eg. Hebrew, you can use `@fontsource-variable/noto-sans-hebrew`.

### Add Components

You are now ready to add components to your project. The CLI will take care of handling RTL support for you.

<PMAddComp name="item" />

</Steps>
