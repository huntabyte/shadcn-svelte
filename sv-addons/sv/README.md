# @shadcn-svelte/sv

`sv` community add-on that runs the [shadcn-svelte](https://shadcn-svelte.com) CLI.

## Usage

```sh
# add it during project creation
npx sv create my-project --add @shadcn-svelte
# or add it afterwards
npx sv add @shadcn-svelte
```

This add-on:

- depends on the official `tailwindcss` add-on
- runs `shadcn-svelte init` (interactive prompts)
- runs `shadcn-svelte add` (interactive prompts)

## Local development

```sh
pnpm demo:create
pnpm demo:add
pnpm build
```

## Documentation

- [shadcn-svelte docs](https://shadcn-svelte.com/docs)
- [sv community add-ons](https://svelte.dev/docs/cli/community)
