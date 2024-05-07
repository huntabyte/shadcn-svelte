---
title: SvelteKit
description: How to setup shadcn-svelte in a SvelteKit project.
---

<script>
  import { Alert, AlertDescription } from "$lib/registry/new-york/ui/alert";
  import { Steps } from "$lib/components/docs";
</script>

## Setup your project

<Steps>

### Create project

Use the SvelteKit CLI to create a new project.

```bash
npm create svelte@latest my-app
```

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

If you are not using the default alias `$lib`, you'll need to update your `svelte.config.js` file to include those aliases.

```js title="svelte.config.js" {6}
const config = {
  // ... other config
  kit: {
    // ... other config
    alias: {
      "@/*": "./path/to/lib/*",
    },
  },
};
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
