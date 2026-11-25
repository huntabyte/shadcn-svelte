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

This form leverages TanStack Form for form state and validation, and a small set of `Form.*` components for wiring that state up to your markup. We'll build our form using the [Field](/docs/components/field) component, which gives you **complete flexibility over the markup and styling**.

- Uses TanStack Form's `createForm` function for form state management and client side validation.
- `Form.Field` scopes the field state to each field. `Form.Control`, `Form.Label`, `Form.Description`, and `Form.FieldErrors` apply the correct `id` and `aria` attributes.
- `Field` components render the markup and styling.
- Schema validation using Zod or any other [Standard Schema](https://standardschema.dev) compatible library, such as Valibot or ArkType.
- TanStack Form is fully typed. Field names and values are inferred from your default values.

TanStack Form's `form.Field` is headless. It hands you a `field` with its `state` and `handleChange`, and leaves the `id`, `aria` attributes, and error display to you. Wiring those up to a label, a description, and an error for every field gets repetitive, so we'll build a few small reusable `Form.*` components that you create once and use in every form.

## Anatomy

Here's a basic example of a form field using the `Form` components.

```svelte showLineNumbers
<form
  onsubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
  <Field.Group>
    <Form.Field of={form} name="title">
      {#snippet children(field)}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Bug Title</Form.Label>
            <Input
              {...props}
              bind:value={() => field.state.value, field.handleChange}
            />
          {/snippet}
        </Form.Control>
        <Form.Description>
          Provide a concise title for your bug report.
        </Form.Description>
        <Form.FieldErrors />
      {/snippet}
    </Form.Field>
  </Field.Group>
  <Button type="submit">Submit</Button>
</form>
```

- `Form.Field` wraps `Field.Field` and scopes the field state for `title` to everything inside of it. It sets `data-invalid` when the field has errors and passes the typed `field`, with its `state`, `handleChange`, and `handleBlur`, to its children. The `name` is checked against your default values.
- `Form.Control` provides the `props` that must be spread onto the form control: the `id`, `name`, `onblur`, `aria-invalid`, and `aria-describedby`.
- `Form.Label`, `Form.Description`, and `Form.FieldErrors` render `Field.Label`, `Field.Description`, and `Field.Error` and link them to the form control. `Form.FieldErrors` only renders once the field is invalid.
- `Form.Legend` is `Field.Legend`, used to label a `Form.Fieldset`.
- The control's value is bound to the field with a [function binding](https://svelte.dev/docs/svelte/bind#Function-bindings). Controls that can't be bound, such as a checkbox array, use `field.state.value` and `field.handleChange` directly.

## Installation

<Steps>

### Install the components

<PMAddComp name="field input textarea input-group button card" />

### Install the dependencies

<PMInstall command="@tanstack/svelte-form zod -D" />

### Create the form components

Create a `form` directory in `src/lib/components/ui` and add the files below. You only need to create the ones you use.

#### Context

The components share the state of the current field and its control through context. This requires Svelte 5.40 or newer.

```ts showLineNumbers title="src/lib/components/ui/form/context.svelte.ts"
import { createContext, onDestroy } from "svelte";
import type {
  AnyFieldApi,
  DeepKeys,
  DeepValue,
  FieldApi,
  FieldApiOptions,
  FormApi,
} from "@tanstack/svelte-form";

// TanStack Form's types take a long list of validator generics that we don't care about here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

/** The form instance returned by `createForm`. */
export type FormOf<TFormData> = FormApi<
  TFormData,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any
>;

/** The field passed to the children of `Form.Field` and `Form.Fieldset`. */
export type FormFieldApi<
  TFormData,
  TName extends DeepKeys<TFormData>,
> = FieldApi<
  TFormData,
  TName,
  DeepValue<TFormData, TName>,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any,
  Any
>;

/** Field level options that `Form.Field` and `Form.Fieldset` pass on to TanStack Form. */
export type FormFieldOptions<
  TFormData,
  TName extends DeepKeys<TFormData>,
> = Pick<
  FieldApiOptions<
    TFormData,
    TName,
    DeepValue<TFormData, TName>,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any,
    Any
  >,
  "validators"
>;

const [getFormFieldState, setFormFieldState] = createContext<FormFieldState>();

const [getFormControlState, setFormControlState] =
  createContext<FormControlState>();

export class FormFieldState {
  /** Set by `Form.Description` so the control only references it when it exists. */
  hasDescription = $state(false);

  constructor(
    readonly id: string,
    readonly field: AnyFieldApi
  ) {}

  /** Creates the state for a field and shares it with the components inside it. */
  static create(id: string, field: AnyFieldApi) {
    return setFormFieldState(new FormFieldState(id, field));
  }

  static get() {
    return getFormFieldState();
  }

  /** Errors are only shown once the field has been touched. */
  get isInvalid() {
    const { meta } = this.field.state;
    return meta.isTouched && !meta.isValid;
  }

  /** Validators return either issue objects with a `message` or plain strings. */
  get errors() {
    return this.field.state.meta.errors.map((error: unknown) =>
      typeof error === "string"
        ? { message: error }
        : (error as { message?: string } | undefined)
    );
  }

  get descriptionId() {
    return `${this.id}-description`;
  }

  get errorId() {
    return `${this.id}-error`;
  }
}

export class FormDescriptionState {
  constructor(readonly fieldState: FormFieldState) {
    // Register while the component initializes so the control can reference the description.
    fieldState.hasDescription = true;
    onDestroy(() => (fieldState.hasDescription = false));
  }

  /** Creates the state for a description and registers it with the current field. */
  static create() {
    return new FormDescriptionState(FormFieldState.get());
  }

  get id() {
    return this.fieldState.descriptionId;
  }
}

export type FormControlProps = {
  id: string;
  name: string;
  onblur: () => void;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

export class FormControlState {
  constructor(
    readonly id: string,
    readonly fieldState: FormFieldState
  ) {}

  /** Creates the state for a control and shares it with the components inside the field. */
  static create(id: string) {
    return setFormControlState(new FormControlState(id, FormFieldState.get()));
  }

  static get() {
    return getFormControlState();
  }

  /** The props to spread onto the form control. */
  get props(): FormControlProps {
    const { fieldState } = this;
    return {
      id: this.id,
      name: fieldState.field.name,
      onblur: fieldState.field.handleBlur,
      "aria-invalid": fieldState.isInvalid,
      "aria-describedby":
        [
          fieldState.hasDescription ? fieldState.descriptionId : undefined,
          fieldState.isInvalid ? fieldState.errorId : undefined,
        ]
          .filter(Boolean)
          .join(" ") || undefined,
    };
  }
}
```

#### Field

`Form.Field` wraps TanStack Form's `createField` and `Field.Field`. It accepts any `Field.Field` prop, such as `orientation`, along with the `validators` option, and passes the field to its children.

```svelte showLineNumbers title="src/lib/components/ui/form/form-field.svelte"
<script lang="ts" generics="TFormData, TName extends DeepKeys<TFormData>">
  import { createField, type DeepKeys } from "@tanstack/svelte-form";
  import { Field } from "$lib/components/ui/field/index.js";
  import type { WithoutChildren } from "$lib/utils.js";
  import {
    FormFieldState,
    type FormFieldApi,
    type FormFieldOptions,
    type FormOf,
  } from "./context.svelte.js";
  import type { ComponentProps, Snippet } from "svelte";

  let {
    ref = $bindable(null),
    of,
    name,
    mode,
    validators,
    children,
    ...restProps
  }: WithoutChildren<ComponentProps<typeof Field>> & {
    of: FormOf<TFormData>;
    name: TName;
    mode?: "value" | "array";
    validators?: FormFieldOptions<TFormData, TName>["validators"];
    children?: Snippet<[FormFieldApi<TFormData, TName>]>;
  } = $props();

  const id = $props.id();

  const field = createField(() => ({ form: of, name, mode, validators }));

  const fieldState = FormFieldState.create(id, field);
</script>

<Field
  bind:ref
  data-invalid={fieldState.isInvalid ? true : undefined}
  {...restProps}
>
  {@render children?.(field)}
</Field>
```

#### Control

`Form.Control` provides the props that must be spread onto the form control: the `id`, `name`, `onblur`, `aria-invalid`, and `aria-describedby` attributes. It generates its own `id`, so a fieldset can have a control for each of its items.

```svelte showLineNumbers title="src/lib/components/ui/form/form-control.svelte"
<script lang="ts">
  import {
    FormControlState,
    type FormControlProps,
  } from "./context.svelte.js";
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children?: Snippet<[{ props: FormControlProps }]>;
  } = $props();

  const id = $props.id();
  const control = FormControlState.create(id);
</script>

{@render children?.({ props: control.props })}
```

#### Label

```svelte showLineNumbers title="src/lib/components/ui/form/form-label.svelte"
<script lang="ts">
  import { FieldLabel } from "$lib/components/ui/field/index.js";
  import { FormControlState } from "./context.svelte.js";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    children,
    ...restProps
  }: ComponentProps<typeof FieldLabel> = $props();

  const control = FormControlState.get();
</script>

<FieldLabel bind:ref for={control.id} {...restProps}>
  {@render children?.()}
</FieldLabel>
```

#### Description

```svelte showLineNumbers title="src/lib/components/ui/form/form-description.svelte"
<script lang="ts">
  import { FieldDescription } from "$lib/components/ui/field/index.js";
  import { FormDescriptionState } from "./context.svelte.js";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    children,
    ...restProps
  }: ComponentProps<typeof FieldDescription> = $props();

  const description = FormDescriptionState.create();
</script>

<FieldDescription bind:ref id={description.id} {...restProps}>
  {@render children?.()}
</FieldDescription>
```

#### Field Errors

`Field.Error` expects an array of objects with a `message`. Standard Schema validators return those, while a validator function can return a plain string, so this component maps the errors for you. It only renders once the field has been touched and is invalid.

```svelte showLineNumbers title="src/lib/components/ui/form/form-field-errors.svelte"
<script lang="ts">
  import { FieldError } from "$lib/components/ui/field/index.js";
  import { FormFieldState } from "./context.svelte.js";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    ...restProps
  }: Omit<ComponentProps<typeof FieldError>, "errors"> = $props();

  const fieldState = FormFieldState.get();
</script>

{#if fieldState.isInvalid}
  <FieldError
    bind:ref
    id={fieldState.errorId}
    errors={fieldState.errors}
    {...restProps}
  />
{/if}
```

#### Fieldset

`Form.Fieldset` wraps `createField` and `Field.Set`. Use it for fields that group multiple controls, such as radio groups and checkbox groups, and for array fields.

```svelte showLineNumbers title="src/lib/components/ui/form/form-fieldset.svelte"
<script lang="ts" generics="TFormData, TName extends DeepKeys<TFormData>">
  import { createField, type DeepKeys } from "@tanstack/svelte-form";
  import { FieldSet } from "$lib/components/ui/field/index.js";
  import type { WithoutChildren } from "$lib/utils.js";
  import {
    FormFieldState,
    type FormFieldApi,
    type FormFieldOptions,
    type FormOf,
  } from "./context.svelte.js";
  import type { ComponentProps, Snippet } from "svelte";

  let {
    ref = $bindable(null),
    of,
    name,
    mode,
    validators,
    children,
    ...restProps
  }: WithoutChildren<ComponentProps<typeof FieldSet>> & {
    of: FormOf<TFormData>;
    name: TName;
    mode?: "value" | "array";
    validators?: FormFieldOptions<TFormData, TName>["validators"];
    children?: Snippet<[FormFieldApi<TFormData, TName>]>;
  } = $props();

  const id = $props.id();

  const field = createField(() => ({ form: of, name, mode, validators }));

  const fieldState = FormFieldState.create(id, field);
</script>

<FieldSet
  bind:ref
  data-invalid={fieldState.isInvalid ? true : undefined}
  {...restProps}
>
  {@render children?.(field)}
</FieldSet>
```

#### Index

`Form.Legend` is `Field.Legend` re-exported, so the legend of a `Form.Fieldset` is available under the same name as in the other form guides.

```ts showLineNumbers title="src/lib/components/ui/form/index.ts"
import { FieldLegend as Legend } from "$lib/components/ui/field/index.js";
import Control from "./form-control.svelte";
import Description from "./form-description.svelte";
import FieldErrors from "./form-field-errors.svelte";
import Field from "./form-field.svelte";
import Fieldset from "./form-fieldset.svelte";
import Label from "./form-label.svelte";

export { Field, Fieldset, Control, Label, Legend, Description, FieldErrors };
```

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

### Create the form

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

We can now build the form using the `Form` components and the `Field` components.

```svelte showLineNumbers title="src/routes/bug-report/+page.svelte"
<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import * as Form from "$lib/components/ui/form/index.js";
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
        <Form.Field of={form} name="title">
          {#snippet children(field)}
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Bug Title</Form.Label>
                <Input
                  {...props}
                  bind:value={() => field.state.value, field.handleChange}
                  placeholder="Login button not working on mobile"
                  autocomplete="off"
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          {/snippet}
        </Form.Field>
        <Form.Field of={form} name="description">
          {#snippet children(field)}
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Description</Form.Label>
                <InputGroup.Root>
                  <InputGroup.Textarea
                    {...props}
                    bind:value={() => field.state.value, field.handleChange}
                    placeholder="I'm having an issue with the login button on mobile."
                    rows={6}
                    class="min-h-24 resize-none"
                  />
                  <InputGroup.Addon align="block-end">
                    <InputGroup.Text class="tabular-nums">
                      {field.state.value.length}/100 characters
                    </InputGroup.Text>
                  </InputGroup.Addon>
                </InputGroup.Root>
              {/snippet}
            </Form.Control>
            <Form.Description>
              Include steps to reproduce, expected behavior, and what actually
              happened.
            </Form.Description>
            <Form.FieldErrors />
          {/snippet}
        </Form.Field>
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

Validators can also be set on a single field with the `validators` prop of `Form.Field` or `Form.Fieldset`. Field-level validators accept a function or a Standard Schema.

```svelte showLineNumbers title="form.svelte"
<Form.Field
  of={form}
  name="title"
  validators={{
    onChange: z.string().min(5, "Bug title must be at least 5 characters."),
  }}
>
  {#snippet children(field)}
    <!-- ... -->
  {/snippet}
</Form.Field>
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

Display errors next to the field using `Form.FieldErrors`. The `Form` components take care of the styling and accessibility for you:

- `Form.Field` adds the `data-invalid` attribute to `Field.Field`.
- The `props` from `Form.Control` include `aria-invalid` and an `aria-describedby` that points at the description and the error. Spread them onto the form control such as `Input`, `Select.Trigger`, `Checkbox`, etc.
- Errors are only shown once the field has been touched. `field.state.meta.isTouched` becomes `true` when the user changes or blurs the field, or when the form is submitted.

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} name="email">
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input
          {...props}
          type="email"
          bind:value={() => field.state.value, field.handleChange}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  {/snippet}
</Form.Field>
```

`Form.FieldErrors` reads the issues from your validators, so you can pass a Standard Schema or a validator function that returns a string.

## Working with Different Field Types

### Input

- For input fields, spread `props` onto the `Input` and bind its `value` to the field with `bind:value={() => field.state.value, field.handleChange}`.
- The `props` include the `aria-invalid` attribute and the `onblur` handler, so the error styling and touched state are handled for you.

<ComponentPreview name="form-tanstack-input">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} name="username">
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input
          {...props}
          bind:value={() => field.state.value, field.handleChange}
          placeholder="shadcn"
          autocomplete="username"
        />
      {/snippet}
    </Form.Control>
    <Form.Description>
      This is your public display name. Must be between 3 and 10 characters.
      Must only contain letters, numbers, and underscores.
    </Form.Description>
    <Form.FieldErrors />
  {/snippet}
</Form.Field>
```

### Textarea

- For textarea fields, spread `props` onto the `Textarea` and bind its `value` the same way as an input.

<ComponentPreview name="form-tanstack-textarea">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} name="about">
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>More about you</Form.Label>
        <Textarea
          {...props}
          bind:value={() => field.state.value, field.handleChange}
          placeholder="I'm a software engineer..."
          class="min-h-[120px]"
        />
      {/snippet}
    </Form.Control>
    <Form.Description>
      Tell us more about yourself. This will be used to help us personalize
      your experience.
    </Form.Description>
    <Form.FieldErrors />
  {/snippet}
