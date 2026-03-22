# Forms & Inputs

These rules reflect the local `Field`, `Input Group`, and form control docs in `shadcn-svelte`.

## Build forms with the `Field` family

Prefer the `Field` primitives for accessible form composition:

```svelte
<Field.Field>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" type="email" />
  <Field.Description>We will never share it.</Field.Description>
</Field.Field>
```

For related fields:

- use `Field.Group` to stack fields
- use `Field.Set` and `Field.Legend` for semantic grouping
- use `orientation="horizontal"` or `orientation="responsive"` when the layout calls for it

## Validation uses both field and control state

Use `data-invalid` on the field wrapper and `aria-invalid` on the control.

```svelte
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" aria-invalid />
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Field>
```

## Use the `Input Group` family for embedded addons

When the design calls for inline icons, actions, or extra text around an input, use `InputGroup.Root` with its companion primitives:

- `InputGroup.Input`
- `InputGroup.Textarea`
- `InputGroup.Addon`
- `InputGroup.Button`
- `InputGroup.Text`

Do not assume the upstream React `InputGroupInput` naming. Verify the local barrel first.

## Use component-specific controls instead of ad hoc button rows

Prefer the documented controls for common cases:

- `Select` for option lists
- `Combobox` for searchable option lists
- `Native Select` when native behavior is desired
- `Switch` or `Checkbox` for booleans
- `Radio Group` for single-choice sets
- `Toggle Group` for compact toggle sets
- `Input OTP` for code entry
- `Textarea` for multi-line text

## Toggle Group API is local, not upstream

Use the local `ToggleGroup.Root` / `ToggleGroup.Item` API and check the docs for the current prop shape. Do not import upstream `base` vs `radix` assumptions.
