# Forms & Inputs

## Form Structure

Always use `Field.Group` + `Field.Field` for form layout — never raw `div` with `space-y-*`.

```svelte
<Field.Group>
  <Field.Field>
    <Field.Label for="email">Email</Field.Label>
    <Input id="email" type="email" />
    <Field.Description>We will never share it.</Field.Description>
  </Field.Field>
</Field.Group>
```

## Field Organization

- Use `Field.Group` to stack related fields
- Use `Field.Set` and `Field.Legend` for semantic grouping (checkboxes, radios, switches)
- Use `orientation="horizontal"` or `orientation="responsive"` when the layout calls for it

## Input Wrappers

When using `InputGroup`, you must use `InputGroup.Input` or `InputGroup.Textarea` — never bare `Input` inside it.

For buttons or icons alongside inputs, use `InputGroup.Root` with its companions:

- `InputGroup.Input` / `InputGroup.Textarea`
- `InputGroup.Addon`
- `InputGroup.Button`
- `InputGroup.Text`

Do not use absolute positioning hacks for button-input combinations.

## Validation & Disabled States

Both attributes are needed — `data-invalid`/`data-disabled` styles the field (label, description), while `aria-invalid`/`disabled` styles the control:

```svelte
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" aria-invalid />
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Field>
```

## Control Selection

Use the right control for the interaction:

| Need                   | Use                    |
| ---------------------- | ---------------------- |
| Text input             | `Input`                |
| Option list            | `Select`               |
| Searchable options     | `Combobox`             |
| Native dropdown        | `Native Select`        |
| Boolean toggle         | `Switch` or `Checkbox` |
| Single choice from set | `Radio Group`          |
| 2–7 compact options    | `Toggle Group`         |
| Verification code      | `Input OTP`            |
| Multi-line text        | `Textarea`             |

## Toggle Group

Use the local `ToggleGroup.Root` / `ToggleGroup.Item` API. Check the local docs for the current prop shape — do not import upstream React assumptions about `type="single"` vs `type="multiple"`.
