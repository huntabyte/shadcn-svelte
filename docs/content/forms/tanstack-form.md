---
title: TanStack Form
description: Build forms in Svelte using TanStack Form and Zod.
links:
  doc: https://tanstack.com/form
---

<script>
	import Callout from "$lib/components/callout.svelte";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
</script>

This guide explores how to build forms using [TanStack Form](https://tanstack.com/form). You'll learn to create forms with the `Field` component, implement schema validation with [Zod](https://zod.dev), handle errors, and ensure accessibility.

If you aren't familiar with TanStack Form, you should check out the [TanStack Form documentation](https://tanstack.com/form/latest/docs/framework/svelte/quick-start) first, as this guide assumes you have a basic understanding of how it works.

## Demo

We'll start by building the following form. It has a simple text input and a textarea. On submit, we'll validate the form data and display any errors.

<Callout>

**Note:** The browser runs its own validation before your form's submit handler. Inputs with native constraints, such as `type="email"`, show the browser's tooltip instead of your schema errors and `onSubmit` never runs. Add `novalidate` to the `<form>` when you want your schema to handle all validation, as the array example below does. It's still worth keeping basic browser validation in production code.

</Callout>

<ComponentPreview name="form-tanstack-demo">

<div></div>

</ComponentPreview>

## Approach

This form leverages TanStack Form for powerful, headless form handling. We'll build our form using the [Field](/docs/components/field) component, which gives you **complete flexibility over the markup and styling**.

- Uses TanStack Form's `createForm` function for form state management.
- `form.Field` component with the `children` snippet for controlled inputs.
- `Field` components for building accessible forms.
- Client-side validation using Zod or any other [Standard Schema](https://standardschema.dev) compatible library, such as Valibot or ArkType.
- Real-time validation feedback.

TanStack Form doesn't render any markup for you, so there are no wrapper components to create. You wire the field state to your inputs yourself.

## Anatomy

Here's a basic example of a form using TanStack Form with the `Field` component.

```svelte showLineNumbers
<form
  onsubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
  <Field.Group>
    <form.Field name="title">
      {#snippet children(field)}
        {@const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid}
        <Field.Field data-invalid={isInvalid ? true : undefined}>
          <Field.Label for={field.name}>Bug Title</Field.Label>
          <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onblur={field.handleBlur}
            oninput={(e) => field.handleChange(e.currentTarget.value)}
            aria-invalid={isInvalid}
            placeholder="Login button not working on mobile"
            autocomplete="off"
          />
          <Field.Description>
            Provide a concise title for your bug report.
          </Field.Description>
          {#if isInvalid}
            <Field.Error errors={field.state.meta.errors} />
          {/if}
        </Field.Field>
      {/snippet}
    </form.Field>
  </Field.Group>
  <Button type="submit">Submit</Button>
</form>
```

- `form.Field` scopes the state for `title` and passes it to the `children` snippet as `field`.
- `Field.Field` sets `data-invalid` when the field has errors, which styles the label and description.
- `field.name` or an explicit `id` is used for the `id` of the control and the label's `for` attribute so the label is associated with the input.
- `aria-invalid` is set on the form control so assistive technology announces the invalid state.
- `Field.Error` renders the field's errors.

## Installation

<Steps>

### Install the components

<PMAddComp name="field input textarea input-group button card" />

### Install the dependencies

<PMInstall command="@tanstack/svelte-form zod -D" />

</Steps>

## Form

<Steps>

### Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev). We're going to define it in a file called `schema.ts` next to our component, but you can put it anywhere you like.

```ts title="src/routes/bug-report/schema.ts" showLineNumbers
import { z } from "zod";

export const formSchema = z.object({
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

Use `createForm` to create the form instance. Pass in the default values, the schema as a validator, and an `onSubmit` handler. TanStack Form supports any [Standard Schema](https://standardschema.dev) library, so the Zod schema can be passed directly to `validators`.

```svelte title="src/routes/bug-report/+page.svelte" showLineNumbers
<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import { formSchema } from "./schema";

  const form = createForm(() => ({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
    },
  }));
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
  <!-- Build the form here -->
</form>
```

Calling `e.preventDefault()` stops the browser from submitting the form, and `form.handleSubmit()` validates the values and calls `onSubmit` when they're valid.

We are using `onSubmit` to validate the form data here. TanStack Form supports other validation modes, which you can read about in the [Validation](#validation) section below.

### Build the form

We can now build the form using the `form.Field` component from TanStack Form and the `Field` components.

```svelte title="src/routes/bug-report/+page.svelte" showLineNumbers
<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { formSchema } from "./schema";

  const form = createForm(() => ({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
    },
  }));
