# registry-template

You can use the `shadcn-svelte` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any Svelte project.

## Getting Started

This is a template for creating a custom registry using SvelteKit.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn-svelte build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- Every registry item is compatible with the `shadcn-svelte` CLI.
- The `card`, `button`, `input`, `label`, `textarea` components here would come from the `shadcn-svelte` registry, but the `stepper` component is a custom `ui` component you can use as a reference for creating and referencing "local" `ui` components.

> [!IMPORTANT]
> Don't forget to replace the version of `shadcn-svelte` in the `package.json` file with the version you want to use.

## Documentation

Visit the [shadcn-svelte documentation](https://shadcn-svelte.com/docs/registry) to view the full documentation.
