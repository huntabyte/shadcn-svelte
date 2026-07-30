# @shadcn-svelte/registry

`sv` community add-on that scaffolds a [shadcn-svelte custom registry](https://shadcn-svelte.com/docs/registry) into an existing SvelteKit project.

## Usage

```sh
npx sv add @shadcn-svelte/registry
```

This add-on:

- depends on the official `tailwindcss` add-on
- writes `registry.json` and the example registry sources under `$lib/registry`
- adds `cn` helpers, theme CSS, and a registry preview page (optional)
- installs the packages needed to author and build a registry
- adds a `build:registry` script

### Options

#### `demo`

Include the registry preview page.

Default: `true`

```sh
npx sv add @shadcn-svelte/registry="demo:true"
```

## Local development

```sh
## create a new minimal project in the `demo` directory
pnpm demo:create

## build and add this add-on to the demo project
pnpm demo:add

## run the tests
pnpm test
```

You can also install a local build into any project with:

```sh
npx sv add file:../path/to/registry
```

## Building the registry (in a generated project)

```sh
pnpm build:registry
```

Registry JSON files are written to `static/r` by default and can be served from your SvelteKit app.

## Documentation

- [shadcn-svelte registry docs](https://shadcn-svelte.com/docs/registry)
- [sv community add-ons](https://svelte.dev/docs/cli/community)
