---
title: Changelog
description: Latest updates and announcements.
---

<script>
	import { Steps, Callout, ComponentPreview } from '$lib/components/docs'
</script>

## March 2024

### Introducing Blocks

[Blocks](/blocks) are ready-made components that you can use to build your apps. They are fully responsive, accessible, and composable, meaning they are built using the same principles as the rest of the components in shadcn-svelte.

[v0](https://v0.dev) only supports React at the moment, so you can't customize them like you can the original from [shadcn/ui](https://ui.shadcn.com). However, if having support for Svelte interests you, I'm sure the v0 team would love to hear about it. :)

### New Component: Breadcrumb

We've added a new component to the project, [Breadcrumb](/docs/components/breadcrumb).

<ComponentPreview name="breadcrumb-demo">

<div></div>

</ComponentPreview>

### New Component: Scroll Area

We've added a new component to the project, [Scroll Area](/docs/components/scroll-area), which is built on top of the [Scroll Area](https://bits-ui.com/docs/components/scroll-area) component from Bits UI.

It supports both vertical and horizontal scrolling, and is designed to provide a consistent experience across all browsers and platforms.

#### Examples

<ComponentPreview name="scroll-area-demo">

<div></div>

</ComponentPreview>

<ComponentPreview name="scroll-area-horizontal">

<div></div>

</ComponentPreview>

## February 2024

### New Component: Resizable

We've added a new component to the project, [Resizable](/docs/components/resizable), which is built on top of [PaneForge](https://paneforge.com). PaneForge is still in an early stage, so be sure to raise any issues you find with the library on the [PaneForge GitHub](https://github.com/svecosystem/paneforge).

<ComponentPreview name="resizable-demo">

<div></div>

</ComponentPreview>

### Updated Icon Imports

After some feedback about dev server performance, we've updated the way we import icons. With this change, we've decided to move away from the unmaintained `radix-icons-svelte` package to [svelte-radix](https://github.com/shinokada/svelte-radix) for the `new-york` style.

Instead of importing icons like so:

```ts
import { Check } from "@lucide/svelte";
// or
import { Check } from "radix-icons-svelte";
```

We now import them directly:

```ts
import Check from "@lucide/svelte/icons/check";
// or
import Check from "svelte-radix/Check.svelte";
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

The Drawer is built on top of [vaul-svelte](https://vaul-svelte.com) and is a port of [vaul](https://vaul.emilkowalski.ski/), originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

<ComponentPreview name="drawer-demo">

<div></div>

</ComponentPreview>

### New Component: Sonner

The Sonner component is provided by [svelte-sonner](https://svelte-sonner.vercel.app/), which is a Svelte port of [Sonner](https://sonner.emilkowal.ski/), originally created by [Emil Kowalski](https://twitter.com/emilkowalski_) for React.

<ComponentPreview name="sonner-demo">

<div></div>

</ComponentPreview>

### New Component: Pagination

Pagination leverages the [Pagination](https://bits-ui.com/docs/components/pagination) component from Bits UI.

<ComponentPreview name="pagination-demo">

<div></div>

</ComponentPreview>

## December 2023

We've added three new components to the project, [Calendar](/docs/components/calendar), [Range Calendar](/docs/components/range-calendar), & [Date Picker](/docs/components/date-picker).

### New Component: Calendar

<ComponentPreview name="calendar-demo">

<div></div>

</ComponentPreview>

### New Component: Range Calendar

<ComponentPreview name="range-calendar-demo">

<div></div>

</ComponentPreview>

### New Component: Date Picker

<ComponentPreview name="date-picker-demo">

<div></div>

</ComponentPreview>

## November 2023

### New Component: Toggle Group

We've added a new component to the library, [Toggle Group](/docs/components/toggle-group).

<ComponentPreview name="toggle-group-demo">

<div></div>

</ComponentPreview>

## October 2023

We've added two new components to the library, [Command](/docs/components/command) & [Combobox](/docs/components/combobox). We've also made some updates to the `<Form.Label />` component that you'll want to be aware of.

### New Component: Command

Command is a component that allows you to create a command palette. It's built on top of [cmdk-sv](https://cmdk-sv.com), which is a Svelte port of [cmdk](https://cmdk.paco.me). The library is still in its infancy, but we're excited to see where it goes. If you notice any issues, please [open an issue](https://github.com/huntabyte/cmdk-sv) with the library.

<ComponentPreview name="command-dialog">

<div></div>

</ComponentPreview>

Be sure to check out the [Command](/docs/components/command) docs for more information.

### New Component: Combobox

Combobox is a combination of the `<Command />` & `<Popover />` components. It allows you to create a searchable dropdown menu.

<ComponentPreview name="combobox-demo">

<div></div>

</ComponentPreview>

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

## August 2023 - Transitions & More

### Transitions

To support both enter and exit transitions, we've had to move from `tailwindcss-animate` to [Svelte transitions](https://svelte.dev/docs/svelte-transition). You can still use the `tailwindcss-animate` if you'd like, but you won't have exit transitions on most components.

To get the updated transition support, be sure to upgrade to the latest version of `bits-ui`, which at the time of this writing is `0.5.0`.

We now provide a custom transition `flyAndScale` (thanks [@thomasglopes](https://twitter.com/thomasglopes)) which most components use. It's added to the `utils.ts` file when you `init` a new project.

#### Migration

If you're using `tailwindcss-animate` and want to migrate to the new transition system, you'll need to do the following:

Update your `utils.ts` file to include the `flyAndScale` transition:

```ts title="src/lib/utils.ts"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number]
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (
    style: Record<string, number | string | undefined>
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + key + ":" + style[key] + ";";
    }, "");
  };

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform:
          transform +
          "translate3d(" +
          x +
          "px, " +
          y +
          "px, 0) scale(" +
          scale +
          ")",
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};
```

Inside the components that use transitions/animations, you'll need to remove the animation classes and add the transition. Here's an example of the `AlertDialog.Content` component:

```svelte title="src/lib/components/ui/alert-dialog-content.svelte"
<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
  import * as AlertDialog from "./index.js";
  import { cn, flyAndScale } from "$lib/utils.js";

  type $$Props = AlertDialogPrimitive.ContentProps;

  let className: $$Props["class"] = undefined;
  export let transition: $$Props["transition"] = flyAndScale;
  export let transitionConfig: $$Props["transitionConfig"] = undefined;
  export { className as class };
</script>

<AlertDialog.Portal>
  <AlertDialog.Overlay />
  <AlertDialogPrimitive.Content
    {transition}
    {transitionConfig}
    class={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg  sm:rounded-lg md:w-full",
      className
    )}
    {...$$restProps}
  >
    <slot />
  </AlertDialogPrimitive.Content>
</AlertDialog.Portal>
```

If you're unsure which specific classes should be removed, you can reference the components in the [repo](https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/) to see the changes.

### Events

Previous, we were using the same syntax as [Melt UI](https://melt-ui.com) for events, as we were simply forwarding them. So you'd have to do `on:m-click` or `on:m-keydown`. While this isn't a huge deal, since we're using components, we decided we wanted to use the same syntax as you would for any other Svelte component. So now you can just do `on:click` or `on:keydown`.

Behind the scenes, we're redispatching the event, so the contents of the event are the same, but the syntax is a bit more familiar.

#### Migration

To migrate to the new event syntax, you'll need to update your components that are forwarding the `m-` events. Ensure you're on the latest version of `bits-ui` before doing so.
