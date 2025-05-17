---
title: Tailwind v4
description: How to use shadcn-svelte with Tailwind v4 and Svelte 5.
---

<script>
	import { Button } from "$lib/registry/ui/button/index.js";
	import { InstallCards, Callout, PMUpgrade, PMExecute, Step, Steps, PMRemove, PMInstall } from "$lib/components/docs";
</script>

It's here! Tailwind v4 and Svelte 5. Ready for you to try out. You can start using it today.

<div class="flex gap-2 mt-6">
<Button size="sm" href="/docs/installation">Get Started</Button>
<Button variant="outline" size="sm" target="_blank" href="https://v4.shadcn-svelte.com">See Demo</Button>
</div>

## What's New

- The `@next` CLI can now initialize projects with Tailwind v4 and Svelte 5.
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

You can start using Tailwind v4 and Svelte 5 today using the `@next` CLI. See the specific install docs

<InstallCards />

## Upgrade Your Project

<Callout>

**Note**: This guide assumes you are coming from a Svelte 5 and Tailwind 3 project. If you are coming from a Svelte 4 project, you should first follow the [Svelte 4 and Tailwind 3 to Svelte 5](./svelte-4-tailwind-3-to-svelte-5) guide.

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

### 2. Update your CSS Variables

The codemod will migrate your CSS variables as references under the `@theme` directive.

```css showLineNumbers
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }
}

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
}
```

This works. But to make it easier to work with colors and other variables, we'll need to move the `hsl` wrappers and use `@theme inline`.

Here's how you do it:

1. Move `:root` and `.dark` out of the `@layer` base.
2. Wrap the color values in `hsl()`
3. Add the `inline` option to `@theme` i.e `@theme inline`
4. Remove the `hsl()` wrappers from `@theme`

```css showLineNumbers
:root {
  --background: hsl(0 0% 100%); // <-- Wrap in hsl
  --foreground: hsl(0 0% 3.9%);
}

.dark {
  --background: hsl(0 0% 3.9%); // <-- Wrap in hsl
  --foreground: hsl(0 0% 98%);
}

@theme inline {
  --color-background: var(--background); // <-- Remove hsl
  --color-foreground: var(--foreground);
}
```

This change makes it much simpler to access your theme variables in both utility classes and outside of CSS for eg. using color values in JavaScript.

### 3. Use new `size-*` utility

The new `size-*` utility (added in Tailwind v3.4), is now fully supported by `tailwind-merge`. You can replace `w-* h-*` with the new `size-*` utility:

```diff
- w-4 h-4
+ size-4
```

### 4. Update your dependencies

<PMUpgrade command="bits-ui@latest @lucide/svelte@latest tailwind-merge@latest clsx@latest svelte-sonner@latest paneforge@next vaul-svelte@next formsnap@latest" />

### 5. Replace `tailwindcss-animate` with `tw-animate-css`

We've deprecated `tailwindcss-animate` in favor of `tw-animate-css`.

New projects will have `tw-animate-css` installed by default.

For existing projects, follow the steps below:

1. Remove `tailwindcss-animate` from your dependencies

<PMRemove command="tailwindcss-animate" />

2. Remove the `@plugin 'tailwindcss-animate'` from your `app.css` file.

```diff
- @plugin 'tailwindcss-animate'
```

3. Install `tw-animate-css` as a dev dependency.

<PMInstall command="tw-animate-css" />

4. Add `@import 'tw-animate-css'` to your `app.css` file.

```diff
+ @import 'tw-animate-css'
```

### 6. Update Your Colors (optional)

We've revisited the dark mode colors and updated them to be more accessible.

If you're running an existing Tailwind v4 project (**not an upgraded one**[^1]), you can update your components to use the new dark mode colors by re-adding your components using the CLI[^2].

<Steps>

<Step>Commit any changes</Step>

**The CLI will overwrite your existing components.** It's recommended to commit the changes you've made to your components before running the CLI.

```bash
git add .
git commit -m '..."
```

<Step>Update components</Step>

<PMExecute command="shadcn-svelte@next add --all --overwrite" />

<Step> Update colors</Step>

Update the dark mode colors in your `app.css` file to the new OKLCH values. See the [Base Colors](/docs/theming#base-colors) reference for a list of colors.

<Step>Review Changes</Step>

Review and re-apply any changes you've made to your components using the git diffs.

</Steps>

[^1]: Upgraded projects are not affected by this change. You can continue using the old dark mode colors.

[^2]: Updating your components will overwrite your existing components.
