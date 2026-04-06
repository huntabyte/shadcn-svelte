# Forms & Inputs

## Contents

- Forms use Field.Group + Field.Field
- InputGroup requires InputGroup.Input/InputGroup.Textarea
- Buttons inside inputs use InputGroup + InputGroup.Addon
- Option sets (2–7 choices) use ToggleGroup
- Field.Set + Field.Legend for grouping related fields
- Field validation and disabled states

---

## Forms use Field.Group + Field.Field

Always use `Field.Group` + `Field.Field` — never raw `div` with `space-y-*`:

```svelte
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<Field.Group>
  <Field.Field>
    <Field.Label for="email">Email</Field.Label>
    <Input id="email" type="email" />
  </Field.Field>
  <Field.Field>
    <Field.Label for="password">Password</Field.Label>
    <Input id="password" type="password" />
  </Field.Field>
</Field.Group>
```

Use `orientation="horizontal"` for settings pages. Use `class="sr-only"` on `Field.Label` for visually hidden labels.

**Choosing form controls:**

- Simple text input → `Input`
- Dropdown with predefined options → `Select`
- Searchable dropdown → `Combobox`
- Native HTML select (no JS) → `NativeSelect`
- Boolean toggle → `Switch` (for settings) or `Checkbox` (for forms)
- Single choice from few options → `RadioGroup`
- Toggle between 2–5 options → `ToggleGroup`
- OTP/verification code → `InputOTP`
- Multi-line text → `Textarea`

---

## InputGroup requires InputGroup.Input/InputGroup.Textarea

Never use raw `Input` or `Textarea` inside an `InputGroup`.

**Incorrect:**

```svelte
<InputGroup.Root>
  <Input placeholder="Search..." />
</InputGroup.Root>
```

**Correct:**

```svelte
<script lang="ts">
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
</script>

<InputGroup.Root>
  <InputGroup.Input placeholder="Search..." />
</InputGroup.Root>
```

---

## Buttons inside inputs use InputGroup + InputGroup.Addon

Never place a `Button` directly inside or adjacent to an `Input` with custom positioning.

**Incorrect:**

```svelte
<div class="relative">
  <Input placeholder="Search..." class="pr-10" />
  <Button class="absolute top-0 right-0" size="icon">
    <Search />
  </Button>
</div>
```

**Correct:**

```svelte
<script lang="ts">
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import Search from "@lucide/svelte/icons/search";
</script>

<InputGroup.Root>
  <InputGroup.Input placeholder="Search..." />
  <InputGroup.Addon>
    <Button size="icon">
      <Search />
    </Button>
  </InputGroup.Addon>
</InputGroup.Root>
```

---

## Option sets (2–7 choices) use ToggleGroup

Don't manually loop `Button` components with active state.

**Incorrect:**

```svelte
<script lang="ts">
  let selected = $state("daily");
</script>

<div class="flex gap-2">
  {#each ["daily", "weekly", "monthly"] as option}
    <Button
      variant={selected === option ? "default" : "outline"}
      onclick={() => (selected = option)}
    >
      {option}
    </Button>
  {/each}
</div>
```

**Correct:**

```svelte
<script lang="ts">
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup spacing={2}>
  <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
  <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
  <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
</ToggleGroup>
```

Combine with `Field.Field` for labelled toggle groups:

```svelte
<Field.Field orientation="horizontal">
  <Field.Title id="theme-label">Theme</Field.Title>
  <ToggleGroup aria-labelledby="theme-label" spacing={2}>
    <ToggleGroupItem value="light">Light</ToggleGroupItem>
    <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
    <ToggleGroupItem value="system">System</ToggleGroupItem>
  </ToggleGroup>
</Field.Field>
```

---

## Field.Set + Field.Legend for grouping related fields

Use `Field.Set` + `Field.Legend` for related checkboxes, radios, or switches — not `div` with a heading:

```svelte
<Field.Set>
  <Field.Legend variant="label">Preferences</Field.Legend>
  <Field.Description>Select all that apply.</Field.Description>
  <Field.Group class="gap-3">
    <Field.Field orientation="horizontal">
      <Checkbox id="dark" />
      <Field.Label for="dark" class="font-normal">Dark mode</Field.Label>
    </Field.Field>
  </Field.Group>
</Field.Set>
```

---

## Field validation and disabled states

Both attributes are needed — `data-invalid`/`data-disabled` styles the field (label, description), while `aria-invalid`/`disabled` styles the control.

```svelte
<!-- Invalid. -->
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" aria-invalid />
  <Field.Error>Invalid email address.</Field.Error>
</Field.Field>

<!-- Disabled. -->
<Field.Field data-disabled>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" disabled />
</Field.Field>
```

Works for all controls: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup.Item`, `Switch`, `Slider`, `NativeSelect`, `InputOTP`.

---

## Differences from shadcn/ui

- **Namespace imports** — `Field.Group`, `Field.Field`, `Field.Label` etc. via `import * as Field from "..."`.
- **`for` not `htmlFor`** — `Field.Label` uses the standard HTML `for` attribute.
- **`class` not `className`** — all Svelte components use the `class` prop.
- **`Field.Error` not `FieldDescription` for errors** — use `Field.Error` for validation messages, `Field.Description` for hints.
- **No `FieldGroup` flat import** — use the namespace pattern; flat exports like `FieldGroup` exist as aliases but namespace imports are preferred.
- **ToggleGroup has no `type` prop** — no `type="single"` or `type="multiple"`. Use a `multiple` boolean prop for multi-selection; single selection is the default.
- **Svelte 5 event syntax** — use `onclick` not `onClick`.
