---
title: Vite
description: How to setup shadcn-svelte in a Vite project.
---

<script>
  import { Alert, AlertDescription } from "$lib/registry/new-york/ui/alert";
  import { Steps } from "$lib/components/docs";
</script>

## Setup your project

<Steps>

### Add TailwindCSS

Use the `svelte-add` CLI to add Tailwind CSS to your project.

```bash
npx @svelte-add/tailwindcss@latest
```

### Install dependencies

```bash
npm install
```

### Setup path aliases

Update your path aliases in your `tsconfig.json` and `vite.config.ts`.

```json title="tsconfig.json" {3-7}
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

```js title="vite.config.ts" {1, 5-9}
import path from "path";

export default defineConfig({
  // ... other options
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
```

### Run the CLI

```bash
npx shadcn-svelte@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Would you like to use TypeScript (recommended)? › Yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › src/app.pcss
Where is your tailwind.config.[cjs|js|ts] located? › tailwind.config.js
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-svelte@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```svelte {2,5} showLineNumbers
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<Button>Click me</Button>
```

</Steps>
