---
title: Tailwind v4
description: How to use shadcn-svelte with Tailwind v4 and Svelte 5.
---

<script>
	import { Button }from "$lib/registry/ui/button/index.js";
	import InstallCards from "$lib/components/install-cards.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMExecute from "$lib/components/pm-execute.svelte";
	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";
	import PMRemove from "$lib/components/pm-remove.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import PMRun from "$lib/components/pm-run.svelte";
</script>

This documentation site is now running Tailwind v4. If you're looking for the old Tailwind v3 docs, you can find them here: [https://tw3.shadcn-svelte.com](https://tw3.shadcn-svelte.com).

## What's New

- The `@latest` CLI can now initialize projects with Tailwind v4 and Svelte 5.
- Full support for the new `@theme` directive and `@theme inline` option.
- All components are updated for Tailwind v4 and Svelte 5.
- Every primitive that renders an element now has a `data-slot` attribute for styling.
- We've fixed and cleaned up the style of the components.
- Buttons now use the default cursor.
- We're deprecating the `default` style. New projects will use `new-york`.
- HSL colors are now converted to OKLCH.

**Note: this is non-breaking. Your existing apps with Tailwind v3 will continue to work. When you add new components, they'll still be in Tailwind v3 with the style configured in `components.json` until you upgrade. Only new projects start with Tailwind v4.**

## See it Live