</Form.Field>
```

### Select

- For select components, bind the `value` on `Select.Root` to the field and spread `props` onto `Select.Trigger`.
- Pass `items` to `Select.Root` so the trigger can show the label of the selected item, including when the field has a default value.
- Use `orientation="responsive"` on `Form.Field` to lay the label and select out side by side.

<ComponentPreview name="form-tanstack-select">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} name="language" orientation="responsive">
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Field.Content>
          <Form.Label>Spoken Language</Form.Label>
          <Form.Description
            >For best results, select the language you speak.</Form.Description
          >
          <Form.FieldErrors />
        </Field.Content>
        <Select.Root
          type="single"
          {items}
          bind:value={() => field.state.value, field.handleChange}
        >
          <Select.Trigger {...props} class="min-w-[120px]">
            <Select.Value placeholder="Select" />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Item value="auto" label="Auto">Auto</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              {#each spokenLanguages as language (language.value)}
                <Select.Item value={language.value} label={language.label}>
                  {language.label}
                </Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      {/snippet}
    </Form.Control>
  {/snippet}
</Form.Field>
```

### Checkbox

- For a single checkbox, bind `checked` to the field with `bind:checked={() => field.state.value, field.handleChange}`.
- For an array of values, use `Form.Fieldset` with `mode="array"` and `Form.Legend` to group the checkboxes, and a `Form.Control` for each checkbox. Use the array helpers `field.pushValue` and `field.removeValue` in the `onCheckedChange` handler of each `Checkbox`.
- Remember to add `data-slot="checkbox-group"` to the `Field.Group` component for proper styling and spacing.

