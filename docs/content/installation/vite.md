---
title: Vite
description: How to setup shadcn-svelte in a Vite project.
---

<script>
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import Steps from "$lib/components/steps.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
</script>

<Steps>

### Add TailwindCSS

Use the Svelte CLI to add Tailwind CSS to your project.

<PMExecute command="sv add tailwindcss" />

### Edit tsconfig.json file

The current version of Vite splits TypeScript configuration into three files, two of which need to be edited.
Add the `baseUrl` and `paths` properties to the `compilerOptions` section of the `tsconfig.json` and
`tsconfig.app.json` files:

```json title="tsconfig.json" {7-13} showLineNumbers
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Edit tsconfig.app.json file

Add the following code to the `tsconfig.app.json` file to resolve paths, for your IDE:

```json title="tsconfig.app.json" {4-8} showLineNumbers
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Update vite.config.ts

Add the following code to the vite.config.ts so your app can resolve paths without error:

```ts title="vite.config.ts" {1, 5-9} showLineNumbers
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
