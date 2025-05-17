# registry-template

You can use the `shadcn-svelte` CLI to run your own component registry. Running your own
component registry allows you to distribute your custom components, hooks, pages, and
other files to any Svelte project.

## Getting Started

This is a template for creating a custom registry using SvelteKit.

- The template uses a `registry.json` file to define components and their files.
- The `shadcn-svelte build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- The template also includes a route handler for serving registry items.
- Every registry item is compatible with the `shadcn-svelte` CLI.

## Documentation

Visit the [shadcn-svelte documentation](https://next.shadcn-svelte.com/docs/registry) to view the full documentation.
