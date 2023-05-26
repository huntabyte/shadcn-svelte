# shadcn-svelte

A CLI for adding shadcn components to your project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and sets up CSS variables for the project.

```bash
npx shadcn-svelte init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shadcn-svelte add [component]
```

### Example

```bash
npx shadcn-svelte add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shadcn-svelte add
```

## Documentation

Visit https://shadcn-svelte.com to view the documentation.

## License

Licensed under the [MIT license](https://github.com/huntabyte/shadcn-svelte/blob/main/LICENSE.md).
