---
title: CLI
description: Use the CLI to add components to your project.
---

## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and creates CSS variables for the project.

```bash
npx shadcn-svelte init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shadcn-svelte add [component]
```

You will be prompted to set an installation path for the component. The default path is `src/lib/components/ui`. The path will be stored in your `svelte.config.js` file and remembered on subsequent component installations.

```js title="svelte.config.js" {17-19}
const config = {
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexOptions)
  ],
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
      "$components/*": "src/lib/components/*"
    }
  },
  shadcn: {
    componentPath: "./src/lib/components/ui"
  }
};
```

To change the installation path, simply update the `componentPath` value in your `svelte.config.js` file.

### Example

```bash
npx shadcn-svelte add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shadcn-svelte add
```
