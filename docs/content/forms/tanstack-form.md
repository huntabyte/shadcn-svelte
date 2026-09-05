---
title: TanStack Form
description: Build forms in Svelte using TanStack Form and Zod.
links:
  doc: https://tanstack.com/form
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import PMInstall from "$lib/components/pm-install.svelte";
</script>

This guide explores how to build forms using TanStack Form. You'll learn to create forms with the `<Field />` component, implement schema validation with Zod, handle errors, and ensure accessibility.

> This guide uses **TanStack Form v2 alpha** (`2.0.0-alpha.2`) with Zod 4. The alpha API differs from v1 and may change before stable release.

## Demo

We'll start by building the following form. It has a simple text input and a textarea. On submit, we'll validate the form data and display any errors.

> **Note:** For the purpose of this demo, we have intentionally disabled browser validation to show how schema validation and form errors work in TanStack Form. It is recommended to add basic browser validation in your production code.

<ComponentPreview name="form-tanstack-demo"
  class="[&_.preview]:min-h-[520px]"
/>

## Approach

This form leverages TanStack Form for powerful, headless form handling. We'll build our form using the `<Field />` component, which gives you **complete flexibility over the markup and styling**.

- Uses TanStack Form's `createForm` function for form state management.
- `form.Field` component with children snippet pattern for controlled inputs.
- `<Field />` components for building accessible forms.
- Client-side validation using Zod.
- Validation feedback next to each field.

## Installation

<PMInstall command="@tanstack/svelte-form@2.0.0-alpha.2 zod" />

These prereleases currently ship some extensionless declaration imports. Projects using TypeScript `NodeNext` resolution may need declaration-only patches; this repository applies them in `patches/`. Standard SvelteKit projects using `Bundler` resolution do not need those NodeNext compatibility patches.

## Anatomy

Here's a basic example of a form using TanStack Form with the `<Field />` component.

```svelte showLineNumbers
<form
  novalidate
  onsubmit={(event) => {
    event.preventDefault();
    form.handleSubmit();
  }}
>
  <Field.Group>
    <form.Field name="title">
      {#snippet children(field)}
        {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
        <Field.Field data-invalid={isInvalid}>
          <Field.Label for={field.name}>Bug Title</Field.Label>
          <Input
            id={field.name}
            name={field.name}
            value={field.value}
            onblur={field.handleBlur}
            oninput={(e) => field.handleChange(e.currentTarget.value)}
            aria-invalid={isInvalid}
            placeholder="Login button not working on mobile"
            autocomplete="off"
          />
          {#if isInvalid}
            <Field.Error errors={field.meta.errors} />
          {/if}
        </Field.Field>
      {/snippet}
    </form.Field>
  </Field.Group>
  <Button type="submit">Submit</Button>
</form>
```

## Form

### Create a schema

We'll start by defining the shape of our form using a Zod schema.

> TanStack Form accepts Zod and other Standard Schema validators directly.

```ts showLineNumbers
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});
```

### Set up the form

Use the `createForm` function from TanStack Form to create your form instance with Zod validation.

The validator uses `triggers: []` for submit-only validation. In v2, submission runs validators by default, regardless of their change and blur triggers.

```ts showLineNumbers
import { createForm } from "@tanstack/svelte-form";

const form = createForm(() => ({
  defaultValues: { title: "", description: "" },
  validators: [{ run: formSchema, triggers: [] }],
  onSubmit: ({ value }) => {
    console.log(value);
  },
}));
```

### Build the form

We can now build the form using the `form.Field` component from TanStack Form and the `<Field />` component.

The complete implementation is available in the **View Code** panel of the demo above.

The success toast uses a small Svelte component because Svelte Sonner accepts a component for its description. Save this next to the form as `form-submitted-values.svelte`:

```svelte showLineNumbers
<script lang="ts">
  let { value }: { value: unknown } = $props();
</script>

<pre
  class="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground"><code
    >{JSON.stringify(value, null, 2)}</code
  ></pre>
```

Pass it as `description: FormSubmittedValues` with `componentProps: { value }` in the toast options. The form's **View Code** panel shows the complete submission handler.

### Done

That's it. You now have a fully accessible form with client-side validation.

When you submit the form, the `onSubmit` function will be called with the validated form data. If the form data is invalid, TanStack Form will display the errors next to each field.

## Validation

### Client-side Validation

