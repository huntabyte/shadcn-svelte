---
title: Formisch
description: Build type-safe forms with Formisch, Valibot, and shadcn-svelte.
links:
  doc: https://formisch.dev/guides/svelte/get-started/
  source: https://github.com/open-circle/formisch
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
</script>

[Formisch](https://formisch.dev) is a schema-first form library for Svelte. This guide combines its runes and render components with shadcn-svelte's accessible `Field` primitives.

<ComponentPreview name="form-formisch-demo" class="[&_.preview]:min-h-[640px]" />

## Installation

<PMInstall command="@formisch/svelte valibot" />

## Anatomy

Define a Valibot schema, create the form, then connect each Formisch field to a shadcn-svelte control.

```svelte showLineNumbers
<script lang="ts">
  import * as v from "valibot";
  import { createForm, Field as FormischField, Form } from "@formisch/svelte";

  const schema = v.object({ username: v.pipe(v.string(), v.minLength(3)) });
  const form = createForm({ schema, initialInput: { username: "" } });
</script>

<Form of={form} onsubmit={(output) => console.log(output)}>
  <FormischField of={form} path={["username"]}>
    {#snippet children(field)}
      <Input {...field.props} value={field.input ?? ""} />
    {/snippet}
  </FormischField>
</Form>
```

Formisch supplies native input props through `field.props`. For controlled components such as `Select`, `Checkbox`, and `Switch`, pass their value to `field.onInput`. Surface `field.errors` with `Field.Error` and mark the surrounding field invalid.

## Input

<ComponentPreview name="form-formisch-input" />

## Textarea

<ComponentPreview name="form-formisch-textarea" />

## Select

<ComponentPreview name="form-formisch-select" />

## Checkbox

<ComponentPreview name="form-formisch-checkbox" />

## Radio group

<ComponentPreview name="form-formisch-radiogroup" />

## Switch

<ComponentPreview name="form-formisch-switch" />

## Dynamic arrays

Use `FieldArray` with `insert` and `remove` to keep array state, validation, and stable item identity together.

<ComponentPreview name="form-formisch-array" class="[&_.preview]:min-h-[620px]" />

## Complex form

The same field contract composes across radio groups, switches, and checkbox collections.

<ComponentPreview name="form-formisch-complex" class="[&_.preview]:min-h-[720px]" />

## Resetting

Call `reset(form)` to restore the initial input and clear interaction state.
