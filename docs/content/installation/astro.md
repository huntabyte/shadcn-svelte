---
title: Astro
description: How to setup shadcn-svelte in an Astro project.
---

<script>
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import Steps from "$lib/components/steps.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMCreate from "$lib/components/pm-create.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<Steps>

### Create project

Start by creating a new Astro project:

<PMCreate command="astro@latest" />

### Configure your Astro project

You will be asked a few questions to configure your project:

```bash showLineNumbers
- Where should we create your new project?
./your-app-name
- How would you like to start your new project?
Choose a starter template (or Empty)
- Install dependencies?
Yes
- Initialize a new git repository? (optional)
Yes/No
```

### Add Svelte to your project

Install Svelte using the Astro CLI:

<PMExecute command="astro add svelte" />

<Callout className="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Svelte.

</Callout>

### Add TailwindCSS to your project

Add Tailwind CSS using the Astro CLI:

<PMExecute command="astro add tailwind" />

<Callout className="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing TailwindCSS.

</Callout>

### Import the global CSS file

Import the `global.css` file in the `src/pages/index.astro` file:

```astro title="src/pages/index.astro" {2} showLineNumbers
---
import "../styles/global.css";
---
```

### Setup path aliases

Add the following code to the `tsconfig.json` file to resolve paths:

```json title="tsconfig.json" {2-10} showLineNumbers
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
    // ...
  }
}
```

<Callout className="mt-4">

If needed, adapt the path aliases to your specific needs ([learn more about it](https://docs.astro.build/en/guides/aliases/)).

</Callout>

### Run the CLI

Run the `shadcn-svelte` init command to setup your project:

<PMExecute command="shadcn-svelte@latest init" />

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/styles/global.css
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

```astro title="index.astro" {2,10} showLineNumbers
---
import { Button } from "$lib/components/ui/button/index.js";
---

<html lang="en">
	<head>
		<title>Astro</title>
	</head>
	<body>
		<Button>Hello World</Button>
	</body>
</html>
```

<Callout className="mt-4">

Remember to use the `client` directives inside `.astro` files when dealing with interactive components ([learn more about it](https://docs.astro.build/en/reference/directives-reference/#client-directives)).

</Callout>

</Steps>
