# Icons

## 1. Use the Project's Icon Library

Always import from the project's configured icon library. The shadcn-svelte docs and components use `@lucide/svelte`:

```svelte
<script lang="ts">
  import GitBranch from "@lucide/svelte/icons/git-branch";
</script>
```

Do not import from `lucide-react` or assume any other package.

## 2. Component-Managed Sizing

Don't add `size-4`, `w-4 h-4`, or other sizing classes to icons inside `Button`, `DropdownMenu.Item`, `Alert`, `Sidebar*`, or other shadcn-svelte components. Components handle icon sizing through their own CSS.

```svelte
<!-- correct -->
<Button variant="outline" size="sm">
  <GitBranch />
  New Branch
</Button>

<!-- wrong — don't add sizing classes -->
<Button variant="outline" size="sm">
  <GitBranch class="size-4" />
  New Branch
</Button>
```

## 3. Pass Icons as Components

Use the actual icon component, not string keys:

```svelte
<!-- correct -->
<MyComponent icon={GitBranch} />

<!-- wrong -->
<MyComponent icon="git-branch" />
```

This provides better type safety and clarity.

## When in Doubt

Inspect the installed component source. The local `button.svelte` implementation is a good example of component-owned icon sizing behavior.
