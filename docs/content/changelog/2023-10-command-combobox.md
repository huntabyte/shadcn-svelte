---
title: October 2023 - Command and Combobox
description: Command and Combobox in shadcn-svelte.
date: 2023-10-01
---

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
