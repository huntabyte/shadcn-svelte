---
title: SvelteKit
description: How to set up shadcn-svelte in a SvelteKit project.
---

<script>
  import { Alert, AlertDescription } from "$lib/registry/ui/alert";
  import { Steps, PMCreate, PMExecute, PMInstall, PMAddComp } from "$lib/components/docs";
</script>

## Set up your project

<Steps>

### Create project

Use the SvelteKit CLI to create a new project.

<PMExecute command="sv create my-app" />

### Add TailwindCSS

Use the Svelte CLI to add Tailwind CSS to your project.

<PMExecute command="sv add tailwindcss" />

### Set up path aliases

If you are not using the default alias `$lib`, you'll need to update your `svelte.config.js` file to include those aliases.

```ts title="svelte.config.js" {6}
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
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/app.css
Configure the import alias for lib: › $lib
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
