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

Each Formsnap component takes a `child` snippet which hands you the props it would have applied to its own element. You spread those props onto the matching `Field` component, so Formsnap handles the accessibility wiring and `Field` handles the rendering.

## Anatomy

Here's a basic example of a form field using Formsnap's components with the `Field` components.

```svelte showLineNumbers
<form method="POST" use:enhance>
  <Formsnap.Field {form} name="title">
    {#snippet children({ errors })}
      <Field.Field data-invalid={errors.length > 0}>
        <Formsnap.Control>
          {#snippet children({ props })}
            <Formsnap.Label>
              {#snippet child({ props })}
                <Field.Label {...props}>Bug Title</Field.Label>
              {/snippet}
            </Formsnap.Label>
            <Input {...props} bind:value={$formData.title} />
          {/snippet}
        </Formsnap.Control>
        <Formsnap.Description>
          {#snippet child({ props })}
            <Field.Description {...props}>
              Provide a concise title for your bug report.
            </Field.Description>
          {/snippet}
        </Formsnap.Description>
        <Formsnap.FieldErrors>
          {#snippet child({ props, errors })}
            <Field.Error
              {...props}
              errors={errors.map((message) => ({ message }))}
            />
          {/snippet}
        </Formsnap.FieldErrors>
      </Field.Field>
    {/snippet}
  </Formsnap.Field>
</form>
```

- `Formsnap.Field` scopes the form state for `title` to everything inside of it, and exposes the field's `errors`.
- `Formsnap.Control` provides the `props` that must be spread onto the form control.
- `Formsnap.Label`, `Formsnap.Description`, and `Formsnap.FieldErrors` use the `child` snippet to render `Field.Label`, `Field.Description`, and `Field.Error`.

## Installation

<Steps>

### Install the components

<PMAddComp name="field input textarea button" />

### Install the dependencies

<PMInstall command="formsnap sveltekit-superforms zod" />

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
  import * as Formsnap from "formsnap";
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

We can now build the form using Formsnap's components and the `Field` components.

```svelte title="src/routes/bug-report/bug-report-form.svelte" showLineNumbers
<script lang="ts">
  import * as Formsnap from "formsnap";
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
    <Formsnap.Field {form} name="title">
      {#snippet children({ errors })}
        <Field.Field data-invalid={errors.length > 0}>
          <Formsnap.Control>
            {#snippet children({ props })}
              <Formsnap.Label>
                {#snippet child({ props })}
                  <Field.Label {...props}>Bug Title</Field.Label>
                {/snippet}
              </Formsnap.Label>
              <Input
                {...props}
                bind:value={$formData.title}
                placeholder="Login button not working on mobile"
                autocomplete="off"
              />
            {/snippet}
          </Formsnap.Control>
          <Formsnap.Description>
            {#snippet child({ props })}
              <Field.Description {...props}>
                Provide a concise title for your bug report.
              </Field.Description>
            {/snippet}
          </Formsnap.Description>
          <Formsnap.FieldErrors>
            {#snippet child({ props, errors })}
              <Field.Error
                {...props}
                errors={errors.map((message) => ({ message }))}
              />
            {/snippet}
          </Formsnap.FieldErrors>
        </Field.Field>
      {/snippet}
    </Formsnap.Field>
    <Formsnap.Field {form} name="description">
      {#snippet children({ errors })}
        <Field.Field data-invalid={errors.length > 0}>
          <Formsnap.Control>
            {#snippet children({ props })}
              <Formsnap.Label>
                {#snippet child({ props })}
                  <Field.Label {...props}>Description</Field.Label>
                {/snippet}
              </Formsnap.Label>
              <Textarea
                {...props}
                bind:value={$formData.description}
                placeholder="I'm having an issue with the login button on mobile."
                class="min-h-24 resize-none"
              />
            {/snippet}
          </Formsnap.Control>
          <Formsnap.Description>
            {#snippet child({ props })}
              <Field.Description {...props}>
                Include steps to reproduce, expected behavior, and what
                actually happened.
              </Field.Description>
            {/snippet}
          </Formsnap.Description>
          <Formsnap.FieldErrors>
            {#snippet child({ props, errors })}
              <Field.Error
                {...props}
                errors={errors.map((message) => ({ message }))}
              />
            {/snippet}
          </Formsnap.FieldErrors>
        </Field.Field>
      {/snippet}
    </Formsnap.Field>
    <Field.Field orientation="horizontal">
      <Button type="submit">Submit</Button>
    </Field.Field>
  </Field.Group>
</form>
```

