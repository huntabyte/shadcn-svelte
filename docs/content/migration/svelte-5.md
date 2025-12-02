---
title: Svelte 5
description: How to migrate from Svelte 4 and Tailwind 3 to Svelte 5.
---

<script>
	import Steps from "$lib/components/steps.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import PMRemove from "$lib/components/pm-remove.svelte";
	import Callout from "$lib/components/callout.svelte";
</script>

<Callout>

**Note**: With Svelte 5 comes significant changes to this project, along with the headless UI library used [bits-ui](https://bits-ui.com). This guide is specifically focused on migrating the shadcn-svelte portions and does not cover the migration of `bits-ui`. See [Bits UI's migration guide](https://bits-ui.com/docs/migration-guide) for more information.

</Callout>

## Svelte 4 to Svelte 5

This first guide will take your project from Svelte 4 with Tailwind 3 to Svelte 5 and Tailwind 3.

Once you've completed this guide and you're comfortable everything is working, you can move on to the next guide to migrate to Tailwind 4.

## Prerequisites

1. Ensure you have read up on the changes from Svelte 4 to Svelte 5. Svelte provides a comprehensive guide for this on their [website](https://svelte.dev/docs/svelte/v5-migration-guide).
2. Commit any pending changes to your repository.
3. Determine which of your components have custom behavior/styles so that you can reimplement those after updating.
4. Use [`sv-migrate`](https://svelte.dev/docs/cli/sv-migrate) to help you migrate your project to Svelte 5.

## Update Configs

The `components.json`, `utils`, and the global CSS file have changed for Svelte 5.

### Update `components.json`

Add the `registry` to the root object, and add `hooks`, `ui`, and `lib` keys under `aliases`.

```diff
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils",
+   "ui": "$lib/components/ui",
+   "hooks": "$lib/hooks",
+   "lib": "$lib"
  },
  "typescript": true,
+ "registry": "https://shadcn-svelte.com/registry"
}
```

### Update `tailwind.config.js`

Add `tailwindcss-animate`.

<PMInstall command="tailwindcss-animate" />

Add the `tailwindcss-animate` plugin, sidebar colors, and animations config.

```ts title="tailwind.config.js"
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--bits-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--bits-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
```

### Update `utils.ts`

<Callout>

**Note**: You may not want to do this step until after you've updated your components, as some components may rely on the now removed `flyAndScale` function.

</Callout>

`utils.ts` now only exports the `cn` function and a few utility types.

```ts title="src/lib/utils.ts"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
```

## Upgrade Components

### Alias Dependencies (optional)

If you plan to slowly migrate components, it's recommended to alias the old versions of the major dependencies, like `bits-ui`, in your `package.json` file so that you can use both versions of the library in your project while you migrate.

```diff title="package.json"
{
  "devDependencies": {
-	"bits-ui": "^0.22.0",
+   "bits-ui-old": "npm:bits-ui@0.22.0",
  }
}
```

You'll then want to replace all the imports used in your project to `bits-ui-old`.

```diff title="src/lib/components/ui/dialog-content.svelte"
<script lang="ts">
-  import { Dialog as DialogPrimitive } from "bits-ui";
+  import { Dialog as DialogPrimitive } from "bits-ui-old";
</script>
```

You can do the same for any of the other dependencies that you're using in your project.

### Update Dependencies

The following dependencies have been updated to support Svelte 5:

- `bits-ui` - `^1.0.0`
- `svelte-sonner` - `^1.0.0`
- `@lucide/svelte` - `^0.482.0`
- `paneforge` - `^1.0.0-next.5`
- `vaul-svelte` - `^1.0.0-next.7`
- `mode-watcher` - `^1.0.0`
- `cmdk-sv` - deprecated in favor of Bits UI's `Command` component
- `svelte-headless-table` - deprecated in favor of `@tanstack/table-core`
- `svelte-radix` - icons deprecated in favor of `@lucide/svelte`
- `lucide-svelte` - replaced with `@lucide/svelte`

You can update your dependencies by running the following command:

<PMInstall command="bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D" />

### Start Migrating Components

Now you're ready to begin updating your components to their new versions. The CLI doesn't actually _update_ your components, it simply replaces them with the new versions, so be sure to commit your changes before running the CLI.

```bash
git add .
git commit -m 'before migration'
```

Now you can run the `add` command to start migrating your components.

<PMExecute command="shadcn-svelte@latest add dialog --overwrite" />

Review the diff to see what was updated and make any necessary adjustments. Rinse and repeat for each component you want to migrate.

## Remove Unused Dependencies

Once you've updated all your components, you can remove the old dependencies from your `package.json` file.

### cmdk-sv

`cmdk-sv` has been replaced with Bits UI's `Command` component.

<PMRemove command="cmdk-sv" />

### svelte-headless-table

`svelte-headless-table` has been replaced with `@tanstack/table-core`.

<PMRemove command="svelte-headless-table" />

### svelte-radix

`svelte-radix` has been replaced with `@lucide/svelte`.

<PMRemove command="svelte-radix" />

### lucide-svelte

`lucide-svelte` has been replaced with `@lucide/svelte`.

<PMRemove command="lucide-svelte" />

## Next Steps

Once you've completed this guide and you're comfortable everything is working as expected, you can move on to the [Tailwind 4 Guide](/docs/migration/tailwind-v4).
