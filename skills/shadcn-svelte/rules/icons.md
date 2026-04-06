# Icons

**Always use the project's configured `iconLibrary` for imports.** Check `components.json` for the `iconLibrary` field. The shadcn-svelte default is `@lucide/svelte`.

---

## Use per-icon imports from @lucide/svelte

Import individual icons by path — not from the package root.

**Incorrect:**

```svelte
<script lang="ts">
  import { Search } from "@lucide/svelte";
</script>
```

**Correct:**

```svelte
<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
</script>
```

Per-icon imports avoid bundling the entire icon set.

---

## No sizing classes on icons inside components

Components handle icon sizing via CSS. Don't add `size-4`, `w-4 h-4`, or other sizing classes to icons inside `Button`, `DropdownMenu.Item`, `Alert`, `Sidebar*`, or other shadcn-svelte components. Unless the user explicitly asks for custom icon sizes.

**Incorrect:**

```svelte
<Button variant="outline" size="sm">
  <Search class="size-4" />
  Search
</Button>

<DropdownMenu.Item>
  <Settings class="mr-2 size-4" />
  Settings
</DropdownMenu.Item>
```

**Correct:**

```svelte
<Button variant="outline" size="sm">
  <Search />
  Search
</Button>

<DropdownMenu.Item>
  <Settings />
  Settings
</DropdownMenu.Item>
```

---

## Pass icons as component objects, not string keys

Use `icon={Check}`, not a string key to a lookup map.

**Incorrect:**

```svelte
<script lang="ts">
  const iconMap = { check: Check, alert: AlertCircle };
</script>

<StatusBadge icon="check" />
```

**Correct:**

```svelte
<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import type { Component } from "svelte";

  let { icon: Icon }: { icon: Component } = $props();
</script>

<Icon />
```

```svelte
<!-- Usage -->
<StatusBadge icon={Check} />
```

---

## Differences from shadcn/ui

- **`@lucide/svelte` not `lucide-react`** — import icons from `@lucide/svelte/icons/<name>`, not `lucide-react`.
- **No `data-icon` attribute** — shadcn-svelte does not use `data-icon="inline-start"` / `data-icon="inline-end"`. Icons in buttons are placed directly as children.
- **`Component` type not `React.ComponentType`** — use `import type { Component } from "svelte"` for icon prop types.
- **Per-icon import path** — `import Search from "@lucide/svelte/icons/search"` (path-based), not a named export from the package root.
