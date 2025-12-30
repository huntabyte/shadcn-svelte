---
title: SvelteKit
description: How to setup shadcn-svelte in a SvelteKit project.
---

<script>
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import Steps from "$lib/components/steps.svelte";
	import PMCreate from "$lib/components/pm-create.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<Steps>

### Add tailwind to your project

Use the SvelteKit CLI to create a new project with TailwindCSS

<PMExecute command="sv create my-app --add tailwindcss" />

Or add TailwindCSS to an existing project

<PMExecute command="sv add tailwindcss" />

### Setup path aliases

If you are not using the default alias `$lib`, you'll need to update your `svelte.config.js` file to include those aliases.

```ts title="svelte.config.js" {6} showLineNumbers
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

<PMExecute command="shadcn-svelte@latest init" />

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
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
