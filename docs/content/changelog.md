---
title: Changelog
description: Latest updates and announcements.
---

<script>
	import Steps from '$lib/components/steps.svelte'
	import Callout from '$lib/components/callout.svelte'
	import ComponentPreview from '$lib/components/component-preview.svelte'
</script>

## October 2025 - New Components
For this round of components, I looked at what we build every day, the boring stuff we rebuild over and over, and made reusable abstractions you can actually use.

- [Spinner](/docs/components/spinner): An indicator to show a loading state.
- [Kbd](/docs/components/kbd): Display a keyboard key or group of keys.
- [Button Group](/docs/components/button-group): A group of buttons for actions and split buttons.
- [Input Group](/docs/components/input-group): Input with icons, buttons, labels and more.
- [Field](/docs/components/field): One component. All your forms.
- [Item](/docs/components/item): Display lists of items, cards, and more.
- [Empty](/docs/components/empty): Use this one for empty states.

---

## June 2025

### New Calendar Components

We've completely overhauled the `Calendar` and `RangeCalendar` components to support dropdowns for the month and year selectors, and have added 30+ Calendar blocks to help you get started building your own calendar components.

Check out the [Calendar](/docs/components/calendar) docs page and the [Calendar Blocks](/blocks/calendar) page for more.

---

## May 2025

### Tailwind v4 Support

