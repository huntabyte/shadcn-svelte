---
title: Formisch
description: Build forms in Svelte using Formisch and Valibot.
links:
  doc: https://formisch.dev
---

<script>
  import ComponentPreview from "$lib/components/component-preview.svelte";
  import PMInstall from "$lib/components/pm-install.svelte";
</script>

This guide covers building forms with [Formisch](https://formisch.dev), the lightweight, schema-first, and fully type-safe form library for Svelte. We'll create forms with the `<Field />` component, validate them with Valibot schemas, handle errors, and ensure accessibility.

## Demo

We'll build the following form. It has a simple text input and a textarea. On submit, we'll validate the form data and display any errors.

> **Note:** For the purpose of this demo, we have intentionally disabled browser validation to show how schema validation and form errors work in Formisch. It is recommended to add basic browser validation in your production code.

<ComponentPreview name="form-formisch-demo"
  class="[&_.preview]:min-h-[520px]"
/>

## Approach

This form leverages Formisch for headless, schema-first form handling. We'll build our form using the `<Field />` component, which gives you **complete flexibility over the markup and styling**.

- Uses Formisch's `createForm` function for form state management.
- `<Form />` component to wrap the native `<form>` element with submit handling.
- `<Field />` children snippet component for controlled inputs.
- Schema validation using [Valibot](https://valibot.dev).
- Type-safe field paths inferred from the schema.

## Form Methods

Formisch exposes form operations as **top-level functions** rather than methods on a form object. Import only what you need:

Every method follows the same signature: the **first parameter is always the form store**, and the **second parameter (if necessary) is always a config object**.

This design keeps the API flexible and consistent across all methods. You'll see the same `(form, config)` shape used throughout this guide for reading state (`getInput`, `getErrors`), writing state (`setInput`, `setErrors`), form control (`submit`, `validate`, `focus`), and array operations (`insert`, `remove`, `move`, `swap`, `replace`). See the [full methods reference](https://formisch.dev/svelte/guides/form-methods) for details.

```ts showLineNumbers
import { getInput, insert, move, reset, submit } from "@formisch/svelte";

const email = getInput(form, { path: ["email"] });
reset(form, { initialInput: { email: "", password: "" } });
move(form, { path: ["items"], from: 0, to: 3 });
```

## Installation

<PMInstall command="@formisch/svelte@1.0.0-rc.0 valibot" />

These prereleases currently ship some extensionless declaration imports. Projects using TypeScript `NodeNext` resolution may need declaration-only patches; this repository applies them in `patches/`. Standard SvelteKit projects using `Bundler` resolution do not need those NodeNext compatibility patches.

## Anatomy

Here's a basic example of a form using the `<Field />` component from Formisch and the shadcn-svelte `<Field.Field />` component.

> **Note:** Formisch ships its own `Field` component. To avoid a name clash with the shadcn-svelte `Field`, the examples below import the Formisch one as `FormischField` and import shadcn-svelte fields as the `Field` namespace. In your own code you can alias either side — just be consistent.

```svelte showLineNumbers
<Form of={form} onsubmit={handleSubmit}>
  <Field.Group>
    <FormischField of={form} path={["title"]}>
      {#snippet children(field)}
        <Field.Field data-invalid={field.errors !== null}>
          <Field.Label for="form-formisch-demo-title">Bug Title</Field.Label>
          <Input
            {...field.props}
            id="form-formisch-demo-title"
            value={field.input ?? ""}
            aria-invalid={field.errors !== null}
            placeholder="Login button not working on mobile"
            autocomplete="off"
          />
          {#if field.errors}
            <Field.Error
              errors={field.errors.map((message) => ({ message }))}
            />
          {/if}
        </Field.Field>
      {/snippet}
    </FormischField>
  </Field.Group>
  <Button type="submit">Submit</Button>
</Form>
```

## Form

### Create a form schema

We'll start by defining the shape of our form using a Valibot schema. Formisch infers all input and output types directly from this schema.

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

### Set up the form

Next, we'll use the `createForm` function from Formisch to create our form instance. The schema is passed directly to `createForm` — there is no resolver step.

The `<Form />` component wraps a native `<form>` element. It calls `event.preventDefault()`, runs validation, and only invokes `onsubmit` when the data is valid. The `output` you receive is fully typed from the schema.

```ts showLineNumbers
import { createForm, type SubmitEventHandler } from "@formisch/svelte";

const form = createForm({
  schema: FormSchema,
  initialInput: { title: "", description: "" },
});

const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
  console.log(output);
};
```

### Build the form

We can now build the form using the `<Field />` component from Formisch and the shadcn-svelte `<Field.Field />` component.

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

When you submit the form, the `handleSubmit` function will be called with the validated form data. If the form data is invalid, Formisch will populate `field.errors` for each invalid field and the UI will display them.

## Validation

### Client-side Validation

Formisch validates your form data using the Valibot schema you pass to `createForm`. There is no resolver — the schema is the single source of truth for both runtime validation and static types.

### Validation Modes

Formisch separates the **first** validation from **subsequent** validations. You configure them with the `validate` and `revalidate` options on `createForm`.

| Option       | Value       | Description                                                     |
| ------------ | ----------- | --------------------------------------------------------------- |
| `validate`   | `"submit"`  | Validate on form submission (default).                          |
| `validate`   | `"blur"`    | Validate when a field loses focus.                              |
| `validate`   | `"input"`   | Validate on every input change.                                 |
| `validate`   | `"initial"` | Validate immediately on form creation.                          |
| `revalidate` | `"input"`   | Revalidate on every input change after the first run (default). |
| `revalidate` | `"blur"`    | Revalidate on blur after the first run.                         |
| `revalidate` | `"submit"`  | Revalidate only on form submission.                             |

```ts showLineNumbers
const form = createForm({
  schema: FormSchema,
  initialInput: { title: "", description: "" },
  validate: "blur",
  revalidate: "input",
});
```

## Displaying Errors

Display errors next to the field using `<Field.Error />`. Formisch returns errors as an array of strings, so map them to the shape `<Field.Error />` expects. For styling and accessibility:

- Add the `data-invalid` prop to the `<Field.Field />` component.
- Add the `aria-invalid` prop to the form control such as `<Input />`, `<Select.Trigger />`, `<Checkbox />`, etc.

```svelte showLineNumbers
<FormischField of={form} path={["title"]}>
  {#snippet children(field)}
    <Field.Field data-invalid={field.errors !== null}>
      <Field.Label for="form-formisch-demo-title">Bug Title</Field.Label>
      <Input
        {...field.props}
        id="form-formisch-demo-title"
        value={field.input ?? ""}
        aria-invalid={field.errors !== null}
        placeholder="Login button not working on mobile"
        autocomplete="off"
      />
      {#if field.errors}
        <Field.Error errors={field.errors.map((message) => ({ message }))} />
      {/if}
    </Field.Field>
  {/snippet}
</FormischField>
```

## Working with Different Field Types

Formisch exposes two ways to bind a field to an element:

- **Native HTML elements** (like `<Input />` and `<Textarea />`) — spread `field.props` and provide `value={field.input}`. Formisch supplies the native event handlers in `field.props`; spread them onto the input.
- **Component-library inputs** (like Bits UI-based `<Select.Root />`, `<Checkbox />`, `<RadioGroup.Root />`, `<Switch />`) — read the value from `field.input` and call `field.onInput(value)` to update it.

### Input

- For input fields, spread `field.props` and provide `value={field.input}`.
- To show errors, add the `aria-invalid` prop to the `<Input />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-formisch-input"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<FormischField of={form} path={["username"]}>
  {#snippet children(field)}
    <Field.Field data-invalid={field.errors !== null}>
      <Field.Label for="form-formisch-input-username">Username</Field.Label>
      <Input
        {...field.props}
        id="form-formisch-input-username"
        value={field.input ?? ""}
        aria-invalid={field.errors !== null}
        placeholder="shadcn"
        autocomplete="username"
      />
      <Field.Description>
        This is your public display name. Must be between 3 and 10 characters.
        Must only contain letters, numbers, and underscores.
      </Field.Description>
      {#if field.errors}
        <Field.Error errors={field.errors.map((message) => ({ message }))} />
      {/if}
    </Field.Field>
  {/snippet}
</FormischField>
```

### Textarea

- For textarea fields, spread `field.props` and provide `value={field.input}`.
- To show errors, add the `aria-invalid` prop to the `<Textarea />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-formisch-textarea"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<FormischField of={form} path={["about"]}>
  {#snippet children(field)}
    <Field.Field data-invalid={field.errors !== null}>
      <Field.Label for="form-formisch-textarea-about"
        >More about you</Field.Label
      >
      <Textarea
        {...field.props}
        id="form-formisch-textarea-about"
        value={field.input ?? ""}
        aria-invalid={field.errors !== null}
        placeholder="I'm a software engineer..."
        class="min-h-[120px]"
      />
      <Field.Description>
        Tell us more about yourself. This will be used to help us personalize
        your experience.
      </Field.Description>
      {#if field.errors}
        <Field.Error errors={field.errors.map((message) => ({ message }))} />
      {/if}
    </Field.Field>
  {/snippet}
</FormischField>
```

### Select

- For select components, read `field.input` and call `field.onInput` from `<Select.Root />`'s `onValueChange`.
- To show errors, add the `aria-invalid` prop to the `<Select.Trigger />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-formisch-select"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<FormischField of={form} path={["language"]}>
  {#snippet children(field)}
    <Field.Field orientation="responsive" data-invalid={field.errors !== null}>
      <Field.Content>
        <Field.Label for="form-formisch-select-language"
          >Spoken Language</Field.Label
        >
        <Field.Description>
          For best results, select the language you speak.
        </Field.Description>
        {#if field.errors}
          <Field.Error errors={field.errors.map((message) => ({ message }))} />
        {/if}
      </Field.Content>
      <Select.Root
        value={field.input ?? ""}
        onValueChange={(value) => field.onInput(value)}
        type="single"
      >
        <Select.Trigger
          id="form-formisch-select-language"
          aria-invalid={field.errors !== null}
          class="min-w-[120px]"
        >
          {spokenLanguages.find((language) => language.value === field.input)
            ?.label ?? (field.input === "auto" ? "Auto" : "Select")}
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
</FormischField>
```

### Checkbox

- For checkbox arrays, read `field.input` and update it from `onCheckedChange` using `field.onInput`.
- To show errors, add the `aria-invalid` prop to the `<Checkbox />` component and the `data-invalid` prop to the `<Field.Field />` component.
- Remember to add `data-slot="checkbox-group"` to the `<Field.Group />` component for proper styling and spacing.

<ComponentPreview name="form-formisch-checkbox"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<FormischField of={form} path={["tasks"]}>
  {#snippet children(field)}
    <Field.Group>
      <Field.Set data-invalid={field.errors !== null}>
        <Field.Legend variant="label">Tasks</Field.Legend>
        <Field.Description>
          Get notified when tasks you&apos;ve created have updates.
        </Field.Description>
        <Field.Group data-slot="checkbox-group">
          {#each tasks as task (task.id)}
            {@const current = field.input ?? []}
            <Field.Field
              orientation="horizontal"
              data-invalid={field.errors !== null}
            >
              <Checkbox
                id={`form-formisch-checkbox-${task.id}`}
                aria-invalid={field.errors !== null}
                checked={current.includes(task.id)}
                onCheckedChange={(checked) => {
                  field.onInput(
                    checked === true
                      ? [...current, task.id]
                      : current.filter((value) => value !== task.id)
                  );
                }}
              />
              <Field.Label
                for={`form-formisch-checkbox-${task.id}`}
                class="font-normal"
              >
                {task.label}
              </Field.Label>
            </Field.Field>
          {/each}
        </Field.Group>
      </Field.Set>
      {#if field.errors}
        <Field.Error errors={field.errors.map((message) => ({ message }))} />
      {/if}
    </Field.Group>
  {/snippet}
</FormischField>
```

### Radio Group

- For radio groups, read `field.input` and call `field.onInput` from `onValueChange`.
- To show errors, add the `aria-invalid` prop to the `<RadioGroup.Item />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-formisch-radiogroup"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<FormischField of={form} path={["plan"]}>
  {#snippet children(field)}
    <Field.Set data-invalid={field.errors !== null}>
      <Field.Legend>Plan</Field.Legend>
      <Field.Description>
        You can upgrade or downgrade your plan at any time.
      </Field.Description>
      <RadioGroup.Root
        value={field.input ?? ""}
        onValueChange={(value) => field.onInput(value)}
        aria-invalid={field.errors !== null}
      >
        {#each plans as plan (plan.id)}
          <Field.Label for={`form-formisch-radiogroup-${plan.id}`}>
            <Field.Field
              orientation="horizontal"
              data-invalid={field.errors !== null}
            >
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
                id={`form-formisch-radiogroup-${plan.id}`}
                aria-invalid={field.errors !== null}
              />
            </Field.Field>
          </Field.Label>
        {/each}
      </RadioGroup.Root>
      {#if field.errors}
        <Field.Error errors={field.errors.map((message) => ({ message }))} />
      {/if}
    </Field.Set>
  {/snippet}
</FormischField>
```

### Switch

- For switches, read `field.input` and call `field.onInput` from `onCheckedChange`.
- To show errors, add the `aria-invalid` prop to the `<Switch />` component and the `data-invalid` prop to the `<Field.Field />` component.

<ComponentPreview name="form-formisch-switch"
  class="[&_.preview]:min-h-[520px]"
/>

```svelte showLineNumbers
<FormischField of={form} path={["twoFactor"]}>
  {#snippet children(field)}
    <Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
      <Field.Content>
        <Field.Label for="form-formisch-switch-twoFactor">
          Multi-factor authentication
        </Field.Label>
        <Field.Description>
          Enable multi-factor authentication to secure your account.
        </Field.Description>
        {#if field.errors}
          <Field.Error errors={field.errors.map((message) => ({ message }))} />
        {/if}
      </Field.Content>
      <Switch
        id="form-formisch-switch-twoFactor"
        checked={field.input ?? false}
        onCheckedChange={(checked) => field.onInput(checked)}
        aria-invalid={field.errors !== null}
      />
    </Field.Field>
  {/snippet}
</FormischField>
```

### Complex Forms

Here is an example of a more complex form with multiple fields and validation.

<ComponentPreview name="form-formisch-complex"
  class="[&_.preview]:min-h-[520px]"
/>

## Resetting the Form

Formisch exposes a top-level `reset` function. Pass the form store to reset it to its initial input.

You can also reset to new initial values, or reset while keeping the user's current input:

```svelte showLineNumbers
<Button type="button" variant="outline" onclick={() => reset(form)}>
  Reset
</Button>
```

```ts showLineNumbers
reset(form, { initialInput: { title: "", description: "" } });
reset(form, { initialInput: serverData, keepInput: true });
```

## Array Fields

Formisch provides a `<FieldArray />` component and a set of helper functions for managing dynamic array fields. Use it whenever you need to add, remove, or reorder items.

<ComponentPreview name="form-formisch-array"
  class="[&_.preview]:min-h-[520px]"
/>

### Using FieldArray

`<FieldArray />` follows the same children snippet pattern as `<Field />`. Its `items` array contains a stable key per item. Use that key in a keyed Svelte each block: `{#each fieldArray.items as item, index (item)}`.

```svelte showLineNumbers
<FieldArray of={form} path={["emails"]}>
  {#snippet children(fieldArray)}
    <Field.Set class="gap-4">
      <Field.Legend variant="label">Email Addresses</Field.Legend>
      <Field.Description>
        Add up to 5 email addresses where we can contact you.
      </Field.Description>
      <Field.Group class="gap-4">
        {#each fieldArray.items as item, index (item)}
          <FormischField of={form} path={["emails", index, "address"]}>
            {#snippet children(field)}
              <Field.Field
                orientation="horizontal"
                data-invalid={field.errors !== null}
              >
                <Field.Content>
                  <InputGroup.Root>
                    <InputGroup.Input
                      {...field.props}
                      id={`form-formisch-array-email-${index}`}
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                      aria-label={`Email ${index + 1}`}
                      placeholder="name@example.com"
                      type="email"
                      autocomplete="email"
                    />
                    {#if fieldArray.items.length > 1}
                      <InputGroup.Addon align="inline-end">
                        <InputGroup.Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onclick={() =>
                            remove(form, {
                              path: ["emails"],
                              at: index,
                            })}
                          aria-label={`Remove email ${index + 1}`}
                        >
                          <XIcon />
                        </InputGroup.Button>
                      </InputGroup.Addon>
                    {/if}
                  </InputGroup.Root>
                  {#if field.errors}
                    <Field.Error
                      errors={field.errors.map((message) => ({
                        message,
                      }))}
                    />
                  {/if}
                </Field.Content>
              </Field.Field>
            {/snippet}
          </FormischField>
        {/each}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onclick={() =>
            insert(form, {
              path: ["emails"],
              initialInput: { address: "" },
            })}
          disabled={fieldArray.items.length >= 5}
        >
          Add Email Address
        </Button>
      </Field.Group>
      {#if fieldArray.errors}
        <Field.Error
          errors={fieldArray.errors.map((message) => ({ message }))}
        />
      {/if}
    </Field.Set>
  {/snippet}
</FieldArray>
```

### Array Field Structure

Wrap your array fields in a `<Field.Set />` with a `<Field.Legend />` and `<Field.Description />`.

### Adding Items

Use the `insert` function to add new items to the array. By default new items are appended to the end. You can also pass an `at` index to insert at a specific position.

```svelte showLineNumbers
<Button
  type="button"
  onclick={() =>
    insert(form, { path: ["emails"], initialInput: { address: "" } })}
  disabled={fieldArray.items.length >= 5}
>
  Add Email Address
</Button>
```

### Removing Items

Use the `remove` function with an `at` index to remove items from the array.

Formisch also exposes `move`, `swap`, and `replace` for reordering and replacing items. They follow the same `(form, config)` signature.

```svelte showLineNumbers
{#if fieldArray.items.length > 1}
  <Button
    type="button"
    onclick={() => remove(form, { path: ["emails"], at: index })}
    aria-label={`Remove email ${index + 1}`}
  >
    Remove
  </Button>
{/if}
```

### Array Validation

Use Valibot's `array` and pipeline validators to constrain array fields.

```ts showLineNumbers
const FormSchema = v.object({
  emails: v.pipe(
    v.array(
      v.object({
        address: v.pipe(
          v.string(),
          v.nonEmpty("Enter an email address."),
          v.email("Enter a valid email address.")
        ),
      })
    ),
    v.minLength(1, "Add at least one email address."),
    v.maxLength(5, "You can add up to 5 email addresses.")
  ),
});
```

Client-side validation improves the user experience. Validate submitted data again on the server before saving it.
