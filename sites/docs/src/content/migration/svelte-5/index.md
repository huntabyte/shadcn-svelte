---
title: Svelte 5 Migration
description: How to migrate to Svelte 5 from Svelte 4.
---

## Prerequisites

1. Ensure you have read up on the changes from Svelte 4 to Svelte 5. Svelte provides a comprehensive guide for this on their [website](https://svelte.dev/docs/svelte/v5-migration-guide).
2. Commit any pending changes to your repository.
3. Determine which of your components have custom behavior/styles so that you can reimplement those after updating.

<script>
    import { Steps, PMExecute, PMInstall, PMRemove } from "$lib/components/docs";
</script>

## Migrate Configs

The `tailwind.config`, `components.json`, and `utils` files have all changed for Svelte 5.

### Automatic

Note: This works best for projects that have not changed the contents of `tailwind.config`, `utils`, and the global css file.

<PMExecute command="shadcn-svelte@next init"/>

### Manual

<Steps>

### Update `components.json`

Add the `registry` to the root object, and add `hooks` and `ui` keys under `aliases`.

```json {2} {12-13} {16}
{
  "$schema": "https://next.shadcn-svelte.com/schema.json",
  "style": "default",
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
  "registry": "https://next.shadcn-svelte.com/registry"
}
```

### Update `tailwind.config`

Add `tailwindcss-animate`.

<PMInstall command="tailwindcss-animate"/>

Add `tailwindcss-animate` plugin, sidebar colors, and animations config.

```json {2} {15-24} {32-50} {53}
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			// unchanged ...
		},
		extend: {
			colors: {
				// unchanged ...
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
        		},
			},
			borderRadius: {
				// unchanged ...
			},
			fontFamily: {
                // unchanged ...
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--bits-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--bits-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate]
};

export default config;
```

### Update `utils`

Note: You may not want to do this if you aren't going to upgrade all your components, as some components may still rely on the now removed `flyAndScale` function.

The only function exported from utils now is `cn`.

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

</Steps>

## Upgrade Components

Pick and choose which components to upgrade with the `update` command.

<PMExecute command="shadcn-svelte@next update"/>

## Upgrade `bits-ui`

The `update` command doesn't upgrade `bits-ui` so you will need to do that yourself.

<PMInstall command="bits-ui"/>

## Remove unused dependencies

In Svelte 5 we have changed some dependencies.

### Remove `cmdk-sv`

`cmdk-sv` has been merged into `bits-ui` and is no longer necessary. Update any imports from `cmdk-sv` to `bits-ui`.

<PMRemove command="cmdk-sv"/>

### Remove `svelte-headless-table`

`svelte-headless-table` has been removed in favor of `@tanstack/table-core`.

<PMRemove command="svelte-headless-table"/>
