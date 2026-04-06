# Component Composition

## Contents

- Namespace import pattern
- Items always inside their Group component
- Callouts use Alert
- Empty states use Empty component
- Toast notifications use sonner
- Choosing between overlay components
- Dialog, Sheet, and Drawer always need a Title
- Card structure
- Button has no isPending or isLoading prop
- Tabs.Trigger must be inside Tabs.List
- Avatar always needs Avatar.Fallback
- Use Separator instead of raw hr or border divs
- Use Skeleton for loading placeholders
- Use Badge instead of custom styled spans

---

## Namespace import pattern

shadcn-svelte components use namespace imports. Never use individual named imports for compound components.

**Incorrect:**

```svelte
<script lang="ts">
  import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogTitle,
  } from "$lib/components/ui/dialog/index.js";
</script>
```

**Correct:**

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

---

## Items always inside their Group component

Never render items directly inside the content container.

**Incorrect:**

```svelte
<Select.Content>
  <Select.Item value="apple" label="Apple">Apple</Select.Item>
  <Select.Item value="banana" label="Banana">Banana</Select.Item>
</Select.Content>
```

**Correct:**

```svelte
<Select.Content>
  <Select.Group>
    <Select.Item value="apple" label="Apple">Apple</Select.Item>
    <Select.Item value="banana" label="Banana">Banana</Select.Item>
  </Select.Group>
</Select.Content>
```

This applies to all group-based components:

| Item                                                          | Group                |
| ------------------------------------------------------------- | -------------------- |
| `Select.Item`, `Select.Label`                                 | `Select.Group`       |
| `DropdownMenu.Item`, `DropdownMenu.Label`, `DropdownMenu.Sub` | `DropdownMenu.Group` |
| `Menubar.Item`                                                | `Menubar.Group`      |
| `ContextMenu.Item`                                            | `ContextMenu.Group`  |
| `Command.Item`                                                | `Command.Group`      |

---

## Callouts use Alert

```svelte
<Alert.Root>
  <Alert.Title>Warning</Alert.Title>
  <Alert.Description>Something needs attention.</Alert.Description>
</Alert.Root>
```

---

## Empty states use Empty component

```svelte
<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import Folder from "@lucide/svelte/icons/folder";
</script>

<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon"><Folder /></Empty.Media>
    <Empty.Title>No projects yet</Empty.Title>
    <Empty.Description
      >Get started by creating a new project.</Empty.Description
    >
  </Empty.Header>
  <Empty.Content>
    <Button>Create Project</Button>
  </Empty.Content>
</Empty.Root>
```

---

## Toast notifications use sonner

```ts
import { toast } from "sonner";

toast.success("Changes saved.");
toast.error("Something went wrong.");
toast("File deleted.", {
  action: { label: "Undo", onClick: () => undoDelete() },
});
```

---

## Choosing between overlay components

| Use case                           | Component     |
| ---------------------------------- | ------------- |
| Focused task that requires input   | `Dialog`      |
| Destructive action confirmation    | `AlertDialog` |
| Side panel with details or filters | `Sheet`       |
| Mobile-first bottom panel          | `Drawer`      |
| Quick info on hover                | `HoverCard`   |
| Small contextual content on click  | `Popover`     |

---

## Dialog, Sheet, and Drawer always need a Title

`Dialog.Title`, `Sheet.Title`, `Drawer.Title` are required for accessibility. Use `class="sr-only"` if visually hidden.

```svelte
<Dialog.Content>
  <Dialog.Header>
    <Dialog.Title>Edit Profile</Dialog.Title>
    <Dialog.Description>Update your profile.</Dialog.Description>
  </Dialog.Header>
  ...
</Dialog.Content>
```

---

## Card structure

Use full composition — don't dump everything into `Card.Content`:

```svelte
<Card.Root>
  <Card.Header>
    <Card.Title>Team Members</Card.Title>
    <Card.Description>Manage your team.</Card.Description>
  </Card.Header>
  <Card.Content>...</Card.Content>
  <Card.Footer>
    <Button>Invite</Button>
  </Card.Footer>
</Card.Root>
```

---

## Button has no isPending or isLoading prop

Compose with `Spinner` + `disabled`:

```svelte
<Button disabled>
  <Spinner />
  Saving...
</Button>
```

---

## Tabs.Trigger must be inside Tabs.List

Never render `Tabs.Trigger` directly inside `Tabs.Root` — always wrap in `Tabs.List`:

```svelte
<Tabs.Root value="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">Password</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">...</Tabs.Content>
</Tabs.Root>
```

---

## Avatar always needs Avatar.Fallback

Always include `Avatar.Fallback` for when the image fails to load:

```svelte
<Avatar.Root>
  <Avatar.Image src="/avatar.png" alt="User" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>
```

---

## Use existing components instead of custom markup

| Instead of                                     | Use                              |
| ---------------------------------------------- | -------------------------------- |
| `<hr>` or `<div class="border-t">`             | `<Separator />`                  |
| `<div class="animate-pulse">` with styled divs | `<Skeleton class="h-4 w-3/4" />` |
| `<span class="rounded-full bg-green-100 ...">` | `<Badge variant="secondary">`    |

---

## Differences from shadcn/ui

- **Namespace imports** — shadcn-svelte uses `import * as Dialog from "..."` rather than named React imports. Sub-components are accessed as `Dialog.Root`, `Dialog.Trigger`, etc.
- **`class` not `className`** — all Svelte components use the `class` prop.
- **No `asChild` / `render` prop** — shadcn-svelte triggers accept a `class` prop for styling (e.g. `class={buttonVariants({ variant: "outline" })}`). There is no `asChild` or `render` wrapper pattern.
- **Svelte 5 syntax** — use `onclick` not `onClick`, `{@render children?.()}` not `{children}`.
- **`Select.Item` requires `label` prop** — for accessibility: `<Select.Item value="apple" label="Apple">`.
- **No `Empty` component from upstream** — shadcn-svelte ships its own `Empty` component with the same structure.
