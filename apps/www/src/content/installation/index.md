---
title: Installation
description: How to install dependencies and structure your app.
---

<script>
	import { LinkedCard } from '$lib/components/docs'
</script>

## Guides

<div class="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6">
  <LinkedCard href="/docs/installation/sveltekit">
    <p class="font-medium text-xl">SvelteKit</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/astro">
    <p class="font-medium text-xl">Astro</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/vite">
    <p class="font-medium text-xl">Vite</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/manual">
    <p class="font-medium text-xl">Manual</p>
  </LinkedCard>
</div>

## Imports

Unlike the original [shadcn/ui](https://ui.shadcn.com) for React, where the full components can exist in a single file, components in this port are split into multiple files. This is because Svelte doesn't support defining multiple components in a single file, so utilizing the CLI to add components will be the optimal approach.

The CLI will create a folder for _each_ component, which will sometimes just contain a single Svelte file, and in other times, multiple files. Within each folder, there will be an `index.ts` file that exports the component(s), so you can import them from a single file.

For example, the Accordion component is split into four `.svelte` files:

- `Accordion.svelte`
- `AccordionContent.svelte`
- `AccordionItem.svelte`
- `AccordionTrigger.svelte`

They can then be imported from the `accordion/index.ts` file like so:

```ts
import * as Accordion from '$lib/components/ui/accordion"
// or
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "$lib/components/ui/accordion"
```

Regardless of the import approach you take, the components will be tree-shaken by Rollup, so you don't have to worry about unused components being bundled into your app.

## TypeScript

This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.

However, we provide a JavaScript version of the components as well. The JavaScript version is _only_ available via the [CLI](/docs/cli).

### Opt-out of TypeScript

To opt out of TypeScript, set the `typescript` flag to `false` in your `components.json` file.

```json {7} title="components.json"
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components"
  }
}
```

To configure import aliases, create a `jsconfig.json` file:

```json {4} title="jsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

## ESLint configuration

If you are using ESLint, some components may trigger false positives depending on your ESLint configuration. For example, you could end up with lint errors when components define `$$Props` to specify the type for `$$restProps` as `$$Props` is not directly used in the rest of the component.

To ignore these linting errors, you can modify your ESLint configuration.

One option is to add a `.eslintrc` file in the directory where you define your components, `$lib/components/ui` for example:

```json title="src/lib/components/ui/.eslintrc"
{
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^\\\\$\\\\$(Props|Events|Slots|Generic)$"
      }
    ]
  }
}
```

The main benefit of adding an additional `.eslintrc` file just to `$lib/components/ui` is that you will not affect how ESLint functions for the rest of your project. Only your `shadcn-svelte` components will ignore these false positives.

If this is not important to you, then another option is to use a similar rule override in your global ESLint configuration file, usually `.eslintrc.cjs`. For inspiration, please refer to [this gist](https://gist.github.com/huntabyte/b73073a93a7a664f3cbad7c50376c9c9).

If your global ESLint configuration is using the [flat config format](https://eslint.org/docs/latest/use/configure/configuration-files) or you would like to migrate to the flat config format [Configuration Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide) you could add another rule block in your `eslint.config.js` for example:

```js title="src/eslint.config.js"
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  /* ... */
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    /* location of your components where you would like to apply these rules  */
    files: ["**/components/ui/**/*.svelte"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^\\$\\$(Props|Events|Slots|Generic)$",
        },
      ],
    },
  },
];
```

## VSCode extension

Install the shadcn-svelte [VSCode extension](https://marketplace.visualstudio.com/items?itemName=Selemondev.vscode-shadcn-svelte) by [@selemondev](https://github.com/selemondev) in Visual Studio Code to easily add Shadcn Svelte components to your project.

This extension offers a range of features:

- Ability to initialize the shadcn-svelte CLI
- Add components to your project
- Navigate to a specific component's documentation page directly from your IDE
- Handy snippets for quick component imports and markup

## JetBrains IDEs extension

Install the shadcn/ui Components Manager [JetBrains extension](https://plugins.jetbrains.com/plugin/23479-shadcn-ui-components-manager) by [@WarningImHack3r](https://github.com/WarningImHack3r) in any JetBrains IDE (IntelliJ IDEA, WebStorm...) to easily manage shadcn components within your project.

This extension offers a range of features, including:

- Automatically detect shadcn/ui components in your project
- Instantly add, remove, and update them with a single click
- Supports all shadcn/ui implementations: Svelte, React, Vue, and Solid
- Easily search for remote or existing components