Tailwind v4 support has officially landed. You can see a full demo of the refreshed styles that come with it here: [https://v4.shadcn-svelte.com](https://v4.shadcn-svelte.com).

This release includes several key changes, all outlined in the [Tailwind v4 migration guide](/docs/migration/tailwind-v4). If you're still using Svelte v5 with Tailwind v3, your project and the CLI will continue to work as expected until you're ready to upgrade.

### Charts

Charts have been added as a preview component to the project. See the [Charts](/charts) page for examples.

If you're running Svelte v5 and Tailwind v4 you can add them to your project via the CLI.

### Custom Registry Support

We've added support for custom/remote registries - This means you can publish your own components and share them with the community via the `shadcn-svelte` CLI.

See the [Registry documentation](/docs/registry) for more information.

---

## March 2024

### Introducing Blocks

[Blocks](/blocks) are ready-made components that you can use to build your apps. They are fully responsive, accessible, and composable, meaning they are built using the same principles as the rest of the components in shadcn-svelte.

[v0](https://v0.dev) only supports React at the moment, so you can't customize them like you can the original from [shadcn/ui](https://ui.shadcn.com). However, if having support for Svelte interests you, I'm sure the v0 team would love to hear about it. :)

### New Component: Breadcrumb

We've added a new component to the project, [Breadcrumb](/docs/components/breadcrumb).

### New Component: Scroll Area

We've added a new component to the project, [Scroll Area](/docs/components/scroll-area), which is built on top of the [Scroll Area](https://bits-ui.com/docs/components/scroll-area) component from Bits UI.

It supports both vertical and horizontal scrolling, and is designed to provide a consistent experience across all browsers and platforms.

## February 2024

### New Component: Resizable

We've added a new component to the project, [Resizable](/docs/components/resizable), which is built on top of [PaneForge](https://paneforge.com). PaneForge is still in an early stage, so be sure to raise any issues you find with the library on the [PaneForge GitHub](https://github.com/svecosystem/paneforge).


### Updated Icon Imports

After some feedback about dev server performance, we've updated the way we import icons. With this change, we've decided to move away from the unmaintained `radix-icons-svelte` package to [svelte-radix](https://github.com/shinokada/svelte-radix) for the `new-york` style.

Instead of importing icons like so:

```ts
import { Check } from "@lucide/svelte";
```

We now import them directly:

```ts
import Check from "@lucide/svelte/icons/check";
```

With deep imports, we're preventing Vite from optimizing the entire icon collections, and instead only optimizing the icons that are actually used in your project. From what we've seen, this has a massive impact on dev server performance. Enjoy! 🚀

### Major Forms Update

Formsnap has been completely rewritten to be more flexible, easier to use, and less opinionated. This means we've had to make some changes to the way we use it in `shadcn-svelte`, but once you get the hang of it, you'll find it's much more powerful and less restrictive than the previous iteration.

Since the changes are so significant, there isn't a direct migration path from the old version to the new version. You'll need to update your components to use the new API, as well as ensure you're using the latest version of `formsnap` and `sveltekit-superforms`.

All of the `Form` components have been updated to use the new API, and you can see live examples of them on the [Forms Examples](/examples/forms) page.

Visit the [Formsnap](https://formsnap.dev) documentation (which has also been updated) to learn more about the new API and how its used.

## January 2024

We've added four new components to the project, [Carousel](/docs/components/carousel), [Drawer](/docs/components/drawer), [Sonner](/docs/components/sonner), & [Pagination](/docs/components/pagination).

### New Component: Carousel

We've added a new component to the project, [Carousel](/docs/components/carousel).

<ComponentPreview name="carousel-demo">

<div></div>

</ComponentPreview>

### New Component: Drawer

The Drawer is built on top of [vaul-svelte](https://vaul-svelte.com) and is a port of [vaul](https://vaul.emilkowal.ski/), originally created by [Emil Kowalski](https://x.com/emilkowalski) for React.

<ComponentPreview name="drawer-demo">

<div></div>

</ComponentPreview>

### New Component: Sonner

The Sonner component is provided by [svelte-sonner](https://svelte-sonner.vercel.app/), which is a Svelte port of [Sonner](https://sonner.emilkowal.ski/), originally created by [Emil Kowalski](https://x.com/emilkowalski) for React.

<ComponentPreview name="sonner-demo">

<div></div>

</ComponentPreview>

### New Component: Pagination

Pagination leverages the [Pagination](https://bits-ui.com/docs/components/pagination) component from Bits UI.

## December 2023

We've added three new components to the project, [Calendar](/docs/components/calendar), [Range Calendar](/docs/components/range-calendar), & [Date Picker](/docs/components/date-picker).


## November 2023

### New Component: Toggle Group

We've added a new component to the library, [Toggle Group](/docs/components/toggle-group).

## October 2023

We've added two new components to the library, [Command](/docs/components/command) & [Combobox](/docs/components/combobox). We've also made some updates to the `<Form.Label />` component that you'll want to be aware of.

### New Component: Command

Command is a component that allows you to create a command palette. It's built on top of [cmdk-sv](https://cmdk-sv.com), which is a Svelte port of [cmdk](https://cmdk.paco.me). The library is still in its infancy, but we're excited to see where it goes. If you notice any issues, please [open an issue](https://github.com/huntabyte/cmdk-sv) with the library.

Be sure to check out the [Command](/docs/components/command) docs for more information.

### New Component: Combobox

Combobox is a combination of the `<Command />` & `<Popover />` components. It allows you to create a searchable dropdown menu.

Be sure to check out the [Combobox](/docs/components/combobox) docs for more information.

### Updates to Form

#### Form.Label Changes

Since we had to make some internal changes to formsnap to fix outstanding issues, there is a slight modification we have to make to the `<Form.Label />` component. The `ids` returned from `getFormField()` is now a store, so we need to prefix it with `$` when we use it.

```svelte title="form-label.svelte" {2}
<Label
  for={$ids.input}
  class={cn($errors && "text-destructive", className)}
  {...$$restProps}
>
  <slot />
</Label>
```

### Form.Control

Formsnap introduced a new component `<Form.Control />` which wraps non-traditional form elements. This allows us to ensure the components are accessible, and work well with the rest of the form components. You'll need to define & export that control in your `form/index.ts` file.

```ts title="src/lib/ui/form/index.ts"
// ...rest
const Control = FormPrimitive.Control;

export {
  // ...rest
  Control,
  Control as FormControl,
};
```