</script>

<Card.Root class="w-full sm:max-w-md">
  <Card.Header>
    <Card.Title>Bug Report</Card.Title>
    <Card.Description>
      Help us improve by reporting bugs you encounter.
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <form
      id="bug-report-form"
      onsubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Field.Group>
        <form.Field name="title">
          {#snippet children(field)}
            {@const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid}
            <Field.Field data-invalid={isInvalid ? true : undefined}>
              <Field.Label for={field.name}>Bug Title</Field.Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onblur={field.handleBlur}
                oninput={(e) => field.handleChange(e.currentTarget.value)}
                aria-invalid={isInvalid}
                placeholder="Login button not working on mobile"
                autocomplete="off"
              />
              {#if isInvalid}
                <Field.Error errors={field.state.meta.errors} />
              {/if}
            </Field.Field>
          {/snippet}
        </form.Field>
        <form.Field name="description">
          {#snippet children(field)}
            {@const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid}
            <Field.Field data-invalid={isInvalid ? true : undefined}>
              <Field.Label for={field.name}>Description</Field.Label>
              <InputGroup.Root>
                <InputGroup.Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onblur={field.handleBlur}
                  oninput={(e) => field.handleChange(e.currentTarget.value)}
                  placeholder="I'm having an issue with the login button on mobile."
                  rows={6}
                  class="min-h-24 resize-none"
                  aria-invalid={isInvalid}
                />
                <InputGroup.Addon align="block-end">
                  <InputGroup.Text class="tabular-nums">
                    {field.state.value.length}/100 characters
                  </InputGroup.Text>
                </InputGroup.Addon>
              </InputGroup.Root>
              <Field.Description>
                Include steps to reproduce, expected behavior, and what
                actually happened.
              </Field.Description>
              {#if isInvalid}
                <Field.Error errors={field.state.meta.errors} />
              {/if}
            </Field.Field>
          {/snippet}
        </form.Field>
      </Field.Group>
    </form>
  </Card.Content>
  <Card.Footer>
    <Field.Field orientation="horizontal">
      <Button type="button" variant="outline" onclick={() => form.reset()}>
        Reset
      </Button>
      <Button type="submit" form="bug-report-form">Submit</Button>
    </Field.Field>
  </Card.Footer>
</Card.Root>
```

The submit button lives outside the `<form>` in the card footer, so it uses the `form` attribute to point at the form by its `id`.

### Done

That's it. You now have a fully accessible form with client-side validation.

When you submit the form, the `onSubmit` function will be called with the validated form data. If the form data is invalid, TanStack Form will display the errors next to each field.

</Steps>

## Validation

### Client-side Validation

TanStack Form validates your form data using the validators you give it. Pass a Standard Schema, such as a Zod schema, to the `validators` option of `createForm`. Issues are matched to fields by their path, so each error appears on the right field.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { formSchema } from "./schema";

  const form = createForm(() => ({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
  }));
</script>
```

### Validation Modes

Choose when validation runs by picking the key you pass the schema to in `validators`. You can use more than one at a time.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  const form = createForm(() => ({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
      onBlur: formSchema,
    },
  }));
</script>
```

| Mode       | Description                                   |
| ---------- | --------------------------------------------- |
| `onChange` | Validation triggers on every change.          |
| `onBlur`   | Validation triggers on blur.                  |
| `onSubmit` | Validation triggers on submit.                |
| `onMount`  | Validation triggers when the form is mounted. |

Each mode also has an async variant, such as `onChangeAsync`, for validators that need to wait on a request. You can read more in the [TanStack Form validation guide](https://tanstack.com/form/latest/docs/framework/svelte/guides/validation).

### Field-level Validation

Validators can also be set on a single field with the `validators` prop of `form.Field`. Field-level validators accept a function or a Standard Schema.

```svelte showLineNumbers title="form.svelte"
<form.Field
  name="title"
  validators={{
    onChange: z.string().min(5, "Bug title must be at least 5 characters."),
  }}
>
  {#snippet children(field)}
    <!-- ... -->
  {/snippet}
</form.Field>
```

### Server-side Validation

TanStack Form validates on the client. Always validate your data again on the server, wherever you handle the submitted values, such as a SvelteKit form action, endpoint, or remote function. You can reuse the same Zod schema.

```ts showLineNumbers title="+server.ts"
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";
import { formSchema } from "../schema";

export const POST: RequestHandler = async ({ request }) => {
  const result = formSchema.safeParse(await request.json());
  if (!result.success) {
    return json({ errors: result.error.issues }, { status: 400 });
  }
  return json({ success: true });
};
```

## Displaying Errors

Display errors next to the field using `Field.Error`. For styling and accessibility:

- Add the `data-invalid` attribute to `Field.Field` whenever the field has errors.
- Add the `aria-invalid` attribute to the form control such as `Input`, `Select.Trigger`, `Checkbox`, etc.
- Only show errors once the field has been touched. `field.state.meta.isTouched` becomes `true` when the user changes or blurs the field, or when the form is submitted.

```svelte showLineNumbers title="form.svelte"
<form.Field name="email">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Field data-invalid={isInvalid ? true : undefined}>
      <Field.Label for={field.name}>Email</Field.Label>
      <Input
        id={field.name}
        name={field.name}
        type="email"
        value={field.state.value}
        onblur={field.handleBlur}
        oninput={(e) => field.handleChange(e.currentTarget.value)}
        aria-invalid={isInvalid}
      />
      {#if isInvalid}
        <Field.Error errors={field.state.meta.errors} />
      {/if}
    </Field.Field>
  {/snippet}
</form.Field>
```

`field.state.meta.errors` contains the issues returned by your validators. `Field.Error` reads the `message` from each one, so you can pass them in as is.

## Working with Different Field Types

### Input

- For input fields, set `value` from `field.state.value` and call `field.handleChange` in `oninput`.
- Call `field.handleBlur` in `onblur` so the field is marked as touched.
- To show errors, add the `aria-invalid` attribute to the `Input` component and the `data-invalid` attribute to the `Field.Field` component.

<ComponentPreview name="form-tanstack-input">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<form.Field name="username">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Field data-invalid={isInvalid ? true : undefined}>
      <Field.Label for="form-tanstack-input-username">Username</Field.Label>
      <Input
        id="form-tanstack-input-username"
        name={field.name}
        value={field.state.value}
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
        <Field.Error errors={field.state.meta.errors} />
      {/if}
    </Field.Field>
  {/snippet}
</form.Field>
```

### Textarea

- For textarea fields, set `value` from `field.state.value` and call `field.handleChange` in `oninput` on the `Textarea` component.
- To show errors, add the `aria-invalid` attribute to the `Textarea` component and the `data-invalid` attribute to the `Field.Field` component.

<ComponentPreview name="form-tanstack-textarea">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<form.Field name="about">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Field data-invalid={isInvalid ? true : undefined}>
      <Field.Label for="form-tanstack-textarea-about"
        >More about you</Field.Label
      >
      <Textarea
        id="form-tanstack-textarea-about"
        name={field.name}
        value={field.state.value}
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
        <Field.Error errors={field.state.meta.errors} />
      {/if}
    </Field.Field>
  {/snippet}
</form.Field>
```

### Select

- For select components, set `value` on `Select.Root` from `field.state.value` and call `field.handleChange` in `onValueChange`. Pass `field.name` as the `name`.
- To show errors, add the `aria-invalid` attribute to the `Select.Trigger` component and the `data-invalid` attribute to the `Field.Field` component.

<ComponentPreview name="form-tanstack-select">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<form.Field name="language">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Field
      orientation="responsive"
      data-invalid={isInvalid ? true : undefined}
    >
      <Field.Content>
        <Field.Label for="form-tanstack-select-language">
          Spoken Language
        </Field.Label>
        <Field.Description>
          For best results, select the language you speak.
        </Field.Description>
        {#if isInvalid}
          <Field.Error errors={field.state.meta.errors} />
        {/if}
      </Field.Content>
      <Select.Root
        type="single"
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        <Select.Trigger
          id="form-tanstack-select-language"
          aria-invalid={isInvalid}
          onblur={field.handleBlur}
          class="min-w-[120px]"
        >
          <Select.Value placeholder="Select" />
        </Select.Trigger>
        <Select.Content>
          <!-- Select.Item components -->
        </Select.Content>
      </Select.Root>
    </Field.Field>
  {/snippet}
</form.Field>
```

### Checkbox

- For a single checkbox, set `checked` from `field.state.value` and call `field.handleChange` in `onCheckedChange`.
- To show errors, add the `aria-invalid` attribute to the `Checkbox` component and the `data-invalid` attribute to the `Field.Field` component.
- For checkbox arrays, use `mode="array"` on the `form.Field` component and TanStack Form's array helpers.
- Remember to add `data-slot="checkbox-group"` to the `Field.Group` component for proper styling and spacing.

<ComponentPreview name="form-tanstack-checkbox">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<form.Field name="tasks" mode="array">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Set data-invalid={isInvalid ? true : undefined}>
      <Field.Legend variant="label">Tasks</Field.Legend>
      <Field.Description>
        Get notified when tasks you've created have updates.
      </Field.Description>
      <Field.Group data-slot="checkbox-group">
        {#each tasks as task (task.id)}
          <Field.Field
            orientation="horizontal"
            data-invalid={isInvalid ? true : undefined}
          >
            <Checkbox
              id="form-tanstack-checkbox-{task.id}"
              name={field.name}
              aria-invalid={isInvalid}
              checked={field.state.value.includes(task.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.pushValue(task.id);
                } else {
                  const index = field.state.value.indexOf(task.id);
                  if (index > -1) {
                    field.removeValue(index);
                  }
                }
              }}
            />
            <Field.Label
              for="form-tanstack-checkbox-{task.id}"
              class="font-normal"
            >
              {task.label}
            </Field.Label>
          </Field.Field>
        {/each}
      </Field.Group>
      {#if isInvalid}
        <Field.Error errors={field.state.meta.errors} />
      {/if}
    </Field.Set>
  {/snippet}
</form.Field>
```

### Radio Group

- For radio groups, set `value` on `RadioGroup.Root` from `field.state.value` and call `field.handleChange` in `onValueChange`.
- To show errors, add the `aria-invalid` attribute to the `RadioGroup.Item` component and the `data-invalid` attribute to the `Field.Field` component.
- Give each `RadioGroup.Item` an `id` and match it with the `for` of its `Field.Label`. Wrapping the `Field.Field` in the label makes the whole card clickable.

<ComponentPreview name="form-tanstack-radiogroup">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<form.Field name="plan">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Set>
      <Field.Legend>Plan</Field.Legend>
      <Field.Description>
        You can upgrade or downgrade your plan at any time.
      </Field.Description>
      <RadioGroup.Root
        name={field.name}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        {#each plans as plan (plan.id)}
          <Field.Label for="form-tanstack-radiogroup-{plan.id}">
            <Field.Field
              orientation="horizontal"
              data-invalid={isInvalid ? true : undefined}
            >
              <Field.Content>
                <Field.Title>{plan.title}</Field.Title>
                <Field.Description>{plan.description}</Field.Description>
              </Field.Content>
              <RadioGroup.Item
                value={plan.id}
                id="form-tanstack-radiogroup-{plan.id}"
                aria-invalid={isInvalid}
              />
            </Field.Field>
          </Field.Label>
        {/each}
      </RadioGroup.Root>
      {#if isInvalid}
        <Field.Error errors={field.state.meta.errors} />
      {/if}
    </Field.Set>
  {/snippet}
</form.Field>
```

### Switch

- For switches, set `checked` from `field.state.value` and call `field.handleChange` in `onCheckedChange`.
- To show errors, add the `aria-invalid` attribute to the `Switch` component and the `data-invalid` attribute to the `Field.Field` component.

<ComponentPreview name="form-tanstack-switch">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<form.Field name="twoFactor">
  {#snippet children(field)}
    {@const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid}
    <Field.Field
      orientation="horizontal"
      data-invalid={isInvalid ? true : undefined}
    >
      <Field.Content>
        <Field.Label for="form-tanstack-switch-twoFactor">
          Multi-factor authentication
        </Field.Label>
        <Field.Description>
          Enable multi-factor authentication to secure your account.
        </Field.Description>
        {#if isInvalid}
          <Field.Error errors={field.state.meta.errors} />
        {/if}
      </Field.Content>
      <Switch
        id="form-tanstack-switch-twoFactor"
        name={field.name}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        aria-invalid={isInvalid}
      />
    </Field.Field>
  {/snippet}
</form.Field>
```

### Complex Forms

Here is an example of a more complex form with multiple fields and validation.

<ComponentPreview name="form-tanstack-complex">

<div></div>

</ComponentPreview>

## Submit State

Use `form.Subscribe` to react to the form's state, such as disabling the submit button while the form is submitting.

```svelte showLineNumbers title="form.svelte"
<form.Subscribe selector={(state) => ({ isSubmitting: state.isSubmitting })}>
  {#snippet children(state)}
    <Button type="submit" disabled={state.isSubmitting}>
      {state.isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  {/snippet}
</form.Subscribe>
```

## Resetting the Form

Use `form.reset()` to reset the form to its default values.

```svelte showLineNumbers title="form.svelte"
<Button type="button" variant="outline" onclick={() => form.reset()}>
  Reset
</Button>
```

## Array Fields

TanStack Form provides powerful array field management with `mode="array"`. This allows you to dynamically add, remove, and update array items with full validation support.

<ComponentPreview name="form-tanstack-array">

<div></div>

</ComponentPreview>

This example demonstrates managing multiple email addresses with array fields. Users can add up to 5 email addresses, remove individual addresses, and each address is validated independently. The form has `novalidate` set so the schema, not the browser, reports invalid email addresses.

### Array Field Structure

Use `mode="array"` on the parent field to enable array field management.

```svelte showLineNumbers title="form.svelte"
<form.Field name="emails" mode="array">
  {#snippet children(field)}
    <Field.Set>
      <Field.Legend variant="label">Email Addresses</Field.Legend>
      <Field.Description>
        Add up to 5 email addresses where we can contact you.
      </Field.Description>
      <Field.Group>
        {#each field.state.value as _, index (index)}
          <!-- Nested field for each array item -->
        {/each}
      </Field.Group>
    </Field.Set>
  {/snippet}
</form.Field>
```

### Nested Fields

Access individual array items using bracket notation: `fieldName[index].propertyName`. This example uses `InputGroup` to display the remove button inline with the input.

```svelte showLineNumbers title="form.svelte"
<form.Field name={`emails[${index}].address`}>
  {#snippet children(subField)}
    {@const isSubFieldInvalid =
      subField.state.meta.isTouched && !subField.state.meta.isValid}
    <Field.Field
      orientation="horizontal"
      data-invalid={isSubFieldInvalid ? true : undefined}
    >
      <Field.Content>
        <InputGroup.Root>
          <InputGroup.Input
            id="form-tanstack-array-email-{index}"
            name={subField.name}
            value={subField.state.value}
            onblur={subField.handleBlur}
            oninput={(e) => subField.handleChange(e.currentTarget.value)}
            aria-invalid={isSubFieldInvalid}
            placeholder="name@example.com"
            type="email"
          />
          {#if field.state.value.length > 1}
            <InputGroup.Addon align="inline-end">
              <InputGroup.Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onclick={() => field.removeValue(index)}
                aria-label="Remove email {index + 1}"
              >
                <XIcon />
              </InputGroup.Button>
            </InputGroup.Addon>
          {/if}
        </InputGroup.Root>
        {#if isSubFieldInvalid}
          <Field.Error errors={subField.state.meta.errors} />
        {/if}
      </Field.Content>
    </Field.Field>
  {/snippet}
</form.Field>
```

### Adding Items

Use `field.pushValue(item)` to add items to an array field. You can disable the button when the array reaches its maximum length.

```svelte showLineNumbers title="form.svelte"
<Button
  type="button"
  variant="outline"
  size="sm"
  onclick={() => field.pushValue({ address: "" })}
  disabled={field.state.value.length >= 5}
>
  Add Email Address
</Button>
```

### Removing Items

Use `field.removeValue(index)` to remove items from an array field. You can conditionally show the remove button only when there's more than one item.

```svelte showLineNumbers title="form.svelte"
{#if field.state.value.length > 1}
  <InputGroup.Button
    type="button"
    onclick={() => field.removeValue(index)}
    aria-label="Remove email {index + 1}"
  >
    <XIcon />
  </InputGroup.Button>
{/if}
```

### Array Validation

Validate array fields using Zod's array methods.

```ts showLineNumbers title="schema.ts"
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.email("Enter a valid email address."),
      })
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
});
```

## Next Steps

Be sure to check out the [TanStack Form](https://tanstack.com/form/latest/docs/framework/svelte/quick-start) documentation for more information on how to use it, and the [Field](/docs/components/field) component for more layout options.
