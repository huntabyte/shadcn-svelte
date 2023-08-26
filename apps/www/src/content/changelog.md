---
title: Changelog
description: Latest updates and announcements.
---

<script>
	import { Steps } from '$components/docs'
</script>

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
        opacity: t
      });
    },
    easing: cubicOut
  };
};
```

Inside the components that use transitions/animations, you'll need to remove the animation classes and add the transition. Here's an example of the `AlertDialog.Content` component:

```svelte title="src/lib/components/ui/alert-dialog-content.svelte"
<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
  import * as AlertDialog from ".";
  import { cn, flyAndScale } from "$lib/utils";

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

If you're unsure which specific classes should be removed, you can reference the components in the [repo](https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/) to see the changes.

### Events

Previous, we were using the same syntax as [Melt UI](https://melt-ui.com) for events, as we were simply forwarding them. So you'd have to do `on:m-click` or `on:m-keydown`. While this isn't a huge deal, since we're using components, we decided we wanted to use the same syntax as you would for any other Svelte component. So now you can just do `on:click` or `on:keydown`.

Behind the scenes, we're redispatching the event, so the contents of the event are the same, but the syntax is a bit more familiar.

#### Migration

To migrate to the new event syntax, you'll need to update your components that are forwarding the `m-` events. Ensure you're on the latest version of `bits-ui` before doing so.
