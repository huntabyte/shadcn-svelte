---
title: Toast
description: A succinct message that is displayed temporarily.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/toast
  doc: https://base-ui.com/react/components/toast
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="toast-demo" previewClassName="h-72 min-h-0" class="rounded-2xl"><div></div></ComponentPreview>

## Installation

<PMAddComp name="toast" />

Add the Toaster once in your application layout:

```svelte title="+layout.svelte"
<script lang="ts">
  import { Toaster } from "$lib/components/ui/toast/index.js";
  let { children } = $props();
</script>

{@render children?.()}
<Toaster />
```

## Usage

```ts
import { toast } from "$lib/components/ui/toast/index.js";

toast.add({
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
});
```

## Types

The built-in renderer recognizes `success`, `info`, `warning`, `error`, and `loading`. Custom type names can be used in your own renderer.

<ComponentPreview name="toast-types" previewClassName="h-72 min-h-0" class="rounded-2xl"><div></div></ComponentPreview>

## Action

Pass button props with `actionProps`. An action runs its handler without automatically dismissing the toast.

```ts
const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onclick() {
      toast.close(id);
    },
  },
});
```

## Promise

Use `toast.promise` to update one toast as a task moves through loading, success, and error states.

<ComponentPreview name="toast-promise" previewClassName="h-72 min-h-0" class="rounded-2xl"><div></div></ComponentPreview>

```ts
await toast.promise(saveEvent(), {
  loading: "Creating event…",
  success: "Event created.",
  error: "Could not create event.",
});
```

Success and error messages may be functions returning a string or toast options. The returned promise preserves the task's result or rejection. Loading toasts do not expire. Settlement restores the provider timeout unless a different timeout is supplied.

## Rich content

Titles, descriptions, and action labels accept Svelte snippets as well as text.

<ComponentPreview name="toast-rich-content"><div></div></ComponentPreview>

## Lifecycle and scoped managers

<ComponentPreview name="toast-exploration"><div></div></ComponentPreview>

```svelte
<script lang="ts">
  import {
    createToastManager,
    Toaster,
  } from "$lib/components/ui/toast/index.js";
  const local = createToastManager();
</script>

<Toaster toastManager={local} timeout={5000} limit={3} />
<button onclick={() => local.add({ title: "Scoped notification" })}
  >Notify</button
>
```

`toast.update(id, options)` accepts an object or a function receiving the previous toast. `toast.add` with an existing ID updates in place and refreshes its timer. `toast.close(id)` dismisses one toast; `toast.close()` dismisses all toasts in that provider. `timeout: 0` prevents automatic dismissal. `onClose` fires when dismissal starts; `onRemove` fires after exit animations finish. The manager does not retain notifications emitted before a provider subscribes.

The default timeout is 5,000 ms and the visible limit is three. Older entries receive `data-limited` and are inert until a visible slot becomes available. Timers pause during hover, keyboard focus, and loss of window focus. Press F6 to focus and expand the viewport; Escape dismisses the focused toast. Keyboard dismissal moves focus to another toast or restores the previous element. The default swipe directions are down and right, with a 40 px dismissal threshold, directional damping, axis locking, and reversal cancellation. Motion respects `prefers-reduced-motion`.

## Composition

This is a Svelte port of [shadcn/ui's Base UI toast (#11266)](https://github.com/shadcn-ui/ui/pull/11266), including all of its exported composition parts: `ToastProvider`, `ToastPortal`, `ToastViewport`, `Toast`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, and `ToastClose`. `useToastManager()` accesses the nearest provider and exposes a reactive `toasts` getter and its manager methods.

Build a custom list inside a child component of `ToastProvider`:

```svelte
<script lang="ts">
  import {
    Toast,
    ToastContent,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    useToastManager,
  } from "$lib/components/ui/toast/index.js";
  const manager = useToastManager();
</script>

{#each manager.toasts as item (item.id)}
  <Toast toast={item}>
    <ToastContent>
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastAction />
      <ToastClose />
    </ToastContent>
  </Toast>
{/each}
```

Each DOM part supports a `child` snippet for custom rendering and a bindable `ref`. Spread the supplied `props` onto your element; they carry the accessibility attributes, event handlers, and Svelte attachments for measurements and gestures. This is the Svelte equivalent of Base UI's React `render` prop.

```svelte
<Toast toast={item} swipeDirection={["left", "right"]}>
  {#snippet child({ props, state })}
    <div {...props} data-custom-expanded={state.expanded}>
      <ToastContent><ToastTitle /><ToastClose /></ToastContent>
    </div>
  {/snippet}
</Toast>
```

The store and gestures are adapted from Base UI's MIT-licensed source. Styling, stacking variables, status icons, demo content, and 500 ms exit transitions follow shadcn/ui. The existing [Sonner component](/docs/components/sonner) remains available separately.
