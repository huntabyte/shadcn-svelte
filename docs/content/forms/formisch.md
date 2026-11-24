---
title: Formisch
description: Build forms in Svelte using Formisch and Valibot.
links:
  doc: https://formisch.dev/svelte/guides/introduction/
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
</script>

In this guide, we will take a look at building forms with [Formisch](https://formisch.dev) and [Valibot](https://valibot.dev). We'll cover building forms with the `Field` component, adding schema validation, error handling, accessibility, and more.

If you aren't familiar with Formisch, you should check out its [documentation](https://formisch.dev/svelte/guides/introduction/) first, as this guide assumes you have a basic understanding of how it works.

## Demo

We are going to build the following form. It has a simple text input and a textarea. On submit, we'll validate the form data and display any errors.

<ComponentPreview name="form-formisch-demo">

<div></div>

</ComponentPreview>

## Approach

This form leverages Formisch for form state and validation, and a small set of `Form.*` components for wiring that state up to your markup. We'll build our form using the [Field](/docs/components/field) component, which gives you **complete flexibility over the markup and styling**.

- Uses Formisch's `createForm` function for form state management and client side validation.
- `Form.Field` scopes the form state to each field. `Form.Control`, `Form.Label`, `Form.Description`, and `Form.FieldErrors` apply the correct `id` and `aria` attributes.
- `Field` components render the markup and styling.
- Schema validation using Valibot.
- Formisch is fully typed. Field paths, inputs, and submitted values are inferred from your schema.

Formisch's `Field` is headless. It hands you a `props` object to spread onto the form control, along with the `input` and `errors` of the field. Wiring those up to a label, a description, and an error for every field gets repetitive, so we'll build a few small reusable `Form.*` components that you create once and use in every form.

## Anatomy

Here's a basic example of a form field using the `Form` components.

```svelte showLineNumbers
<Form.Root of={form} {onsubmit}>
  <Field.Group>
    <Form.Field of={form} path={["title"]}>
      {#snippet children(field)}
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label>Bug Title</Form.Label>
            <Input {...props} value={field.input} />
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
</Form.Root>
```

- `Form.Root` is Formisch's `Form`. It renders a native `form`, validates the input against your schema, and calls `onsubmit` with the typed output.
- `Form.Field` wraps `Field.Field` and scopes the form state for `title` to everything inside of it. It sets `data-invalid` when the field has errors and passes the typed `field` store, with its `input`, `errors`, and `onInput`, to its children.
- `Form.Control` provides the `props` that must be spread onto the form control.
- `Form.Label`, `Form.Description`, and `Form.FieldErrors` render `Field.Label`, `Field.Description`, and `Field.Error` and link them to the form control. `Form.Legend` is `Field.Legend`, used to label a `Form.Fieldset`.

## Installation

<Steps>

### Install the components

<PMAddComp name="field input textarea input-group button card" />

### Install the dependencies

<PMInstall command="@formisch/svelte valibot -D" />

### Create the form components

Create a `form` directory in `src/lib/components/ui` and add the files below. You only need to create the ones you use.

#### Context

The components share the state of the current field and its control through context. This requires Svelte 5.40 or newer.

```ts title="src/lib/components/ui/form/context.svelte.ts" showLineNumbers
import { createContext, onDestroy } from "svelte";
import type { FieldElementProps, FieldStore } from "@formisch/svelte";

const [getFormFieldState, setFormFieldState] = createContext<FormFieldState>();

const [getFormControlState, setFormControlState] =
  createContext<FormControlState>();

export class FormFieldState {
  /** Set by `Form.Description` so the control only references it when it exists. */
  hasDescription = $state(false);

  constructor(
    readonly id: string,
    /** Only the parts of the field store that don't depend on the schema or path. */
    readonly field: Pick<FieldStore, "errors" | "props">
  ) {}

  /** Creates the state for a field and shares it with the components inside it. */
  static create(id: string, field: FormFieldState["field"]) {
    return setFormFieldState(new FormFieldState(id, field));
  }

  static get() {
    return getFormFieldState();
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

type ControlAttributes = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

type NativeControlProps = FieldElementProps & ControlAttributes;
type CustomControlProps = Omit<FieldElementProps, "oninput" | "onchange"> &
  ControlAttributes;

export type FormControlProps<TCustom extends boolean = false> =
  TCustom extends true ? CustomControlProps : NativeControlProps;

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

  get #attributes(): ControlAttributes {
    const { fieldState } = this;
    return {
      id: this.id,
      "aria-invalid": !!fieldState.field.errors,
      "aria-describedby":
        [
          fieldState.hasDescription ? fieldState.descriptionId : undefined,
          fieldState.field.errors ? fieldState.errorId : undefined,
        ]
          .filter(Boolean)
          .join(" ") || undefined,
    };
  }

  /**
   * The props to spread onto the form control. When `custom` is set the `oninput` and `onchange`
   * handlers are left out, since components like `Select` never fire those events.
   */
  props<TCustom extends boolean = false>(
    custom?: TCustom
  ): FormControlProps<TCustom>;
  props(custom?: boolean): NativeControlProps | CustomControlProps {
    const { oninput, onchange, ...rest } = this.fieldState.field.props;
    return custom
      ? { ...rest, ...this.#attributes }
      : { ...rest, oninput, onchange, ...this.#attributes };
  }
}
```

#### Field

`Form.Field` wraps Formisch's `useField` and `Field.Field`. It accepts any `Field.Field` prop, such as `orientation`, and passes the field store to its children.

```svelte title="src/lib/components/ui/form/form-field.svelte" showLineNumbers
<script
  lang="ts"
  generics="TSchema extends FormSchema, TFieldPath extends RequiredPath"
>
  import {
    useField,
    type FieldStore,
    type FormSchema,
    type FormStore,
    type RequiredPath,
    type ValidPath,
  } from "@formisch/svelte";
  import { Field } from "$lib/components/ui/field/index.js";
  import type { WithoutChildren } from "$lib/utils.js";
  import { FormFieldState } from "./context.svelte.js";
  import type { ComponentProps, Snippet } from "svelte";
  import type * as v from "valibot";

  let {
    ref = $bindable(null),
    of,
    path,
    children,
    ...restProps
  }: WithoutChildren<ComponentProps<typeof Field>> & {
    of: FormStore<TSchema>;
    path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
    children?: Snippet<[FieldStore<TSchema, TFieldPath>]>;
  } = $props();

  const id = $props.id();

  const field = useField(
    () => of,
    () => ({ path })
  );

  FormFieldState.create(id, field);
</script>

<Field bind:ref data-invalid={field.errors ? true : undefined} {...restProps}>
  {@render children?.(field)}
</Field>
```

#### Control

`Form.Control` provides the props that must be spread onto the form control: the `name`, event handlers, and element reference from Formisch, and the `id`, `aria-invalid`, and `aria-describedby` attributes. It generates its own `id`, so a fieldset can have a control for each of its items.

Set `custom` when the control isn't a native `input`, `textarea`, or `select`, such as `Select`, `Checkbox`, `RadioGroup`, or `Switch`. These components never fire the `oninput` and `onchange` events, so `custom` removes the handlers and you call `field.onInput` from their value callback instead.

```svelte title="src/lib/components/ui/form/form-control.svelte" showLineNumbers
<script lang="ts" generics="TCustom extends boolean = false">
  import {
    FormControlState,
    type FormControlProps,
  } from "./context.svelte.js";
  import type { Snippet } from "svelte";

  let {
    children,
    custom,
  }: {
    children?: Snippet<[{ props: FormControlProps<TCustom> }]>;
    /**
     * Set this when the control isn't a native `input`, `textarea` or `select`,
     * such as `Select`, `Checkbox`, `RadioGroup` or `Switch`. It removes the
     * `oninput` and `onchange` handlers, which those components never fire.
     * Call `field.onInput` from the component's value callback instead.
     */
    custom?: TCustom;
  } = $props();

  const id = $props.id();
  const control = FormControlState.create(id);
</script>

{@render children?.({ props: control.props(custom) })}
```

#### Label

```svelte title="src/lib/components/ui/form/form-label.svelte" showLineNumbers
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

```svelte title="src/lib/components/ui/form/form-description.svelte" showLineNumbers
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

`Field.Error` expects an array of objects with a `message`, while Formisch provides an array of strings, so this component maps the errors for you.

```svelte title="src/lib/components/ui/form/form-field-errors.svelte" showLineNumbers
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

<FieldError
  bind:ref
  id={fieldState.errorId}
  errors={fieldState.field.errors?.map((message) => ({ message }))}
  {...restProps}
/>
```

#### Fieldset

`Form.Fieldset` wraps `useField` and `Field.Set`. Use it for fields that group multiple controls, such as radio groups and checkbox groups.

```svelte title="src/lib/components/ui/form/form-fieldset.svelte" showLineNumbers
<script
  lang="ts"
  generics="TSchema extends FormSchema, TFieldPath extends RequiredPath"
>
  import {
    useField,
    type FieldStore,
    type FormSchema,
    type FormStore,
    type RequiredPath,
    type ValidPath,
  } from "@formisch/svelte";
  import { FieldSet } from "$lib/components/ui/field/index.js";
  import type { WithoutChildren } from "$lib/utils.js";
  import { FormFieldState } from "./context.svelte.js";
  import type { ComponentProps, Snippet } from "svelte";
  import type * as v from "valibot";

  let {
    ref = $bindable(null),
    of,
    path,
    children,
    ...restProps
  }: WithoutChildren<ComponentProps<typeof FieldSet>> & {
    of: FormStore<TSchema>;
    path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
    children?: Snippet<[FieldStore<TSchema, TFieldPath>]>;
  } = $props();

  const id = $props.id();

  const field = useField(
    () => of,
    () => ({ path })
  );

  FormFieldState.create(id, field);
</script>

<FieldSet
  bind:ref
  data-invalid={field.errors ? true : undefined}
  {...restProps}
>
  {@render children?.(field)}
</FieldSet>
```

#### Index

`Form.Root` doesn't need a wrapper since it doesn't render any extra markup, so we re-export Formisch's `Form` as is. `Form.Legend` is `Field.Legend` re-exported so the legend of a `Form.Fieldset` is available under the same name as in the other form guides.

```ts title="src/lib/components/ui/form/index.ts" showLineNumbers
import { Form as Root } from "@formisch/svelte";
import { FieldLegend as Legend } from "$lib/components/ui/field/index.js";
import Control from "./form-control.svelte";
import Description from "./form-description.svelte";
import FieldErrors from "./form-field-errors.svelte";
import Field from "./form-field.svelte";
import Fieldset from "./form-fieldset.svelte";
import Label from "./form-label.svelte";

export {
  Root,
  Field,
  Fieldset,
  Control,
  Label,
  Legend,
  Description,
  FieldErrors,
};
```

</Steps>

## Form

<Steps>

### Create a form schema

Define the shape of your form using a Valibot schema. You can read more about using Valibot in the [Valibot documentation](https://valibot.dev). We're going to define it in the same file as our form, but you can put it anywhere you like.

```ts showLineNumbers
import * as v from "valibot";

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, "Bug title must be at least 5 characters."),
    v.maxLength(32, "Bug title must be at most 32 characters.")
  ),
  description: v.pipe(
    v.string(),
    v.minLength(20, "Description must be at least 20 characters."),
    v.maxLength(100, "Description must be at most 100 characters.")
  ),
});
```

### Create the form

Use `createForm` to create the form store. Pass it your schema and the initial values of your fields.

```svelte title="src/routes/bug-report/+page.svelte" showLineNumbers
<script lang="ts">
  import { createForm } from "@formisch/svelte";

  const form = createForm({
    schema: FormSchema,
    initialInput: { title: "", description: "" },
  });
</script>
```

### Build the form

We can now build the form using the `Form` components.

```svelte title="src/routes/bug-report/+page.svelte" showLineNumbers
<script lang="ts">
  import * as v from "valibot";
  import { createForm, reset, type SubmitHandler } from "@formisch/svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  const FormSchema = v.object({
    title: v.pipe(
      v.string(),
      v.minLength(5, "Bug title must be at least 5 characters."),
      v.maxLength(32, "Bug title must be at most 32 characters.")
    ),
    description: v.pipe(
      v.string(),
      v.minLength(20, "Description must be at least 20 characters."),
      v.maxLength(100, "Description must be at most 100 characters.")
    ),
  });

  const form = createForm({
    schema: FormSchema,
    initialInput: { title: "", description: "" },
  });

  const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
    console.log(output);
  };
</script>

<Card.Root class="w-full sm:max-w-md">
  <Card.Header>
    <Card.Title>Bug Report</Card.Title>
    <Card.Description>
      Help us improve by reporting bugs you encounter.
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <Form.Root of={form} {onsubmit} id="bug-report-form">
      <Field.Group>
        <Form.Field of={form} path={["title"]}>
          {#snippet children(field)}
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Bug Title</Form.Label>
                <Input
                  {...props}
                  value={field.input}
                  placeholder="Login button not working on mobile"
                  autocomplete="off"
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          {/snippet}
        </Form.Field>
        <Form.Field of={form} path={["description"]}>
          {#snippet children(field)}
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Description</Form.Label>
                <InputGroup.Root>
                  <InputGroup.Textarea
                    {...props}
                    value={field.input}
                    placeholder="I'm having an issue with the login button on mobile."
                    rows={6}
                    class="min-h-24 resize-none"
                  />
                  <InputGroup.Addon align="block-end">
                    <InputGroup.Text class="tabular-nums">
                      {field.input?.length ?? 0}/100 characters
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
    </Form.Root>
  </Card.Content>
  <Card.Footer>
    <Field.Field orientation="horizontal">
      <Button type="button" variant="outline" onclick={() => reset(form)}>
        Reset
      </Button>
      <Button type="submit" form="bug-report-form">Submit</Button>
    </Field.Field>
  </Card.Footer>
</Card.Root>
```

The submit button lives outside the form in the card footer, so it uses the `form` attribute to point at the form by its `id`.

The `name`, `id`, and all accessibility attributes are applied to the input by spreading the `props` object from the `Form.Control` component. The label is automatically associated with the input using the `for` attribute, and the description and errors are associated using `aria-describedby`.

### Handle the submit

`onsubmit` is only called once the input passes validation, and it receives the parsed output of your schema. It can be async, so you can send the data to your server from it.

```ts showLineNumbers
const onsubmit: SubmitHandler<typeof FormSchema> = async (output) => {
  await fetch("/api/bug-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(output),
  });
};
```

Use `form.isSubmitting` to disable the submit button while the handler is running.

```svelte showLineNumbers
<Button type="submit" disabled={form.isSubmitting}>Submit</Button>
```

### Done

That's it. You now have a fully accessible form with client side validation.

When you submit the form, Formisch validates the data against your schema. If the data is invalid, the errors are displayed next to each field and the first invalid field is focused.

</Steps>

## Validation

### Client-side Validation

Formisch validates your form data against the Valibot schema you give to `createForm`. There's nothing else to configure.

### Server-side Validation

Formisch validates on the client. Always validate again on the server before you trust the data, for example in a SvelteKit [form action](https://svelte.dev/docs/kit/form-actions) or endpoint. To reuse the same schema on both sides, move it out of the form component into a module that the form and the server can both import.

```ts showLineNumbers title="src/lib/schemas/bug-report.ts"
import * as v from "valibot";

export const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, "Bug title must be at least 5 characters."),
    v.maxLength(32, "Bug title must be at most 32 characters.")
  ),
  description: v.pipe(
    v.string(),
    v.minLength(20, "Description must be at least 20 characters."),
    v.maxLength(100, "Description must be at most 100 characters.")
  ),
});
```

Then validate the request body with Valibot's `safeParse`.

```ts showLineNumbers title="src/routes/api/bug-report/+server.ts"
import { json, type RequestHandler } from "@sveltejs/kit";
import * as v from "valibot";
import { FormSchema } from "$lib/schemas/bug-report.js";

export const POST: RequestHandler = async ({ request }) => {
  const result = v.safeParse(FormSchema, await request.json());

  if (!result.success) {
    return json({ issues: result.issues }, { status: 400 });
  }

  return json({ success: true });
};
```

### Validation Modes

Use the `validate` and `revalidate` options to change when client-side validation runs.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  const form = createForm({
    schema: FormSchema,
    validate: "blur",
    revalidate: "input",
  });
</script>
```

| Mode        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `"initial"` | Validates as soon as the form is created. Only available for `validate`. |
| `"touch"`   | Validates when the field is touched.                                     |
| `"input"`   | Validates on every input.                                                |
| `"change"`  | Validates on the change event.                                           |
| `"blur"`    | Validates on blur.                                                       |
| `"submit"`  | Skips validation while the user is editing, and validates on submit.     |

`validate` controls when a field is validated for the first time and defaults to `"submit"`. `revalidate` controls when it is validated again and defaults to `"input"`, so errors disappear as soon as the user fixes them.

## Displaying Errors

Display errors next to the field using `Form.FieldErrors`. For styling and accessibility:

- `Form.Field` adds the `data-invalid` attribute to the underlying `Field.Field` whenever the field has errors.
- Spread the `props` from `Form.Control` onto the form control such as `Input`, `Select.Trigger`, `Checkbox`, etc. This applies the `aria-invalid` attribute for you.

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["email"]}>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} type="email" value={field.input} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  {/snippet}
</Form.Field>
```

`Form.Field` passes the field store to its children, so you can also use it to change when errors are shown. For example, only show them once the user has edited the field or tried to submit the form.

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["email"]}>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} type="email" value={field.input} />
      {/snippet}
    </Form.Control>
    {#if field.isEdited || form.isSubmitted}
      <Form.FieldErrors />
    {/if}
  {/snippet}
</Form.Field>
```

## Working with Different Field Types

Formisch reads the value of native `input`, `textarea` and `select` elements from the DOM, so `props` can be spread onto them as is. Components built on Bits UI such as `Select`, `Checkbox`, `RadioGroup`, and `Switch` don't render a native input, so there are two differences:

- Add `custom` to `Form.Control`. This removes the `oninput` and `onchange` handlers from `props`, since those events are never fired by the component.
- Report new values to Formisch with `field.onInput(value)` from the component's value callback.

Because `onchange` is removed, validation modes that rely on the change event won't run for these controls. Use `validate: "input"` if you need to validate them as the value changes.

### Input

- For input fields, spread `props` onto the `Input` component and pass `field.input` to `value`.
- To show errors, add a `Form.FieldErrors`.

<ComponentPreview name="form-formisch-input">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["username"]}>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input
          {...props}
          value={field.input}
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

The `Textarea` works the same as the `Input`. Spread `props` onto it and pass `field.input` to `value`.

<ComponentPreview name="form-formisch-textarea">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["about"]}>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>More about you</Form.Label>
        <Textarea
          {...props}
          value={field.input}
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

### Number and Date

`props` reads the value of the DOM element as a string. For `number` and `date` fields, replace the `oninput` handler and pass the converted value to `field.onInput`.

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["age"]}>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Age</Form.Label>
        <Input
          {...props}
          type="number"
          value={field.input}
          oninput={(event) =>
            field.onInput(
              event.currentTarget.value === ""
                ? undefined
                : event.currentTarget.valueAsNumber
            )}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  {/snippet}
</Form.Field>
```

Use `v.number()` in your schema for this field.

Dates need a conversion in both directions. `valueAsDate` is `null` when the input is empty, so fall back to `undefined`, and the input expects a `YYYY-MM-DD` string, so format the `Date` that Formisch stores before passing it to `value`. Use `v.date()` in your schema for this field.

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["birthday"]}>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Birthday</Form.Label>
        <Input
          {...props}
          type="date"
          value={field.input instanceof Date
            ? field.input.toISOString().slice(0, 10)
            : ""}
          oninput={(event) =>
            field.onInput(event.currentTarget.valueAsDate ?? undefined)}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  {/snippet}
</Form.Field>
```

`valueAsDate` returns midnight UTC, which is why the value is formatted with `toISOString`.

### Select

- Add `custom` to `Form.Control`.
- Pass `field.input` to `value` on `Select.Root`, and call `field.onInput` from `onValueChange`.
- Spread `props` onto the `Select.Trigger` so the `id` and `aria` attributes are applied to the trigger.
- Use `orientation="responsive"` on `Form.Field` and `Field.Content` to place the label and description beside the select on larger screens.

<ComponentPreview name="form-formisch-select">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["language"]} orientation="responsive">
  {#snippet children(field)}
    <Form.Control custom>
      {#snippet children({ props })}
        <Field.Content>
          <Form.Label>Spoken Language</Form.Label>
          <Form.Description>
            For best results, select the language you speak.
          </Form.Description>
          <Form.FieldErrors />
        </Field.Content>
        <Select.Root
          type="single"
          value={field.input ?? ""}
          onValueChange={(value) => field.onInput(value)}
        >
          <Select.Trigger {...props} class="min-w-[120px]">
            <Select.Value placeholder="Select" />
          </Select.Trigger>
          <Select.Content>
            <!-- Select.Item components -->
          </Select.Content>
        </Select.Root>
      {/snippet}
    </Form.Control>
  {/snippet}
</Form.Field>
```

### Checkbox

- For a single checkbox, pass `field.input` to `checked` on the `Checkbox` component and call `field.onInput` from `onCheckedChange`.
- For an array of values, use `Form.Fieldset` with `Form.Legend` to group the checkboxes, and a `Form.Control` for each checkbox. Add or remove the value from the array in the `onCheckedChange` handler of each `Checkbox`.
- Remember to add `data-slot="checkbox-group"` to the `Field.Group` component for proper styling and spacing.

<ComponentPreview name="form-formisch-checkbox">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset of={form} path={["tasks"]}>
  {#snippet children(field)}
    <Form.Legend variant="label">Tasks</Form.Legend>
    <Field.Description>
      Get notified when tasks you've created have updates.
    </Field.Description>
    <Field.Group data-slot="checkbox-group">
      {#each tasks as task (task.id)}
        <Field.Field
          orientation="horizontal"
          data-invalid={field.errors ? true : undefined}
        >
          <Form.Control custom>
            {#snippet children({ props })}
              <Checkbox
                {...props}
                value={task.id}
                checked={field.input?.includes(task.id)}
                onCheckedChange={(checked) => {
                  const current = field.input ?? [];
                  field.onInput(
                    checked
                      ? [...current, task.id]
                      : current.filter((item) => item !== task.id)
                  );
                }}
              />
              <Form.Label class="font-normal">{task.label}</Form.Label>
            {/snippet}
          </Form.Control>
        </Field.Field>
      {/each}
    </Field.Group>
    <Form.FieldErrors />
  {/snippet}
</Form.Fieldset>
```

### Radio Group

- Use `Form.Fieldset` and `Form.Legend` to group the radio items.
- Pass `field.input` to `value` on `RadioGroup.Root` and call `field.onInput` from `onValueChange`.
- Use a `Form.Control` for each `RadioGroup.Item` and spread `props` onto it. The `field` from `Form.Fieldset` can be used to set `data-invalid` on each `Field.Field`.
- Wrapping the `Field.Field` in `Form.Label` makes the whole card clickable.

<ComponentPreview name="form-formisch-radiogroup">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Fieldset of={form} path={["plan"]}>
  {#snippet children(field)}
    <Form.Legend>Plan</Form.Legend>
    <Field.Description>
      You can upgrade or downgrade your plan at any time.
    </Field.Description>
    <RadioGroup.Root
      value={field.input ?? ""}
      onValueChange={(value) => field.onInput(value)}
    >
      {#each plans as plan (plan.id)}
        <Form.Control custom>
          {#snippet children({ props })}
            <Form.Label>
              <Field.Field
                orientation="horizontal"
                data-invalid={field.errors ? true : undefined}
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

- Pass `field.input` to `checked` on the `Switch` component and call `field.onInput` from `onCheckedChange`.
- Use `orientation="horizontal"` on `Form.Field` and put the label and description in a `Field.Content`.

<ComponentPreview name="form-formisch-switch">

<div></div>

</ComponentPreview>

```svelte showLineNumbers title="form.svelte"
<Form.Field of={form} path={["twoFactor"]} orientation="horizontal">
  {#snippet children(field)}
    <Form.Control custom>
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
          checked={field.input ?? false}
          onCheckedChange={(checked) => field.onInput(checked)}
        />
      {/snippet}
    </Form.Control>
  {/snippet}
</Form.Field>
```

### Complex Forms

Here is an example of a more complex form with multiple fields and validation.

<ComponentPreview name="form-formisch-complex">

<div></div>

</ComponentPreview>

## Resetting the Form

Use the `reset` method to reset the form to its initial state. Pass `initialInput` to replace the initial values at the same time.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  import { createForm, reset } from "@formisch/svelte";

  const form = createForm({ schema: FormSchema });
</script>

<Button type="button" variant="outline" onclick={() => reset(form)}>
  Reset
</Button>
```

## Array Fields

Use Formisch's `FieldArray` component to render a list of fields, and the `insert`, `remove`, `move`, `swap`, and `replace` methods to change it. This allows you to dynamically add, remove, and reorder items with full validation support.

<ComponentPreview name="form-formisch-array">

<div></div>

</ComponentPreview>

This example demonstrates managing multiple email addresses with a field array. Users can add up to 5 email addresses, remove individual addresses, and each address is validated independently.

### Array Field Structure

Use `FieldArray` for the list itself. It passes a `fieldArray` store to its children, with the `items` to render and the `errors` of the whole array, such as the minimum and maximum length. Group the items with `Field.Set` and `Field.Legend`.

```svelte showLineNumbers title="form.svelte"
<FieldArray of={form} path={["emails"]}>
  {#snippet children(fieldArray)}
    <Field.Set>
      <Form.Legend variant="label">Email Addresses</Form.Legend>
      <Field.Description>
        Add up to 5 email addresses where we can contact you.
      </Field.Description>
      <Field.Group>
        {#each fieldArray.items as item, index (item)}
          <!-- Nested field for each array item -->
        {/each}
      </Field.Group>
      <Field.Error
        errors={fieldArray.errors?.map((message) => ({ message }))}
      />
    </Field.Set>
  {/snippet}
</FieldArray>
```

Key the `each` block with the `item` from `fieldArray.items`. Formisch gives every item a stable ID, so the fields keep their state when items are added, removed, or reordered.

### Nested Fields

Build the path of each field from the `index` of the item: `["emails", index, "address"]`. This example uses `InputGroup` to display the remove button inline with the input.

```svelte showLineNumbers title="form.svelte"
<Form.Field
  of={form}
  path={["emails", index, "address"]}
  orientation="horizontal"
>
  {#snippet children(field)}
    <Form.Control>
      {#snippet children({ props })}
        <Field.Content>
          <InputGroup.Root>
            <InputGroup.Input
              {...props}
              value={field.input}
              aria-label="Email {index + 1}"
              placeholder="name@example.com"
              type="email"
            />
            {#if fieldArray.items.length > 1}
              <InputGroup.Addon align="inline-end">
                <InputGroup.Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onclick={() => remove(form, { path: ["emails"], at: index })}
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

Use `insert` to add an item to the array. You can disable the button when the array reaches its maximum length.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  import { insert } from "@formisch/svelte";
</script>

<Button
  type="button"
  variant="outline"
  size="sm"
  onclick={() =>
    insert(form, { path: ["emails"], initialInput: { address: "" } })}
  disabled={fieldArray.items.length >= 5}
>
  Add Email Address
</Button>
```

### Removing Items

Use `remove` to remove an item from the array by its index. You can conditionally show the remove button only when there's more than one item.

```svelte showLineNumbers title="form.svelte"
<script lang="ts">
  import { remove } from "@formisch/svelte";
</script>

{#if fieldArray.items.length > 1}
  <InputGroup.Button
    type="button"
    onclick={() => remove(form, { path: ["emails"], at: index })}
    aria-label="Remove email {index + 1}"
  >
    <XIcon />
  </InputGroup.Button>
{/if}
```

### Array Validation

Validate array fields using Valibot's array actions.

```ts showLineNumbers title="schema.ts"
const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(v.string(), v.email("Enter a valid email address.")),
      })
    ),
    v.minLength(1, "Add at least one email address."),
    v.maxLength(5, "You can add up to 5 email addresses.")
  ),
});
```

## Next Steps

Be sure to check out the [Formisch](https://formisch.dev/svelte/guides/introduction/) and [Valibot](https://valibot.dev) documentation for more information on how to use them, and the [Field](/docs/components/field) component for more layout options.
