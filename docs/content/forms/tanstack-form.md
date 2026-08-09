---
title: TanStack Form
description: Build headless, type-safe forms with TanStack Form and shadcn-svelte.
links:
  doc: https://tanstack.com/form/latest/docs/framework/svelte/guides/basic-concepts
  source: https://github.com/TanStack/form
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
</script>

[TanStack Form](https://tanstack.com/form) provides headless form state with a native Svelte API. Its field snippets fit directly around shadcn-svelte's `Field` and input components.

<ComponentPreview name="form-tanstack-demo" class="[&_.preview]:min-h-[520px]" />

## Installation

<PMInstall command="@tanstack/svelte-form zod" />

## Anatomy

```svelte showLineNumbers
<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";

  const form = createForm(() => ({
    defaultValues: { username: "" },
    onSubmit: ({ value }) => console.log(value),
  }));
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();
    form.handleSubmit();
  }}
>
  <form.Field name="username">
    {#snippet children(field)}
      <Input
        value={field.state.value}
        onblur={field.handleBlur}
        oninput={(event) => field.handleChange(event.currentTarget.value)}
      />
    {/snippet}
  </form.Field>
</form>
```

The examples use Zod through TanStack Form's Standard Schema support. Validation metadata lives at `field.state.meta`; render errors after the field is touched and use `data-invalid` and `aria-invalid` on the corresponding shadcn-svelte primitives.

## Input

<ComponentPreview name="form-tanstack-input" />

## Textarea

<ComponentPreview name="form-tanstack-textarea" />

## Select

<ComponentPreview name="form-tanstack-select" />

## Checkbox

<ComponentPreview name="form-tanstack-checkbox" />

## Radio group

<ComponentPreview name="form-tanstack-radiogroup" />

## Switch

<ComponentPreview name="form-tanstack-switch" />

## Dynamic arrays

Set `mode="array"` on a field and use `pushValue` and `removeValue` for dynamic entries. Nested names retain end-to-end value types.

<ComponentPreview name="form-tanstack-array" class="[&_.preview]:min-h-[620px]" />

## Complex form

<ComponentPreview name="form-tanstack-complex" class="[&_.preview]:min-h-[680px]" />

## Resetting

Call `form.reset()` to restore default values and field metadata.
