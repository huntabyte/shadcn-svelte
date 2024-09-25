---
title: Astro
description: How to setup shadcn-svelte in an Astro project.
---

<script>
  import { Alert, AlertDescription } from "$lib/registry/new-york/ui/alert";
  import { Steps, Callout, PMCreate, PMExecute, PMInstall, PMAddComp } from "$lib/components/docs";
</script>

## Setup your project

<Steps>

### Create project

Start by creating a new Astro project:

<PMCreate command="astro@latest" />

### Configure your Astro project

You will be asked a few questions to configure your project:

```bash
- Where should we create your new project?
./your-app-name
- How would you like to start your new project?
Choose a starter template (or Empty)
- Install dependencies?
Yes
- Do you plan to write TypeScript?
Yes
- How strict should TypeScript be?
Strict
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

Answer `Yes` to all the question prompted by the CLI when installing Svelte.

</Callout>

### Setup path aliases

Add the following code to the `tsconfig.json` file to resolve paths:

```jsonc title="tsconfig.json" {2-9} showLineNumbers
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib/*": ["./src/*"],
    },
    // ...
  },
}
```

<Callout className="mt-4">

If needed, adapt the path aliases to your specific needs ([learn more about it](https://docs.astro.build/en/guides/aliases/)).

</Callout>

### Create a global CSS file

Create the global stylesheet in `src/styles/app.css`:

```css title="src/styles/app.css" showLineNumbers
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Import the global CSS file

Import the `app.css` file in the `src/pages/index.astro` file:

```ts title="src/pages/index.astro" {2} showLineNumbers
---
import "$lib/styles/app.css";
---
```

### Run the CLI

Run the `shadcn-svelte` init command to setup your project:

<PMExecute command="shadcn-svelte@latest init" />

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Would you like to use TypeScript (recommended)? › Yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › src/styles/app.css
Where is your tailwind.config.[cjs|mjs|js|ts] located? › tailwind.config.mjs
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
```

### Update Astro's Tailwind config

To prevent serving the Tailwind base styles twice, we need to tell Astro not to apply the base styles, since we already include them in our own `app.css` file. To do this, set the `applyBaseStyles` config option for the tailwind plugin in `astro.config.mjs` to `false`.

```ts title="astro.config.mjs" {3-5} showLineNumbers
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // ...
  ],
});
```

### Update tailwind.config.mjs

When running `shadcn-svelte@latest init`, your Tailwind config for content will be overwritten. To fix this, add `astro` as one of the options inside of `content`:

```js title="tailwind.config.mjs" {1-4} showLineNumbers
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // ...
};
// ...
export default config;
```

### That's it

You can now start adding components to your project.

<PMAddComp name="button" />

The command above will add the `Button` component to your project. You can then import it like this:

```astro title="index.astro" {2,10} showLineNumbers
---
import { Button } from "$lib/components/ui/button";
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