TanStack Form validates your form data using the Zod schema. These examples validate on submit; the array example also validates on blur. Add a `change` trigger for feedback as the user types.

### Validation Modes

TanStack Form supports different validation strategies through the `validators` option:

| Triggers     | Description                    |
| ------------ | ------------------------------ |
| `["change"]` | Validate on change and submit. |
| `["blur"]`   | Validate on blur and submit.   |
| `[]`         | Validate only on submit.       |

```ts showLineNumbers
const form = createForm(() => ({
  defaultValues: { title: "", description: "" },
  validators: [{ run: formSchema, triggers: ["change", "blur"] }],
}));
```

## Displaying Errors

Display errors next to the field using `<Field.Error />`. For styling and accessibility:

- Add the `data-invalid` prop to the `<Field.Field />` component.
- Add the `aria-invalid` prop to the form control such as `<Input />`, `<Select.Trigger />`, `<Checkbox />`, etc.

```svelte showLineNumbers
<form.Field name="title">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Field data-invalid={isInvalid}>
      <Field.Label for={field.name}>Bug Title</Field.Label>
      <Input
        id={field.name}
        name={field.name}
        value={field.value}
        onblur={field.handleBlur}
        oninput={(e) => field.handleChange(e.currentTarget.value)}
        aria-invalid={isInvalid}
        placeholder="Login button not working on mobile"
        autocomplete="off"
      />
      {#if isInvalid}
        <Field.Error errors={field.meta.errors} />
      {/if}
    </Field.Field>
  {/snippet}
</form.Field>
```

`field.value`, `field.meta`, and `field.errors` are reactive in Svelte snippets. V2 normalizes issues to objects with a `message`. The examples show errors with `field.meta.isTouched && field.meta.isInvalid` and pass `field.meta.errors` to `<Field.Error />`.

## Working with Different Field Types

### Input

- For input fields, use `field.value` and `field.handleChange` on the `<Input />` component.
- To show errors, add the `aria-invalid` prop to the `<Input />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-tanstack-input"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<form.Field name="username">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Field data-invalid={isInvalid}>
      <Field.Label for="form-tanstack-input-username">Username</Field.Label>
      <Input
        id="form-tanstack-input-username"
        name={field.name}
        value={field.value}
        onblur={field.handleBlur}
        oninput={(e) => field.handleChange(e.currentTarget.value)}
        aria-invalid={isInvalid}
        placeholder="shadcn"
        autocomplete="username"
      />
      <Field.Description>
        This is your public display name. Must be between 3 and 10 characters.
        Must only contain letters, numbers, and underscores.
      </Field.Description>
      {#if isInvalid}
        <Field.Error errors={field.meta.errors} />
      {/if}
    </Field.Field>
  {/snippet}
</form.Field>
```

### Textarea

- For textarea fields, use `field.value` and `field.handleChange` on the `<Textarea />` component.
- To show errors, add the `aria-invalid` prop to the `<Textarea />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-tanstack-textarea"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<form.Field name="about">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Field data-invalid={isInvalid}>
      <Field.Label for="form-tanstack-textarea-about"
        >More about you</Field.Label
      >
      <Textarea
        id="form-tanstack-textarea-about"
        name={field.name}
        value={field.value}
        onblur={field.handleBlur}
        oninput={(e) => field.handleChange(e.currentTarget.value)}
        aria-invalid={isInvalid}
        placeholder="I'm a software engineer..."
        class="min-h-[120px]"
      />
      <Field.Description>
        Tell us more about yourself. This will be used to help us personalize
        your experience.
      </Field.Description>
      {#if isInvalid}
        <Field.Error errors={field.meta.errors} />
      {/if}
    </Field.Field>
  {/snippet}
</form.Field>
```

### Select

- For select components, use `field.value` and `field.handleChange` on the `<Select.Root />` component.
- To show errors, add the `aria-invalid` prop to the `<Select.Trigger />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-tanstack-select"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<form.Field name="language">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Field orientation="responsive" data-invalid={isInvalid}>
      <Field.Content>
        <Field.Label for="form-tanstack-select-language"
          >Spoken Language</Field.Label
        >
        <Field.Description>
          For best results, select the language you speak.
        </Field.Description>
        {#if isInvalid}
          <Field.Error errors={field.meta.errors} />
        {/if}
      </Field.Content>
      <Select.Root
        name={field.name}
        value={field.value}
        onValueChange={field.handleChange}
        type="single"
      >
        <Select.Trigger
          id="form-tanstack-select-language"
          aria-invalid={isInvalid}
          class="min-w-[120px]"
        >
          {spokenLanguages.find((language) => language.value === field.value)
            ?.label ?? (field.value === "auto" ? "Auto" : "Select")}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="auto">Auto</Select.Item>
          <Select.Separator />
          {#each spokenLanguages as language (language.value)}
            <Select.Item value={language.value}>
              {language.label}
            </Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </Field.Field>
  {/snippet}
</form.Field>
```

