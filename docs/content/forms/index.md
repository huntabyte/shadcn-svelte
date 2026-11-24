---
title: Formsnap
description: Build forms in SvelteKit using Formsnap, Superforms, and Zod.
links:
  doc: https://formsnap.dev
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
</script>

In this guide, we will take a look at building forms with [Formsnap](https://formsnap.dev), [Superforms](https://superforms.rocks), and [Zod](https://zod.dev). We'll cover building forms with the `Field` component, adding schema validation, error handling, accessibility, and more.

If you aren't familiar with Superforms and Formsnap, you should check out their documentation first, as this guide assumes you have a basic understanding of how they work together.

## Demo

We are going to build the following form. It has a simple text input and a textarea. On submit, we'll validate the form data and display any errors.

<ComponentPreview name="form-formsnap-demo">

<div></div>

</ComponentPreview>

## Approach

This form leverages Superforms for form state and validation, and Formsnap for wiring that state up to your markup. We'll build our form using the [Field](/docs/components/field) component, which gives you **complete flexibility over the markup and styling**.

- Uses Superforms' `superForm` function for form state management and client & server side validation.
- Formsnap's `Field`, `Control`, `Label`, `Description`, and `FieldErrors` components scope the form state to each field and apply the correct `id`, `name`, and `aria` attributes.
- `Field` components render the markup and styling.
- Schema validation using Zod or any other validation library supported by [Superforms](https://superforms.rocks/concepts/validation-libraries).

Formsnap's components hand you the props they would have applied to their own element through a `child` snippet, which you spread onto the matching `Field` component. Writing that out for every label, description, and error gets repetitive, so we'll wrap each pair in a small reusable `Form.*` component that you create once and use in every form.

## Anatomy

Here's a basic example of a form field using the `Form` components.

```svelte showLineNumbers
<form method="POST" use:enhance>
  <Form.Field {form} name="title">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Bug Title</Form.Label>
        <Input {...props} bind:value={$formData.title} />
      {/snippet}
    </Form.Control>
    <Form.Description
      >Provide a concise title for your bug report.</Form.Description
    >
    <Form.FieldErrors />
  </Form.Field>
</form>
```

- `Form.Field` wraps `Formsnap.Field` and `Field.Field`. It scopes the form state for `title` to everything inside of it and sets `data-invalid` when the field has errors.
- `Form.Control` is `Formsnap.Control`. It provides the `props` that must be spread onto the form control.
- `Form.Label`, `Form.Description`, and `Form.FieldErrors` wrap the matching Formsnap component and render `Field.Label`, `Field.Description`, and `Field.Error`.

## Installation

<Steps>

### Install the components

<PMAddComp name="field input textarea button" />

### Install the dependencies

<PMInstall command="formsnap sveltekit-superforms zod -D" />

### Create the form components

Create a `form` directory in `src/lib/components/ui` and add the files below. Each one wraps a Formsnap component together with its `Field` counterpart. You only need to create the ones you use.

#### Field

`Form.Field` wraps `Formsnap.Field` and `Field.Field`. It exposes the same snippet props as `Formsnap.Field` and accepts any `Field.Field` prop, such as `orientation`.

```svelte title="src/lib/components/ui/form/form-field.svelte" showLineNumbers
<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPath<T>"
>
  import { Field as FormsnapField, type FieldProps } from "formsnap";
  import { Field } from "$lib/components/ui/field/index.js";
  import type { WithoutChildren } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";
  import type { FormPath } from "sveltekit-superforms";

  let {
    ref = $bindable(null),
    form,
    name,
    children: childrenProp,
    ...restProps
  }: FieldProps<T, U> &
    WithoutChildren<ComponentProps<typeof Field>> = $props();
</script>

<FormsnapField {form} {name}>
  {#snippet children({ constraints, errors, tainted, value })}
    <Field bind:ref data-invalid={errors.length > 0 ? true : undefined} {...restProps}>
      {@render childrenProp?.({
        constraints,
        errors,
        tainted,
        value: value as T[U],
      })}
    </Field>
  {/snippet}
</FormsnapField>
```

#### Label

```svelte title="src/lib/components/ui/form/form-label.svelte" showLineNumbers
<script lang="ts">
  import { Label as FormsnapLabel, type LabelProps } from "formsnap";
  import { FieldLabel } from "$lib/components/ui/field/index.js";
  import type { WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    children,
    ...restProps
  }: WithoutChild<LabelProps> = $props();
</script>

<FormsnapLabel bind:ref {...restProps}>
  {#snippet child({ props })}
    <FieldLabel {...props}>
      {@render children?.()}
    </FieldLabel>
  {/snippet}
</FormsnapLabel>
```

#### Description

```svelte title="src/lib/components/ui/form/form-description.svelte" showLineNumbers
<script lang="ts">
  import {
    Description as FormsnapDescription,
    type DescriptionProps,
  } from "formsnap";
  import { FieldDescription } from "$lib/components/ui/field/index.js";
  import type { WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    children,
    ...restProps
  }: WithoutChild<DescriptionProps> = $props();
</script>

<FormsnapDescription bind:ref {...restProps}>
  {#snippet child({ props })}
    <FieldDescription {...props}>
      {@render children?.()}
    </FieldDescription>
  {/snippet}
</FormsnapDescription>
```

#### Field Errors

`Field.Error` expects an array of objects with a `message`, while Formsnap provides an array of strings, so this component maps the errors for you. It also keeps a container in the DOM when there are no errors. Formsnap needs it to link the errors to the form control with `aria-describedby`, and `Field.Error` alone doesn't render until there is an error.

```svelte title="src/lib/components/ui/form/form-field-errors.svelte" showLineNumbers
<script lang="ts">
  import {
    FieldErrors as FormsnapFieldErrors,
    type FieldErrorsProps,
  } from "formsnap";
  import { FieldError } from "$lib/components/ui/field/index.js";
  import type { WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    ...restProps
  }: WithoutChildrenOrChild<FieldErrorsProps> = $props();
</script>

<FormsnapFieldErrors bind:ref {...restProps}>
  {#snippet child({ props, errors })}
    <div {...props} class="contents">
      <FieldError
        role={undefined}
        errors={errors.map((message) => ({ message }))}
      />
    </div>
  {/snippet}
</FormsnapFieldErrors>
```

#### Fieldset

`Form.Fieldset` wraps `Formsnap.Fieldset` and `Field.Set`. Use it for fields that group multiple controls, such as radio groups and checkbox groups.

```svelte title="src/lib/components/ui/form/form-fieldset.svelte" showLineNumbers
<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPath<T>"
>
  import { Fieldset as FormsnapFieldset, type FieldsetProps } from "formsnap";
  import { FieldSet } from "$lib/components/ui/field/index.js";
  import type { WithoutChild } from "$lib/utils.js";
  import type { FormPath } from "sveltekit-superforms";

  let {
    ref = $bindable(null),
    form,
    name,
    children: childrenProp,
    ...restProps
  }: WithoutChild<FieldsetProps<T, U>> = $props();
</script>

<FormsnapFieldset bind:ref {form} {name} {...restProps}>
  {#snippet child({ props, constraints, errors, tainted, value })}
    <FieldSet {...props}>
      {@render childrenProp?.({ constraints, errors, tainted, value })}
    </FieldSet>
  {/snippet}
</FormsnapFieldset>
```

#### Legend

```svelte title="src/lib/components/ui/form/form-legend.svelte" showLineNumbers
<script lang="ts">
  import { Legend as FormsnapLegend, type LegendProps } from "formsnap";
  import { FieldLegend } from "$lib/components/ui/field/index.js";
  import type { WithoutChild } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    variant,
    children,
    ...restProps
  }: WithoutChild<LegendProps> & {
    variant?: ComponentProps<typeof FieldLegend>["variant"];
  } = $props();
</script>

<FormsnapLegend bind:ref {...restProps}>
  {#snippet child({ props })}
    <FieldLegend {variant} {...props}>
      {@render children?.()}
    </FieldLegend>
  {/snippet}
</FormsnapLegend>
```

#### Element Field

`Form.ElementField` wraps `Formsnap.ElementField` and `Field.Field`. Use it for each item of an array field, such as a checkbox group.

```svelte title="src/lib/components/ui/form/form-element-field.svelte" showLineNumbers
<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPathLeaves<T>"
>
  import {
    ElementField as FormsnapElementField,
    type ElementFieldProps,
  } from "formsnap";
  import { Field } from "$lib/components/ui/field/index.js";
  import type { WithoutChildren } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";
  import type { FormPathLeaves } from "sveltekit-superforms";

  let {
    ref = $bindable(null),
    form,
    name,
    children: childrenProp,
    ...restProps
  }: ElementFieldProps<T, U> &
    WithoutChildren<ComponentProps<typeof Field>> = $props();
</script>

<FormsnapElementField {form} {name}>
  {#snippet children({ constraints, errors, tainted, value })}
    <Field bind:ref data-invalid={errors.length > 0 ? true : undefined} {...restProps}>
      {@render childrenProp?.({
        constraints,
        errors,
        tainted,
        value: value as T[U],
      })}
    </Field>
  {/snippet}
</FormsnapElementField>
```

#### Index

`Form.Control` doesn't need a wrapper since it doesn't render any markup, so we re-export Formsnap's `Control` as is.

```ts title="src/lib/components/ui/form/index.ts" showLineNumbers
import { Control } from "formsnap";
import Description from "./form-description.svelte";
import ElementField from "./form-element-field.svelte";
import FieldErrors from "./form-field-errors.svelte";
import Field from "./form-field.svelte";
import Fieldset from "./form-fieldset.svelte";
import Label from "./form-label.svelte";
import Legend from "./form-legend.svelte";

export {
  Field,
  ElementField,
  Control,
  Label,
  Description,
  FieldErrors,
  Fieldset,
  Legend,
};
```

</Steps>

## Form

<Steps>

### Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev). We're going to define it in a file called `schema.ts` in the same directory as our page component, but you can put it anywhere you like.

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

export type FormSchema = typeof formSchema;
```

### Set up the load function

Use `superValidate` to create the initial form state and return it from the load function.

```ts title="src/routes/bug-report/+page.server.ts" showLineNumbers
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};
```

### Create the form component

We'll pass the `form` returned from the load function as a prop to this component. To ensure it's typed properly, we'll use the `SuperValidated` type from `sveltekit-superforms` and pass in the type of our form schema. Then we'll create the form instance with `superForm`, using `zod4Client` to validate on the client.

```svelte title="src/routes/bug-report/bug-report-form.svelte" showLineNumbers
<script lang="ts">
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { formSchema, type FormSchema } from "./schema";

  let { form: initialForm }: { form: SuperValidated<Infer<FormSchema>> } =
    $props();

  const form = superForm(initialForm, {
    validators: zod4Client(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <!-- Build the form here -->
</form>
```

### Build the form

We can now build the form using the `Form` components.

```svelte title="src/routes/bug-report/bug-report-form.svelte" showLineNumbers
<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { formSchema, type FormSchema } from "./schema";

  let { form: initialForm }: { form: SuperValidated<Infer<FormSchema>> } =
    $props();

  const form = superForm(initialForm, {
    validators: zod4Client(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Field.Group>
    <Form.Field {form} name="title">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Bug Title</Form.Label>
          <Input
            {...props}
            bind:value={$formData.title}
            placeholder="Login button not working on mobile"
            autocomplete="off"
          />
        {/snippet}
      </Form.Control>
      <Form.Description>
        Provide a concise title for your bug report.
      </Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="description">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Description</Form.Label>
          <Textarea
            {...props}
            bind:value={$formData.description}
            placeholder="I'm having an issue with the login button on mobile."
            class="min-h-24 resize-none"
          />
        {/snippet}
      </Form.Control>
      <Form.Description>
        Include steps to reproduce, expected behavior, and what actually
        happened.
      </Form.Description>
      <Form.FieldErrors />
    </Form.Field>
    <Field.Field orientation="horizontal">
      <Button type="submit">Submit</Button>
    </Field.Field>
  </Field.Group>
</form>
```

The `name`, `id`, and all accessibility attributes are applied to the input by spreading the `props` object from the `Form.Control` component. The label is automatically associated with the input using the `for` attribute, and the description and errors are associated using `aria-describedby`.

### Use the component

We'll pass the `form` from the data returned from the load function to the form component we created above.

```svelte title="src/routes/bug-report/+page.svelte" showLineNumbers
<script lang="ts">
  import type { PageData } from "./$types.js";
  import BugReportForm from "./bug-report-form.svelte";

  let { data }: { data: PageData } = $props();
</script>

<BugReportForm form={data.form} />
```

### Create an action

Finally, add an action to validate the form on the server. Always validate on the server, even if you also validate on the client.

```ts title="src/routes/bug-report/+page.server.ts" showLineNumbers
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    return {
      form,
    };
  },
};
```

### Done

That's it. You now have a fully accessible form with client & server side validation.

When you submit the form, Superforms validates the data against your schema. If the data is invalid, the errors are displayed next to each field.

</Steps>

## Validation

### Client-side Validation

Superforms validates your form data using the schema you give it. Pass a client validation adapter to the `validators` option of `superForm`.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  import { zod4Client } from "sveltekit-superforms/adapters";

  const form = superForm(initialForm, {
    validators: zod4Client(formSchema),
  });
</script>
```

### Server-side Validation

Always validate your data on the server using `superValidate` in your form action. You can use any validation library supported by [Superforms](https://superforms.rocks/concepts/validation-libraries) in place of Zod.

```ts showLineNumbers title="+page.server.ts"
export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(formSchema));
    if (!form.valid) return fail(400, { form });
    return { form };
  },
};
```

### Validation Modes

Use the `validationMethod` option to change when client-side validation runs. The default is `"auto"`.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  const form = superForm(initialForm, {
    validationMethod: "oninput",
    validators: zod4Client(formSchema),
  });
</script>
```

| Mode                           | Description                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------- |
| `"auto"`                       | Shows new errors on blur, and keeps existing errors up to date as the user types. |
| `"oninput"`                    | Validation triggers on every input.                                               |
| `"onblur"`                     | Validation triggers on blur.                                                      |
| `"onsubmit"` / `"submit-only"` | Skips validation while the user is editing, and validates on submit.              |

## Displaying Errors

Display errors next to the field using `Form.FieldErrors`. For styling and accessibility:

- `Form.Field` adds the `data-invalid` attribute to the underlying `Field.Field` whenever the field has errors.
- Spread the `props` from `Form.Control` onto the form control such as `Input`, `Select.Trigger`, `Checkbox`, etc. This applies the `aria-invalid` attribute for you.

```svelte showLineNumbers title="form.svelte"
<Form.Field {form} name="email">
  <Form.Control>
    {#snippet children({ props })}
      <Form.Label>Email</Form.Label>
      <Input {...props} type="email" bind:value={$formData.email} />
    {/snippet}
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
```

## Working with Different Field Types

The following examples are all part of the same form. Each one spreads the `props` from `Form.Control` onto the form control.

<ComponentPreview name="form-formsnap-field-types">

<div></div>

</ComponentPreview>

### Input

- For input fields, spread `props` onto the `Input` component and bind to `$formData`.
- To show errors, add a `Form.FieldErrors`.

```svelte showLineNumbers title="form.svelte"
<Form.Field {form} name="name">
  <Form.Control>
    {#snippet children({ props })}
      <Form.Label>Name</Form.Label>
      <Input {...props} bind:value={$formData.name} />
    {/snippet}
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
```

### Textarea

The `Textarea` works the same as the `Input`. Spread `props` onto it and bind to `$formData`.

```svelte showLineNumbers title="form.svelte"
<Form.Control>
  {#snippet children({ props })}
    <Textarea {...props} bind:value={$formData.about} />
  {/snippet}
</Form.Control>
```

### Select

- Bind `$formData` to `value` on `Select.Root`, and pass `props.name` as the `name`.
- Spread the rest of `props` onto the `Select.Trigger` so the label and `aria` attributes are applied to the trigger.

```svelte showLineNumbers title="form.svelte"
<Form.Control>
  {#snippet children({ props })}
    <Form.Label>Language</Form.Label>
    <Select.Root
      type="single"
      bind:value={$formData.language}
      name={props.name}
    >
      <Select.Trigger {...props}>
        <Select.Value placeholder="Select a language" />
      </Select.Trigger>
      <Select.Content>
        <!-- Select.Item components -->
      </Select.Content>
    </Select.Root>
  {/snippet}
</Form.Control>
```

### Checkbox

- For a single checkbox, bind `$formData` to `checked` on the `Checkbox` component.
- Use `orientation="horizontal"` on `Form.Field` to place the label next to the checkbox, and `Field.Content` to group the label and error.

```svelte showLineNumbers title="form.svelte"
<Form.Field {form} name="terms" orientation="horizontal">
  <Form.Control>
    {#snippet children({ props })}
      <Checkbox {...props} bind:checked={$formData.terms} />
      <Field.Content>
        <Form.Label class="font-normal">
          I accept the terms and conditions
        </Form.Label>
        <Form.FieldErrors />
      </Field.Content>
    {/snippet}
  </Form.Control>
</Form.Field>
```

### Checkbox Group

For an array of values, use `Form.Fieldset` with `Form.Legend` to group the checkboxes, and a `Form.ElementField` for each checkbox.

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset {form} name="notifications">
  <Form.Legend variant="label">Notifications</Form.Legend>
  <Field.Group class="gap-3">
    {#each notifications as notification, i (notification.value)}
      <Form.ElementField
        {form}
        name="notifications[{i}]"
        orientation="horizontal"
      >
        <Form.Control>
          {#snippet children({ props })}
            <Checkbox
              {...props}
              value={notification.value}
              checked={$formData.notifications.includes(notification.value)}
              onCheckedChange={(checked) =>
                toggleNotification(notification.value, checked)}
            />
            <Form.Label class="font-normal">{notification.label}</Form.Label>
          {/snippet}
        </Form.Control>
      </Form.ElementField>
    {/each}
  </Field.Group>
  <Form.FieldErrors />
</Form.Fieldset>
```

Add or remove the value from the array in the `onCheckedChange` handler:

```ts showLineNumbers title="form.svelte"
function toggleNotification(value: string, checked: boolean) {
  if (checked) {
    $formData.notifications = [...$formData.notifications, value];
  } else {
    $formData.notifications = $formData.notifications.filter(
      (item) => item !== value
    );
  }
}
```

### Radio Group

- Use `Form.Fieldset` and `Form.Legend` to group the radio items.
- Bind `$formData` to `value` on `RadioGroup.Root` and give it the `name` of the field.
- Use a `Form.Control` for each `RadioGroup.Item` and spread `props` onto it. The `errors` from `Form.Fieldset` can be used to set `data-invalid` on each `Field.Field`.

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset {form} name="plan">
  {#snippet children({ errors })}
    <Form.Legend variant="label">Plan</Form.Legend>
    <RadioGroup.Root bind:value={$formData.plan} name="plan">
      {#each plans as plan (plan.value)}
        <Field.Field orientation="horizontal" data-invalid={errors.length > 0 ? true : undefined}>
          <Form.Control>
            {#snippet children({ props })}
              <RadioGroup.Item {...props} value={plan.value} />
              <Form.Label class="font-normal">{plan.label}</Form.Label>
            {/snippet}
          </Form.Control>
        </Field.Field>
      {/each}
    </RadioGroup.Root>
    <Form.FieldErrors />
  {/snippet}
</Form.Fieldset>
```

### Switch

- Bind `$formData` to `checked` on the `Switch` component.
- Use `orientation="horizontal"` on `Form.Field` and put the label and description in a `Field.Content`.

```svelte showLineNumbers title="form.svelte"
<Form.Field {form} name="marketing" orientation="horizontal">
  <Form.Control>
    {#snippet children({ props })}
      <Field.Content>
        <Form.Label>Marketing emails</Form.Label>
        <Form.Description>
          Receive news, updates, and special offers.
        </Form.Description>
      </Field.Content>
      <Switch {...props} bind:checked={$formData.marketing} />
    {/snippet}
  </Form.Control>
</Form.Field>
```

## Resetting the Form

Use the `reset` function returned from `superForm` to reset the form to its initial state.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  const form = superForm(initialForm, {
    validators: zod4Client(formSchema),
  });

  const { form: formData, enhance, reset } = form;
</script>

<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
```

## Next Steps

Be sure to check out the [Formsnap](https://formsnap.dev) and [Superforms](https://superforms.rocks) documentation for more information on how to use them, and the [Field](/docs/components/field) component for more layout options.
