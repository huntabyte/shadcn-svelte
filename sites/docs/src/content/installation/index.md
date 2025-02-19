---
title: Installation
description: How to install dependencies and structure your app.
---

<script>
	import { LinkedCard } from '$lib/components/docs'
	import SvelteWhite from '$lib/components/docs/icons/svelte-white.svelte'
</script>

## Guides

<div class="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6">
  <LinkedCard href="/docs/installation/sveltekit">
  <SvelteWhite />
    <p class="font-medium mt-2">SvelteKit</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/astro">
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="currentColor"><title>Astro</title><path d="M16.074 16.86C15.354 17.476 13.917 17.895 12.262 17.895C10.23 17.895 8.527 17.263 8.075 16.412C7.914 16.9 7.877 17.458 7.877 17.814C7.877 17.814 7.771 19.564 8.988 20.782C8.988 20.15 9.501 19.637 10.133 19.637C11.216 19.637 11.215 20.582 11.214 21.349V21.418C11.214 22.582 11.925 23.579 12.937 24C12.7812 23.6794 12.7005 23.3275 12.701 22.971C12.701 21.861 13.353 21.448 14.111 20.968C14.713 20.585 15.383 20.161 15.844 19.308C16.0926 18.8493 16.2225 18.3357 16.222 17.814C16.2221 17.4903 16.1722 17.1685 16.074 16.86ZM15.551 0.6C15.747 0.844 15.847 1.172 16.047 1.829L20.415 16.176C18.7743 15.3246 17.0134 14.7284 15.193 14.408L12.35 4.8C12.3273 4.72337 12.2803 4.65616 12.2162 4.60844C12.152 4.56072 12.0742 4.53505 11.9943 4.53528C11.9143 4.5355 11.8366 4.56161 11.7727 4.60969C11.7089 4.65777 11.6623 4.72524 11.64 4.802L8.83 14.405C7.00149 14.724 5.23264 15.3213 3.585 16.176L7.974 1.827C8.174 1.171 8.274 0.843 8.471 0.6C8.64406 0.385433 8.86922 0.218799 9.125 0.116C9.415 0 9.757 0 10.443 0H13.578C14.264 0 14.608 0 14.898 0.117C15.1529 0.219851 15.3783 0.386105 15.551 0.6Z" fill="currentColor"></path></svg>
    <p class="font-medium mt-2">Astro</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/vite">
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="currentColor"><title>Vite</title><path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z"></path></svg>
    <p class="font-medium mt-2">Vite</p>
  </LinkedCard>
  <LinkedCard href="/docs/installation/manual">
  <SvelteWhite />
    <p class="font-medium mt-2">Manual</p>
  </LinkedCard>
</div>

## Imports

Unlike the original [shadcn/ui](https://ui.shadcn.com) for React, where the full components can exist in a single file, components in this port are split into multiple files. This is because Svelte doesn't support defining multiple components in a single file, so utilizing the CLI to add components will be the optimal approach.

The CLI will create a folder for _each_ component, which will sometimes just contain a single Svelte file, and in other times, multiple files. Within each folder, there will be an `index.ts` file that exports the component(s), so you can import them from a single file.

For example, the Accordion component is split into four `.svelte` files:

- `accordion.svelte`
- `accordion-content.svelte`
- `accordion-item.svelte`
- `accordion-trigger.svelte`

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
    "css": "src/app.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components",
    "hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
  },
  "registry": "https://next.shadcn-svelte.com/registry"
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