### Checkbox

- For checkbox, use `field.value` and `field.handleChange` on the `<Checkbox />` component.
- To show errors, add the `aria-invalid` prop to the `<Checkbox />` component and the `data-invalid` prop to the `<Field.Field />` component.
- For checkbox arrays, use `<form.Field>` and TanStack Form's array helpers.
- Remember to add `data-slot="checkbox-group"` to the `<Field.Group />` component for proper styling and spacing.

<ComponentPreview name="form-tanstack-checkbox"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<form.Field name="tasks">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Group>
      <Field.Set data-invalid={isInvalid}>
        <Field.Legend variant="label">Tasks</Field.Legend>
        <Field.Description>
          Get notified when tasks you&apos;ve created have updates.
        </Field.Description>
        <Field.Group data-slot="checkbox-group">
          {#each tasks as task (task.id)}
            <Field.Field orientation="horizontal" data-invalid={isInvalid}>
              <Checkbox
                id={`form-tanstack-checkbox-${task.id}`}
                name={field.name}
                aria-invalid={isInvalid}
                checked={field.value.includes(task.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    field.pushValue(task.id);
                  } else {
                    const index = field.value.indexOf(task.id);
                    if (index > -1) {
                      field.removeValue(index);
                    }
                  }
                }}
              />
              <Field.Label
                for={`form-tanstack-checkbox-${task.id}`}
                class="font-normal"
              >
                {task.label}
              </Field.Label>
            </Field.Field>
          {/each}
        </Field.Group>
      </Field.Set>
      {#if isInvalid}
        <Field.Error errors={field.meta.errors} />
      {/if}
    </Field.Group>
  {/snippet}
</form.Field>
```

### Radio Group

- For radio groups, use `field.value` and `field.handleChange` on the `<RadioGroup.Root />` component.
- To show errors, add the `aria-invalid` prop to the `<RadioGroup.Item />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-tanstack-radiogroup"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<form.Field name="plan">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Set>
      <Field.Legend>Plan</Field.Legend>
      <Field.Description>
        You can upgrade or downgrade your plan at any time.
      </Field.Description>
      <RadioGroup.Root
        name={field.name}
        value={field.value}
        onValueChange={field.handleChange}
      >
        {#each plans as plan (plan.id)}
          <Field.Label for={`form-tanstack-radiogroup-${plan.id}`}>
            <Field.Field orientation="horizontal" data-invalid={isInvalid}>
              <Field.Content>
                <Field.Title>
                  {plan.title}
                </Field.Title>
                <Field.Description>
                  {plan.description}
                </Field.Description>
              </Field.Content>
              <RadioGroup.Item
                value={plan.id}
                id={`form-tanstack-radiogroup-${plan.id}`}
                aria-invalid={isInvalid}
              />
            </Field.Field>
          </Field.Label>
        {/each}
      </RadioGroup.Root>
      {#if isInvalid}
        <Field.Error errors={field.meta.errors} />
      {/if}
    </Field.Set>
  {/snippet}
</form.Field>
```

### Switch

- For switches, use `field.value` and `field.handleChange` on the `<Switch />` component.
- To show errors, add the `aria-invalid` prop to the `<Switch />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-tanstack-switch"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<form.Field name="twoFactor">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Field orientation="horizontal" data-invalid={isInvalid}>
      <Field.Content>
        <Field.Label for="form-tanstack-switch-twoFactor">
          Multi-factor authentication
        </Field.Label>
        <Field.Description>
          Enable multi-factor authentication to secure your account.
        </Field.Description>
        {#if isInvalid}
          <Field.Error errors={field.meta.errors} />
        {/if}
      </Field.Content>
      <Switch
        id="form-tanstack-switch-twoFactor"
        name={field.name}
        checked={field.value}
        onCheckedChange={field.handleChange}
        aria-invalid={isInvalid}
      />
    </Field.Field>
  {/snippet}
</form.Field>
```

### Complex Forms

Here is an example of a more complex form with multiple fields and validation.

<ComponentPreview name="form-tanstack-complex"
  class="[&_.preview]:min-h-[520px]"
/>

## Resetting the Form

Use `form.reset()` to reset the form to its default values.

```svelte showLineNumbers
<Button type="button" variant="outline" onclick={() => form.reset()}>
  Reset
</Button>
```

## Array Fields

TanStack Form provides powerful array field management with `<form.Field>`. This allows you to dynamically add, remove, and update array items with full validation support.

<ComponentPreview name="form-tanstack-array"
  class="[&_.preview]:min-h-[520px]"
/>

This example demonstrates managing multiple email addresses with array fields. Users can add up to 5 email addresses, remove individual addresses, and each address is validated independently.

### Array Field Structure

Use `<form.Field>` as the parent field to enable array field management. In alpha.2, the optimized `<form.ArrayField>` subscribes to length and structural changes, but does not refresh for metadata-only validation changes. These examples deliberately use the normal `<form.Field>`: it supports the same typed array helpers and keeps values and errors reactive. The same applies to checkbox arrays. No `mode` prop is needed in v2.

The keyed block remounts indexed fields when the array length changes. This avoids stale field instances after removing an item in alpha.2, while preserving the remaining values in the form store.

```svelte showLineNumbers
<form.Field name="emails">
  {#snippet children(field)}
    {@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
    <Field.Set class="gap-4">
      <Field.Legend variant="label">Email Addresses</Field.Legend>
      <Field.Description>
        Add up to 5 email addresses where we can contact you.
      </Field.Description>
      <Field.Group class="gap-4">
        {#key field.value.length}
          {#each field.value as _, index (index)}
            <form.Field name={`emails[${index}].address`}>
              {#snippet children(subField)}
                {@const isSubFieldInvalid =
                  subField.meta.isTouched && subField.meta.isInvalid}
                <Field.Field
                  orientation="horizontal"
                  data-invalid={isSubFieldInvalid}
                >
                  <Field.Content>
                    <InputGroup.Root>
                      <InputGroup.Input
                        id={`form-tanstack-array-email-${index}`}
                        name={subField.name}
                        value={subField.value}
                        onblur={subField.handleBlur}
                        oninput={(e) =>
                          subField.handleChange(e.currentTarget.value)}
                        aria-invalid={isSubFieldInvalid}
                        aria-label={`Email ${index + 1}`}
                        placeholder="name@example.com"
                        type="email"
                        autocomplete="email"
                      />
                      {#if field.value.length > 1}
                        <InputGroup.Addon align="inline-end">
                          <InputGroup.Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onclick={() => field.removeValue(index)}
                            aria-label={`Remove email ${index + 1}`}
                          >
                            <XIcon />
                          </InputGroup.Button>
                        </InputGroup.Addon>
                      {/if}
                    </InputGroup.Root>
                    {#if isSubFieldInvalid}
                      <Field.Error errors={subField.meta.errors} />
                    {/if}
                  </Field.Content>
                </Field.Field>
              {/snippet}
            </form.Field>
          {/each}
        {/key}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onclick={() => field.pushValue({ address: "" })}
          disabled={field.value.length >= 5}
        >
          Add Email Address
        </Button>
      </Field.Group>
      {#if isInvalid}
        <Field.Error errors={field.meta.errors} />
      {/if}
    </Field.Set>
  {/snippet}
</form.Field>
```

### Nested Fields

Access individual array items using bracket notation: `fieldName[index].propertyName`. This example uses `InputGroup` to display the remove button inline with the input.

### Adding Items

Use `field.pushValue(item)` to add items to an array field. You can disable the button when the array reaches its maximum length.

```svelte showLineNumbers
<Button
  type="button"
  onclick={() => field.pushValue({ address: "" })}
  disabled={field.value.length >= 5}
>
  Add Email Address
</Button>
```

### Removing Items

Use `field.removeValue(index)` to remove items from an array field. You can conditionally show the remove button only when there's more than one item.

```svelte showLineNumbers
{#if field.value.length > 1}
  <Button
    type="button"
    onclick={() => field.removeValue(index)}
    aria-label={`Remove email ${index + 1}`}
  >
    Remove
  </Button>
{/if}
```

### Array Validation

Validate array fields using Zod's array methods.

```ts showLineNumbers
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
});
```

Client-side validation improves the user experience. Validate submitted data again on the server before saving it.
