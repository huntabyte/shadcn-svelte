---
title: Toast
description: Stacked notifications with actions and promise states.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/toast
  doc: https://svelte-sonner.vercel.app/
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="toast-demo"><div></div></ComponentPreview>

## About this exploration

This is a draft adaptation of [shadcn/ui's Base UI Toast](https://ui.shadcn.com/docs/components/base/toast), built on [svelte-sonner](https://github.com/wobsoriano/svelte-sonner). It matches the stacked layout, status icons, actions, bottom-right viewport, and manager-style calls. Sonner provides measurement, dismissal, timers, hover pausing, swiping, and keyboard focus. The existing [Sonner component](/docs/components/sonner) remains available independently.

## Installation

<PMAddComp name="toast" />

Add the viewport once in your application layout:

```svelte title="+layout.svelte"
<script lang="ts">
  import { Toaster } from "$lib/components/ui/toast/index.js";
  let { children } = $props();
</script>

<Toaster />
{@render children?.()}
```

## Usage

```ts
import { toast } from "$lib/components/ui/toast/index.js";

const id = toast.add({
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
  actionProps: { children: "Undo", onclick: () => toast.close(id) },
});
```

Use `toast.update(id, options)` to update a notification and `toast.close(id)` to dismiss it. `toast.close()` closes notifications belonging to that manager. `timeout: 0` keeps a toast open until dismissed. The viewport defaults to a 5,000 ms timeout and three visible notifications. Loading notifications stay open until updated or dismissed. Actions run their handler without automatically closing the toast.

## Types

<ComponentPreview name="toast-types"><div></div></ComponentPreview>

## Promise

<ComponentPreview name="toast-promise"><div></div></ComponentPreview>

```ts
await toast.promise(saveEvent(), {
  loading: "Creating event...",
  success: "Event created",
  error: "Could not create event",
});
```

`promise` returns the task's result and rethrows errors. Success and error messages can also be functions returning strings or toast options. Handle rejected tasks as you would any other promise.

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

Managers isolate IDs, updates, and dismissal. `onClose` runs once after manual dismissal, swiping, or expiration. Use `priority: "high"` for an assertive announcement. Press F6 to focus the notification viewport. Motion respects `prefers-reduced-motion`.

## Remaining primitive differences

This adapter implements the stacked manager API, rather than the complete Base UI composition API. It does not expose `Provider`, `Portal`, `Viewport`, `Root`, `Title`, `Description`, `Action`, `Close`, `useToastManager`, anchored toasts, or render-function slots. Toast text and action labels are strings. Positioning is deliberately fixed to the canonical stacked viewport.

Sonner removes exiting notifications after 200 ms, so dismissal transitions use 200 ms instead of Base UI's 500 ms. Stack movement retains the canonical 500 ms easing. Sonner's visible-toast limit hides overflow notifications rather than exposing Base UI's limited-state API.

Sonner supplies the live-region and focus behavior, including its Escape handling; this does not reproduce Base UI's focus restoration contract. Hidden stack entries use visibility rather than Base UI's `inert` mechanism. The animation selectors depend on Sonner 1.2.1's data attributes and measurement variables, so dependency upgrades need browser verification.
