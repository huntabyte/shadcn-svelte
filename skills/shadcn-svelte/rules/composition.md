# Component Composition

These rules are verified against the local docs and component barrels. Keep Svelte composition aligned with the documented `shadcn-svelte` structure.

## Prefer the documented component family structure

Many components are namespaced families with `Root` and subcomponents:

```svelte
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

Do not rewrite this into upstream React JSX patterns.

## Group item-based components correctly

When the local component family provides a grouping primitive, keep items inside it.

Verified local examples include:

- `Select.Group` around `Select.Item`
- `Tabs.List` around `Tabs.Trigger`
- `Field.Group` around related `Field.Field` blocks

## Dialog, Sheet, and Drawer need titles

Keep `Title` and `Description` in overlay headers unless the installed source clearly supports an intentional alternative.

## Use shipped components instead of custom markup

Prefer the local component when a documented equivalent exists:

- use `Alert` for callouts
- use `Empty` for empty states
- use `Separator` instead of ad hoc rules
- use `Skeleton` for loading placeholders
- use `Badge` for small status chips
- use `sonner` for toast notifications

## Avatar needs a fallback

When using `Avatar`, include `Avatar.Fallback` unless there is a strong reason not to.

## Tabs use the full family

Keep `Tabs.Trigger` inside `Tabs.List` and pair it with `Tabs.Content`.

## Inspect the barrel when unsure

If composition is unclear, inspect the component's `index.ts` barrel. The barrel defines the supported local family members and named export aliases.
