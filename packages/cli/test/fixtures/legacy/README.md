# Backward Compatibility Fixtures

This directory contains fixtures to ensure backward compatibility/continuity with users running Svelte v5 and Tailwind v3.

## Scenarios

There are a few scenarios that we need to support:

### 1. User has an already initialized shadcn-svelte project with Svelte v5 & Tailwind v3

This is going to be the most common scenario, as the `next` registry has been receiving a lot more traffic than the `main` registry over the past year, so it's important we don't break users trust in that old `next` registry.

In this scenario, we want to keep the existing project going as it is, meaning we keep installing the older versions of the components
and their dependencies pinned to the last version of the Tailwind v3/Svelte v5 registry.

This will ensure that there is not inconsistency between the components that have already been added, and the ones that may be added in the future.

#### How it works

These users will have a `components.json` file that looks like this:

```json
{
	"style": "new-york" // | "default",
	"tailwind": {
		"config": "tailwind.config.js",
		"css": "src/app.pcss",
		"baseColor": "zinc"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils",
		"ui": "$lib/components/ui",
		"hooks": "$lib/hooks"
	},
	"typescript": true,
	"registry": "https://shadcn-svelte.com/registry"
}
```

When the user runs `npx shadcn-svelte@next add <component>`, this (should?) fail the schema validation, which we use as the signal to check if the user is running Tailwind v3 in their project. If so, the following should happen:

1. Pull their `style` property from the `components.json` file, which will be used to point them to the correct registry.
2. Update the `components.json` file to the new format, stripping anything that doesn't need to be there
3. Update the registry URL to point to the appropriate "legacy" registry, which is `https://tw3.shadcn-svelte.com/registry/<style>`.

Then we should be able to proceed with the rest of the adding process and future add commands should _just work_.

### 2. User has a yet to be initialized shadcn-svelte project with Svelte v5 & Tailwind v3

In this scenario, they don't have a `components.json` file, so _in theory_ they shouldn't have any components added yet, meaning continuous compatibility is not an issue, but supporting Tailwind v3 is (think how Tailwind v4 uses some modern browser features).

This should ultimately fail to proceed with a `shadcn-svelte init` command, and we can give the user two options:

1. Upgrade to Tailwind v4 and run `npx shadcn-svelte init` again, which should work as expected
2. Continue using Tailwind v3, but use a pinned older version of the CLI to initialize/add components which will be pinned to a specific registry schema that aligns with that CLI version.