<ComponentPreview name="form-tanstack-checkbox">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset of={form} name="tasks" mode="array">
  {#snippet children(field)}
    <Form.Legend variant="label">Tasks</Form.Legend>
    <Form.Description
      >Get notified when tasks you've created have updates.</Form.Description
    >
    <Field.Group data-slot="checkbox-group">
      {#each tasks as task (task.id)}
        <Form.Control>
          {#snippet children({ props })}
            <Field.Field
              orientation="horizontal"
              data-invalid={props["aria-invalid"] ? true : undefined}
            >
              <Checkbox
                {...props}
                value={task.id}
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
              <Form.Label class="font-normal">{task.label}</Form.Label>
            </Field.Field>
          {/snippet}
        </Form.Control>
      {/each}
    </Field.Group>
    <Form.FieldErrors />
  {/snippet}
</Form.Fieldset>
```

### Radio Group

- Use `Form.Fieldset` and `Form.Legend` to group the radio items.
- Bind the `value` on `RadioGroup.Root` to the field.
- Use a `Form.Control` for each `RadioGroup.Item` and spread `props` onto it. The `aria-invalid` in `props` can be used to set `data-invalid` on each `Field.Field`.
- Wrapping the `Field.Field` in a `Form.Label` makes the whole card clickable.

<ComponentPreview name="form-tanstack-radiogroup">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset of={form} name="plan">
  {#snippet children(field)}
    <Form.Legend>Plan</Form.Legend>
    <Form.Description
      >You can upgrade or downgrade your plan at any time.</Form.Description
    >
    <RadioGroup.Root bind:value={() => field.state.value, field.handleChange}>
      {#each plans as plan (plan.id)}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>
              <Field.Field
                orientation="horizontal"
                data-invalid={props["aria-invalid"] ? true : undefined}
              >
                <Field.Content>
                  <Field.Title>{plan.title}</Field.Title>
                  <Field.Description>{plan.description}</Field.Description>
                </Field.Content>
                <RadioGroup.Item {...props} value={plan.id} />
              </Field.Field>
            </Form.Label>
          {/snippet}
        </Form.Control>
      {/each}
    </RadioGroup.Root>
    <Form.FieldErrors />
  {/snippet}
</Form.Fieldset>
```

### Switch

- For switches, bind `checked` to the field the same way as a single checkbox and spread `props` onto the `Switch`.

<ComponentPreview name="form-tanstack-switch">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} name="twoFactor" orientation="horizontal">
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Field.Content>
          <Form.Label>Multi-factor authentication</Form.Label>
          <Form.Description>
            Enable multi-factor authentication to secure your account.
          </Form.Description>
          <Form.FieldErrors />
        </Field.Content>
        <Switch
          {...props}
          bind:checked={() => field.state.value, field.handleChange}
        />
      {/snippet}
    </Form.Control>
  {/snippet}
</Form.Field>
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

Use a `Form.Fieldset` with `mode="array"` for the array itself. Its `Form.FieldErrors` displays errors for the whole array, such as the minimum and maximum length. The `field` it passes to its children has the array helpers, such as `pushValue` and `removeValue`.

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset of={form} name="emails" mode="array">
  {#snippet children(field)}
    <Form.Legend variant="label">Email Addresses</Form.Legend>
    <Form.Description>
      Add up to 5 email addresses where we can contact you.
    </Form.Description>
    <Field.Group>
      {#each field.state.value as _, index (index)}
        <!-- Nested field for each array item -->
      {/each}
    </Field.Group>
    <Form.FieldErrors />
  {/snippet}
</Form.Fieldset>
```

### Nested Fields

Access individual array items using bracket notation: `fieldName[index].propertyName`. The `name` is type checked, so a path that doesn't exist in your default values is an error. This example uses `InputGroup` to display the remove button inline with the input.

```svelte showLineNumbers title="form.svelte"
<Form.Field
  of={form}
  name={`emails[${index}].address`}
  orientation="horizontal"
>
  {#snippet children(subField)}
    <Form.Control>
      {#snippet children({ props })}
        <Field.Content>
          <InputGroup.Root>
            <InputGroup.Input
              {...props}
              bind:value={() => subField.state.value, subField.handleChange}
              aria-label="Email {index + 1}"
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
          <Form.FieldErrors />
        </Field.Content>
      {/snippet}
    </Form.Control>
  {/snippet}
</Form.Field>
```

### Adding Items

Use `field.pushValue(item)` on the field from `Form.Fieldset` to add items to an array field, so place the button inside the fieldset. You can disable the button when the array reaches its maximum length.

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
