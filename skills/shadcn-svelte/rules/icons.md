# Icons

Prefer the icon library documented by the local component docs and manual install guides.

## Default local assumption

When local docs show an icon package explicitly, use that package. The current docs repeatedly reference `@lucide/svelte`.

Do not import `lucide-react`.

## Buttons already handle icon spacing

Local button docs state that the spacing between an icon and text is handled automatically. Do not add manual margin classes unless the user asks for a custom layout.

```svelte
<Button variant="outline" size="sm">
  <IconGitBranch />
  New Branch
</Button>
```

## Avoid redundant sizing classes inside styled components

The local button implementation already styles nested `svg` elements. Avoid adding icon sizing utilities inside buttons unless there is a specific custom requirement.

## Verify component-specific icon behavior in source

If icon alignment or styling matters, inspect the installed component source before changing icon classes. The local `button.svelte` implementation is a good example of component-owned icon sizing behavior.
