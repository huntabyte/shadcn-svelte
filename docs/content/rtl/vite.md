---
title: Vite
description: Create a new Vite project with RTL support.
---

<script>
  import Steps from "$lib/components/steps.svelte";
  import PMAddComp from "$lib/components/pm-add-comp.svelte";
  import PMInstall from "$lib/components/pm-install.svelte";
</script>

<Steps>

### Create Project

Create and initialize a Svelte project using the [Vite installation guide](/docs/installation/vite). You can skip this step if you have already created a project.

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

Add the `dir="rtl"` and `lang="ar"` attributes to the `html` tag in your `index.html`. Update `lang="ar"` to your target language.

```html title="index.html" showLineNumbers {2}
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Then wrap your app with the `DirectionProvider` component with the `direction="rtl"` prop in your `App.svelte`:

```svelte title="src/App.svelte" showLineNumbers {2,5-7}
<script lang="ts">
  import { DirectionProvider } from "$lib/components/ui/direction/index.js";
</script>

<DirectionProvider direction="rtl">
  <!-- Your application content -->
</DirectionProvider>
```

### Add Font

For the best RTL experience, we recommend using fonts that have proper support for your target language. [Noto](https://fonts.google.com/noto) is a great font family for this and it pairs well with Inter and Geist.

Install the font using [Fontsource](https://fontsource.org/fonts/noto-sans-arabic):

<PMInstall command="@fontsource-variable/noto-sans-arabic" />

Import the font in your `app.css`:

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
