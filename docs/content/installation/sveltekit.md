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

### Create project

Use the SvelteKit CLI to create a new project with TailwindCSS

<PMExecute command="sv create my-app --add tailwindcss" />

### Setup path aliases

SvelteKit 2 provides the `$lib` alias automatically. If you use a custom alias, configure it in `svelte.config.js`:

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

SvelteKit 3 replaces `$lib` with the `#lib` package import declared by new projects. Your `package.json` should contain both the exact and wildcard mappings:

```json title="package.json" {3-6} showLineNumbers
{
  "imports": {
    "#lib": "./src/lib/index.js",
    "#lib/*": "./src/lib/*"
  }
}
```

### Run the CLI

<PMExecute command="shadcn-svelte@latest init" />

### Configure components.json

You will be asked a few questions to configure `components.json`. The CLI defaults to `$lib` for SvelteKit 2 and `#lib` for SvelteKit 3.

```txt title="SvelteKit 2" showLineNumbers
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

```txt title="SvelteKit 3" showLineNumbers
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/app.css
Configure the import alias for lib: › #lib
Configure the import alias for components: › #lib/components
Configure the import alias for utils: › #lib/utils
Configure the import alias for hooks: › #lib/hooks
Configure the import alias for ui: › #lib/components/ui
```

### That's it

You can now start adding components to your project.

<PMAddComp name="button" />

The command above will add the `Button` component to your project. You can then import it like this:

```svelte {2,5} showLineNumbers
<script lang="ts">
  import { Button } from "#lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
```

Use `$lib/components/ui/button/index.js` instead in a SvelteKit 2 project.

</Steps>