This documentation site is now using Tailwind v4 and Svelte 5, but for a more complete example, checkout the demo site here: [https://v4.shadcn-svelte.com](https://v4.shadcn-svelte.com).

If you find any bugs, please us know on [GitHub](https://github.com/huntabyte/shadcn-svelte/issues).

## Try It Out

You can start using Tailwind v4 and Svelte 5 today using the `@latest` CLI. See the specific install docs

<InstallCards />

## Upgrade Your Project

<Callout>

**Note**: This guide assumes you are coming from a Svelte 5 and Tailwind 3 project. If you are coming from a Svelte 4 project, you should first follow the [Svelte 4 and Tailwind 3 to Svelte 5](./svelte-5) guide.

</Callout>

<Callout class="bg-blue-50 mt-6 border-blue-600 dark:border-blue-900 dark:bg-blue-950 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900 text-foreground">

**Important:** Before upgrading, please read the [Tailwind v4 Compatibility
Docs](https://tailwindcss.com/docs/compatibility) and make sure your project
is ready for the upgrade. Tailwind v4 uses bleeding-edge browser features and
is designed for modern browsers.

</Callout>

One of the major advantages of using `shadcn-svelte` is that the code you end up with is exactly what you'd write yourself. There are no hidden abstractions.

This means when a dependency has a new release, you can just follow the official upgrade paths.

Here's how to upgrade your existing projects:

### 1. Follow the Tailwind v4 Upgrade Guide

- Upgrade to Tailwind v4 by following the official upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Use the `@tailwindcss/upgrade` codemod to remove deprecated utility classes and update the tailwind config.

### 2. Replace PostCSS with Vite

The upgrade script will automatically migrate your project to the latest PostCSS configuration of Tailwind v4, but the Tailwind team recommends using Vite instead, so we'll use that instead.

#### Delete `postcss.config.js`

```diff title="postcss.config.js"
- export default {
- 	plugins: {
- 		'@tailwindcss/postcss': {},
- 	}
- };
```

#### Uninstall `@tailwindcss/postcss`

<PMRemove command="@tailwindcss/postcss" />

#### Install `@tailwindcss/vite`

<PMInstall command="@tailwindcss/vite -D" />

#### Update `vite.config.ts`

```diff title="vite.config.ts"
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
+ import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
-	plugins: [sveltekit()],
+   plugins: [tailwindcss(), sveltekit()],
});
```

#### Verify the upgrade

Start your dev server and verify that all your styles are working as expected.

<PMRun command="dev" />

### 2. Update your `app.css` file

The codemod will update your `app.css` file to look something like this, where it's defining the colors as CSS variables and importing your existing `tailwind.config.ts` file:

```css showLineNumbers
@import "tailwindcss";

@config "../tailwind.config.ts";

/*
  The default border color has changed to `currentcolor` in Tailwind CSS v4,
  so we've added these compatibility styles to make sure everything still
  looks the same as it did with Tailwind CSS v3.

  If we ever want to remove these styles, we need to add an explicit border
  color utility to any element that depends on these defaults.
*/
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentcolor);
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 72.2% 50.6%;
    --destructive-foreground: 0 0% 98%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
    --sidebar: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --ring: 240 4.9% 83.9%;
    --sidebar: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

In the following steps, we'll update this to completely remove the `tailwind.config.ts` and adopt the CSS-based config.

#### Replace `tailwind-css-animate` with `tw-animate-css`

We've deprecated `tailwindcss-animate` in favor of `tw-animate-css`, which has support for Tailwind v4.

<PMRemove command="tailwindcss-animate" />

<PMInstall command="tw-animate-css -D" />

#### Import `tw-animate-css`

```diff title="app.css"
  @import "tailwindcss";
+ @import "tw-animate-css";
/* ... */
```

#### Add the custom variant for dark mode

```diff title="app.css"
@import "tailwindcss";
@import "tw-animate-css";

+@custom-variant dark (&:is(.dark *));
/* ... */
```

#### Remove the compatibility styles

We override the styles applied here so this is just dead code.

```diff title="app.css"
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

- /*
-   The default border color has changed to `currentcolor` in Tailwind CSS v4,
-   so we've added these compatibility styles to make sure everything still
-   looks the same as it did with Tailwind CSS v3.
-
-   If we ever want to remove these styles, we need to add an explicit border
-   color utility to any element that depends on these defaults.
- */
- @layer base {
-   *,
-   ::after,
-   ::before,
-   ::backdrop,
-   ::file-selector-button {
-     border-color: var(--color-gray-200, currentcolor);
-   }
- }
```

#### CSS Variables and Theme Config

We'll move the CSS variables to the `:root` and `.dark` selectors, wrap the colors values in `hsl()`, and set up an `@theme inline` directive to replace our Tailwind v3 config.

Once complete, your `app.css` file should look something like this (the color values will differ depending on your theme):

```css title="app.css"
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: hsl(0 0% 100%) /* <- Wrap in HSL */;
  --foreground: hsl(240 10% 3.9%);
  --muted: hsl(240 4.8% 95.9%);
  --muted-foreground: hsl(240 3.8% 46.1%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(240 10% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(240 10% 3.9%);
  --border: hsl(240 5.9% 90%);
  --input: hsl(240 5.9% 90%);
  --primary: hsl(240 5.9% 10%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(240 4.8% 95.9%);
  --secondary-foreground: hsl(240 5.9% 10%);
  --accent: hsl(240 4.8% 95.9%);
  --accent-foreground: hsl(240 5.9% 10%);
  --destructive: hsl(0 72.2% 50.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --ring: hsl(240 10% 3.9%);
  --sidebar: hsl(0 0% 98%);
  --sidebar-foreground: hsl(240 5.3% 26.1%);
  --sidebar-primary: hsl(240 5.9% 10%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(240 4.8% 95.9%);
  --sidebar-accent-foreground: hsl(240 5.9% 10%);
  --sidebar-border: hsl(220 13% 91%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);

  --radius: 0.5rem;
}

.dark {
  --background: hsl(240 10% 3.9%);
  --foreground: hsl(0 0% 98%);
  --muted: hsl(240 3.7% 15.9%);
  --muted-foreground: hsl(240 5% 64.9%);
  --popover: hsl(240 10% 3.9%);
  --popover-foreground: hsl(0 0% 98%);
  --card: hsl(240 10% 3.9%);
  --card-foreground: hsl(0 0% 98%);
  --border: hsl(240 3.7% 15.9%);
  --input: hsl(240 3.7% 15.9%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(240 5.9% 10%);
  --secondary: hsl(240 3.7% 15.9%);
  --secondary-foreground: hsl(0 0% 98%);
  --accent: hsl(240 3.7% 15.9%);
  --accent-foreground: hsl(0 0% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --ring: hsl(240 4.9% 83.9%);
  --sidebar: hsl(240 5.9% 10%);
  --sidebar-foreground: hsl(240 4.8% 95.9%);
  --sidebar-primary: hsl(224.3 76.3% 48%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(240 3.7% 15.9%);
  --sidebar-accent-foreground: hsl(240 4.8% 95.9%);
  --sidebar-border: hsl(240 3.7% 15.9%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

@theme inline {
  /* Radius (for rounded-*) */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-ring: var(--ring);
  --color-radius: var(--radius);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

#### Verify the update

Restart your dev server and verify that all your styles are working as expected.

<PMRun command="dev" />

#### Remove the `tailwind.config` file

Once you've verified that your styles are working as expected, you can remove the `tailwind.config.ts` file.

### 3. Use new `size-*` utility

The new `size-*` utility (added in Tailwind v3.4), is now fully supported by `tailwind-merge`. You can replace `w-* h-*` with the new `size-*` utility:

```diff
- w-4 h-4
+ size-4
```

### 4. Update your dependencies

<PMInstall command="bits-ui@latest @lucide/svelte@latest tailwind-variants@latest tailwind-merge@latest clsx@latest svelte-sonner@latest paneforge@next vaul-svelte@next formsnap@latest" />

### 5. Update your utils (optional)

If you're planning on adding additional components in the future or plan to update your existing components to the latest versions, you'll need to update your `utils.ts` file.

Previously, we were depending on `bits-ui` for some simple type helpers that required you to have `bits-ui` installed, regardless if you were using components that depend on it.

These helpers have been moved into the `utils.ts` file:

```diff title="utils.ts"
 import { clsx, type ClassValue } from "clsx";
 import { twMerge } from "tailwind-merge";

 export function cn(...inputs: ClassValue[]) {
	 return twMerge(clsx(inputs));
 }

+ // eslint-disable-next-line @typescript-eslint/no-explicit-any
+ export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
+ // eslint-disable-next-line @typescript-eslint/no-explicit-any
+ export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
+ export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
+ export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
```

And then you can incrementally replace these imports in your existing components:

```diff title="card.svelte"
<script lang="ts">
-	import type { WithElementRef } from "bits-ui";
+	import type { WithElementRef } from "$lib/utils.js";
</script>
```

### 6. Update Your Colors (optional)

The dark mode colors have been revisited and updated to be more accessible, as you can see in these docs as well as the [v4.shadcn-svelte.com](https://v4.shadcn-svelte.com) demo site.

You can update your components to use the new dark mode colors by re-adding your components using the CLI[^1].

<Steps>

<Step>Commit any changes</Step>

**The CLI will overwrite your existing components.** It's recommended to commit the changes you've made to your components before running the CLI.

```bash
git add .
git commit -m '..."
```

<Step>Update components</Step>

<PMExecute command="shadcn-svelte@latest add --all --overwrite" />

<Step> Update colors</Step>

Update the dark mode colors in your `app.css` file to the new OKLCH values. See the [Base Colors](/docs/theming#base-colors) reference for a list of colors.

<Step>Review Changes</Step>

Review and re-apply any changes you've made to your components using the git diffs.

</Steps>

[^1]: Updating your components will overwrite your existing components.
