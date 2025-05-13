---
title: SvelteKit
description: How to setup shadcn-svelte in a SvelteKit project.
---

<script>
  import { Alert, AlertDescription } from "$lib/registry/new-york/ui/alert";
  import { Steps, PMCreate, PMExecute, PMInstall, PMAddComp } from "$lib/components/docs";
</script>

## Setup your project

<Steps>

### Create project

Use the SvelteKit CLI to create a new project.

<PMExecute command="sv@0.6.18 create my-app" />

### Add TailwindCSS

Use the Svelte CLI to add Tailwind CSS to your project.

<PMExecute command="sv@0.6.18 add tailwindcss" />

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

<PMExecute command="shadcn-svelte@next init" />

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Would you like to use TypeScript (recommended)? › Yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › src/app.css
Where is your tailwind.config.[cjs|js|ts] located? › tailwind.config.js
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### That's it

You can now start adding components to your project.

<PMAddComp name="button" />

The command above will add the `Button` component to your project. You can then import it like this:

```svelte {2,5} showLineNumbers
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
```

</Steps>
