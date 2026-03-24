# Component Composition

## Structural Rules

- Items must always be wrapped in their corresponding Group component (e.g., `Select.Item` inside `Select.Group`, `Tabs.Trigger` inside `Tabs.List`)
- `Dialog`, `Sheet`, and `Drawer` require accessible titles — use `Dialog.Title`, `Sheet.Title`, etc. Hide with `sr-only` class if needed visually
- `Avatar` components always need `Avatar.Fallback` for accessibility and error handling
- Cards should use full composition: `Card.Header`, `Card.Title`, `Card.Content`, `Card.Footer` — not everything dumped in `Card.Content`

## Namespace Import Pattern

Many components use namespace families with `Root` and subcomponents:

```svelte
<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
</script>

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>Update your details.</Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```

Do not rewrite this into React JSX patterns.

## Component Selection

Replace custom markup with built-in alternatives:

| Instead of               | Use         |
| ------------------------ | ----------- |
| Custom callout div       | `Alert`     |
| Empty state div          | `Empty`     |
| `<hr>` or border div     | `Separator` |
| Custom loading animation | `Skeleton`  |
| Styled span for status   | `Badge`     |
| Custom toast system      | `sonner`    |

## Overlay Selection

| Use case                     | Component     |
| ---------------------------- | ------------- |
| Focused task (confirm, edit) | `Dialog`      |
| Destructive confirmation     | `AlertDialog` |
| Side panel content           | `Sheet`       |
| Mobile-first bottom panel    | `Drawer`      |

## Loading States

Buttons don't have built-in loading props. Compose `Spinner` with `disabled` attribute:

```svelte
<Button disabled>
  <Spinner />
  Saving...
</Button>
```

## When Unsure

Inspect the component's `index.ts` barrel. It defines the supported family members and named export aliases.