The `name`, `id`, and all accessibility attributes are applied to the input by spreading the `props` object from the `Formsnap.Control` component. The label is automatically associated with the input using the `for` attribute, and the description and errors are associated using `aria-describedby`.

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

Display errors next to the field using `Field.Error` inside of a `Formsnap.FieldErrors` component. For styling and accessibility:

- Add the `data-invalid` attribute to the `Field.Field` component using the `errors` from `Formsnap.Field`.
- Spread the `props` from `Formsnap.Control` onto the form control such as `Input`, `Select.Trigger`, `Checkbox`, etc. This applies the `aria-invalid` attribute for you.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Field {form} name="email">
  {#snippet children({ errors })}
    <Field.Field data-invalid={errors.length > 0}>
      <Formsnap.Control>
        {#snippet children({ props })}
          <Formsnap.Label>
            {#snippet child({ props })}
              <Field.Label {...props}>Email</Field.Label>
            {/snippet}
          </Formsnap.Label>
          <Input {...props} type="email" bind:value={$formData.email} />
        {/snippet}
      </Formsnap.Control>
      <Formsnap.FieldErrors>
        {#snippet child({ props, errors })}
          <Field.Error
            {...props}
            errors={errors.map((message) => ({ message }))}
          />
        {/snippet}
      </Formsnap.FieldErrors>
    </Field.Field>
  {/snippet}
</Formsnap.Field>
```

`Field.Error` expects an array of objects with a `message`, while Formsnap provides an array of strings, so we map the errors before passing them in.

## Working with Different Field Types

The following examples are all part of the same form. Each one spreads the `props` from `Formsnap.Control` onto the form control and uses the `child` snippets to render `Field` components.

<ComponentPreview name="form-formsnap-field-types">

<div></div>

</ComponentPreview>

### Input

- For input fields, spread `props` onto the `Input` component and bind to `$formData`.
- To show errors, add the `data-invalid` attribute to the `Field.Field` component.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Field {form} name="name">
  {#snippet children({ errors })}
    <Field.Field data-invalid={errors.length > 0}>
      <Formsnap.Control>
        {#snippet children({ props })}
          <Formsnap.Label>
            {#snippet child({ props })}
              <Field.Label {...props}>Name</Field.Label>
            {/snippet}
          </Formsnap.Label>
          <Input {...props} bind:value={$formData.name} />
        {/snippet}
      </Formsnap.Control>
      <Formsnap.FieldErrors>
        {#snippet child({ props, errors })}
          <Field.Error
            {...props}
            errors={errors.map((message) => ({ message }))}
          />
        {/snippet}
      </Formsnap.FieldErrors>
    </Field.Field>
  {/snippet}
</Formsnap.Field>
```

### Textarea

The `Textarea` works the same as the `Input`. Spread `props` onto it and bind to `$formData`.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Control>
  {#snippet children({ props })}
    <Textarea {...props} bind:value={$formData.about} />
  {/snippet}
</Formsnap.Control>
```

### Select

- Bind `$formData` to `value` on `Select.Root`, and pass `props.name` as the `name`.
- Spread the rest of `props` onto the `Select.Trigger` so the label and `aria` attributes are applied to the trigger.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Control>
  {#snippet children({ props })}
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
</Formsnap.Control>
```

### Checkbox

- For a single checkbox, bind `$formData` to `checked` on the `Checkbox` component.
- Use `orientation="horizontal"` on `Field.Field` to place the label next to the checkbox, and `Field.Content` to group the label and error.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Field {form} name="terms">
  {#snippet children({ errors })}
    <Field.Field orientation="horizontal" data-invalid={errors.length > 0}>
      <Formsnap.Control>
        {#snippet children({ props })}
          <Checkbox {...props} bind:checked={$formData.terms} />
          <Field.Content>
            <Formsnap.Label>
              {#snippet child({ props })}
                <Field.Label {...props} class="font-normal">
                  I accept the terms and conditions
                </Field.Label>
              {/snippet}
            </Formsnap.Label>
            <Formsnap.FieldErrors>
              {#snippet child({ props, errors })}
                <Field.Error
                  {...props}
                  errors={errors.map((message) => ({ message }))}
                />
              {/snippet}
            </Formsnap.FieldErrors>
          </Field.Content>
        {/snippet}
      </Formsnap.Control>
    </Field.Field>
  {/snippet}
</Formsnap.Field>
```

### Checkbox Group

For an array of values, use `Formsnap.Fieldset` with `Formsnap.Legend` to group the checkboxes, and a `Formsnap.ElementField` for each checkbox. Render `Field.Set` and `Field.Legend` using the `child` snippets.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Fieldset {form} name="notifications">
  {#snippet child({ props, errors })}
    <Field.Set {...props}>
      <Formsnap.Legend>
        {#snippet child({ props })}
          <Field.Legend variant="label" {...props}>Notifications</Field.Legend>
        {/snippet}
      </Formsnap.Legend>
      <Field.Group class="gap-3">
        {#each notifications as notification, i (notification.value)}
          <Formsnap.ElementField {form} name="notifications[{i}]">
            <Field.Field
              orientation="horizontal"
              data-invalid={errors.length > 0}
            >
              <Formsnap.Control>
                {#snippet children({ props })}
                  <Checkbox
                    {...props}
                    value={notification.value}
                    checked={$formData.notifications.includes(
                      notification.value
                    )}
                    onCheckedChange={(checked) =>
                      toggleNotification(notification.value, checked)}
                  />
                  <Formsnap.Label>
                    {#snippet child({ props })}
                      <Field.Label {...props} class="font-normal">
                        {notification.label}
                      </Field.Label>
                    {/snippet}
                  </Formsnap.Label>
                {/snippet}
              </Formsnap.Control>
            </Field.Field>
          </Formsnap.ElementField>
        {/each}
      </Field.Group>
      <Formsnap.FieldErrors>
        {#snippet child({ props, errors })}
          <Field.Error
            {...props}
            errors={errors.map((message) => ({ message }))}
          />
        {/snippet}
      </Formsnap.FieldErrors>
    </Field.Set>
  {/snippet}
</Formsnap.Fieldset>
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

- Use `Formsnap.Fieldset` and `Formsnap.Legend` to group the radio items.
- Bind `$formData` to `value` on `RadioGroup.Root` and give it the `name` of the field.
- Use a `Formsnap.Control` for each `RadioGroup.Item` and spread `props` onto it.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Fieldset {form} name="plan">
  {#snippet child({ props, errors })}
    <Field.Set {...props}>
      <Formsnap.Legend>
        {#snippet child({ props })}
          <Field.Legend variant="label" {...props}>Plan</Field.Legend>
        {/snippet}
      </Formsnap.Legend>
      <RadioGroup.Root bind:value={$formData.plan} name="plan">
        {#each plans as plan (plan.value)}
          <Field.Field
            orientation="horizontal"
            data-invalid={errors.length > 0}
          >
            <Formsnap.Control>
              {#snippet children({ props })}
                <RadioGroup.Item {...props} value={plan.value} />
                <Formsnap.Label>
                  {#snippet child({ props })}
                    <Field.Label {...props} class="font-normal">
                      {plan.label}
                    </Field.Label>
                  {/snippet}
                </Formsnap.Label>
              {/snippet}
            </Formsnap.Control>
          </Field.Field>
        {/each}
      </RadioGroup.Root>
      <Formsnap.FieldErrors>
        {#snippet child({ props, errors })}
          <Field.Error
            {...props}
            errors={errors.map((message) => ({ message }))}
          />
        {/snippet}
      </Formsnap.FieldErrors>
    </Field.Set>
  {/snippet}
</Formsnap.Fieldset>
```

### Switch

- Bind `$formData` to `checked` on the `Switch` component.
- Use `orientation="horizontal"` on `Field.Field` and put the label and description in a `Field.Content`.

```svelte showLineNumbers title="form.svelte"
<Formsnap.Field {form} name="marketing">
  {#snippet children({ errors })}
    <Field.Field orientation="horizontal" data-invalid={errors.length > 0}>
      <Formsnap.Control>
        {#snippet children({ props })}
          <Field.Content>
            <Formsnap.Label>
              {#snippet child({ props })}
                <Field.Label {...props}>Marketing emails</Field.Label>
              {/snippet}
            </Formsnap.Label>
            <Formsnap.Description>
              {#snippet child({ props })}
                <Field.Description {...props}>
                  Receive news, updates, and special offers.
                </Field.Description>
              {/snippet}
            </Formsnap.Description>
          </Field.Content>
          <Switch {...props} bind:checked={$formData.marketing} />
        {/snippet}
      </Formsnap.Control>
    </Field.Field>
  {/snippet}
</Formsnap.Field>
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
