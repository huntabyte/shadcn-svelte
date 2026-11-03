---
title: Sidebar
description: A composable, themeable and customizable sidebar component.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/sidebar
---

<script>
	import ComponentPreview from '$lib/components/component-preview.svelte';
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	let { viewerData } = $props();
	import DocsFigure from "$lib/components/docs-figure.svelte";
	import Callout from "$lib/components/callout.svelte";
</script>

<DocsFigure caption="A sidebar that collapses to icons.">
<ComponentPreview type="block" name="demo-sidebar-icon" title="Sidebar" class="w-full">

<div></div>

</ComponentPreview>
</DocsFigure>

Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts.

We now have a solid foundation to build on top of. Composable. Themeable. Customizable.

[Browse the Blocks Library](/blocks).

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="sidebar" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers title="src/routes/+layout.svelte"
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
```

```svelte showLineNumbers title="src/lib/components/app-sidebar.svelte"
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
```

## Structure

- **Sidebar.Provider** — Handles collapsible state and provides sidebar context to child components.
- **Sidebar.Root** — The main collapsible sidebar panel.
- **Sidebar.Header** — Sticky at the top; use for branding, titles, or workspace switchers.
- **Sidebar.Footer** — Sticky at the bottom; use for user menus, settings, or actions.
- **Sidebar.Content** — Scrollable region between the header and footer.
- **Sidebar.Group** — Groups related navigation with optional label, action, and content areas.
- **Sidebar.Menu** / **Sidebar.MenuItem** — Menu structure for links, badges, actions, and nested submenus.
- **Sidebar.Rail** — Resize handle for adjusting sidebar width when applicable.
- **Sidebar.Inset** — Wraps main content when using the `inset` variant.
- **Sidebar.Trigger** — Control that toggles the sidebar open or collapsed.

<img src="/img/sidebar/sidebar-structure.png" width="716" height="420" alt="Sidebar structure" class="border dark:hidden rounded-lg overflow-hidden mt-6 w-full" />

<img src="/img/sidebar/sidebar-structure-dark.png" width="716" height="420" alt="Sidebar structure" class="border hidden dark:block rounded-lg overflow-hidden mt-6 w-full" />

## Sidebar.Provider

The `Sidebar.Provider` component is used to provide the sidebar context to the `Sidebar.Root` component. You should always wrap your application in a `Sidebar.Provider` component.

### Props

| Name           | Type                      | Description                                                                                                                             |
| -------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `open`         | `boolean`                 | Open state of the sidebar (bindable).                                                                                                   |
| `onOpenChange` | `(open: boolean) => void` | A callback fired _after_ the open state of the sidebar changes if uncontrolled, and _before_ the sidebar opens or closes if controlled. |

### Width

If you have a single sidebar in your application, you can use the `SIDEBAR_WIDTH` and `SIDEBAR_WIDTH_MOBILE` constants in `constants.ts` to set the width of the sidebar.

```ts showLineNumbers title="src/lib/components/ui/sidebar/constants.ts"
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
```

For multiple sidebars in your application, you can use the `--sidebar-width` and `--sidebar-width-mobile` CSS variables in the `style` prop.

```svelte showLineNumbers
<Sidebar.Provider
  style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;"
>
  <Sidebar.Root />
</Sidebar.Provider>
```

### Keyboard Shortcut

To trigger the sidebar, you use the `cmd+b` keyboard shortcut on Mac and `ctrl+b` on Windows.

```ts showLineNumbers title="src/lib/components/ui/sidebar/constants.ts"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
```

## Sidebar.Root

The main `Sidebar.Root` component used to render a collapsible sidebar.

### Props

| Property      | Type                              | Description                       |
| ------------- | --------------------------------- | --------------------------------- |
| `side`        | `left` or `right`                 | The side of the sidebar.          |
| `variant`     | `sidebar`, `floating`, or `inset` | The variant of the sidebar.       |
| `collapsible` | `offcanvas`, `icon`, or `none`    | Collapsible state of the sidebar. |

| Prop        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `offcanvas` | A collapsible sidebar that slides in from the left or right. |
| `icon`      | A sidebar that collapses to icons.                           |
| `none`      | A non-collapsible sidebar.                                   |

<Callout>

**Note:** If you use the `inset` variant, remember to wrap your main content in a `Sidebar.Inset` component.

</Callout>

```svelte showLineNumbers
<Sidebar.Provider>
  <Sidebar.Root variant="inset" />
  <Sidebar.Inset>
    <main>
      {@render children?.()}
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
```

## useSidebar

The `useSidebar` function is used to control the sidebar. It returns a reactive class instance, so it _cannot_ be destructured. Additionally, it must be called during the lifecycle of the component.

```svelte showLineNumbers
<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";

  const sidebar = useSidebar();

  sidebar.state;
  sidebar.open;
  sidebar.setOpen(true);
  sidebar.openMobile;
  sidebar.setOpenMobile(true);
  sidebar.isMobile;
  sidebar.toggle();
</script>
```

| Property        | Type                      | Description                                   |
| --------------- | ------------------------- | --------------------------------------------- |
| `state`         | `expanded` or `collapsed` | The current state of the sidebar.             |
| `open`          | `boolean`                 | Whether the sidebar is open.                  |
| `setOpen`       | `(open: boolean) => void` | Sets the open state of the sidebar.           |
| `openMobile`    | `boolean`                 | Whether the sidebar is open on mobile.        |
| `setOpenMobile` | `(open: boolean) => void` | Sets the open state of the sidebar on mobile. |
| `isMobile`      | `boolean`                 | Whether the sidebar is on mobile.             |
| `toggle`        | `() => void`              | Toggles the sidebar. Desktop and mobile.      |

## Sidebar.Header

Use the `Sidebar.Header` component to add a sticky header to the sidebar.

```svelte showLineNumbers title="src/lib/components/app-sidebar.svelte"
<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton {...props}>
                Select Workspace
                <ChevronDown class="ms-auto" />
              </Sidebar.MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <span>Acme Inc</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
</Sidebar.Root>
```

## Sidebar.Footer

Use the `Sidebar.Footer` component to add a sticky footer to the sidebar.

```svelte showLineNumbers
<Sidebar.Root>
  <Sidebar.Footer>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          <User2 /> Username
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
```

## Sidebar.Content

The `Sidebar.Content` component is used to wrap the content of the sidebar. This is where you add your `Sidebar.Group` components. It is scrollable.

```svelte showLineNumbers
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
</Sidebar.Root>
```

## Sidebar.Group

Use the `Sidebar.Group` component to create a section within the sidebar.

A `Sidebar.Group` has a `Sidebar.GroupLabel`, a `Sidebar.GroupContent` and an optional `Sidebar.GroupAction`.

```svelte showLineNumbers
<Sidebar.Group>
  <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
  <Sidebar.GroupAction>
    <Plus /> <span class="sr-only">Add Project</span>
  </Sidebar.GroupAction>
  <Sidebar.GroupContent></Sidebar.GroupContent>
</Sidebar.Group>
```

To make a `Sidebar.Group` collapsible, wrap it in a `Collapsible`.

```svelte showLineNumbers
<Collapsible.Root open class="group/collapsible">
  <Sidebar.Group>
    <Sidebar.GroupLabel>
      {#snippet child({ props })}
        <Collapsible.Trigger {...props}>
          Help
          <ChevronDown
            class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
          />
        </Collapsible.Trigger>
      {/snippet}
    </Sidebar.GroupLabel>
    <Collapsible.Content>
      <Sidebar.GroupContent />
    </Collapsible.Content>
  </Sidebar.Group>
</Collapsible.Root>
```

## Sidebar.Menu

The `Sidebar.Menu` component is used for building a menu within a `Sidebar.Group`.

<img src="/img/sidebar/sidebar-menu.png" width="716" height="420" alt="Sidebar menu" class="border dark:hidden rounded-lg overflow-hidden mt-6 w-full" />

<img src="/img/sidebar/sidebar-menu-dark.png" width="716" height="420" alt="Sidebar menu" class="border hidden dark:block rounded-lg overflow-hidden mt-6 w-full" />

```svelte showLineNumbers
<Sidebar.Menu>
  {#each projects as project (project.name)}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton>
        {#snippet child({ props })}
          <a href={project.url} {...props}>
            <project.icon />
            <span>{project.name}</span>
          </a>
        {/snippet}
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  {/each}
</Sidebar.Menu>
```

## Sidebar.MenuButton

The `Sidebar.MenuButton` component is used to render a menu button within a `Sidebar.MenuItem`.

By default, the `Sidebar.MenuButton` renders a button but you can use the `child` snippet to render a different element such as an `<a>` tag.

Use the `isActive` prop to mark a menu item as active.

```svelte showLineNumbers
<Sidebar.MenuButton isActive>
  {#snippet child({ props })}
    <a href="##" {...props}>Home</a>
  {/snippet}
</Sidebar.MenuButton>
```

## Sidebar.MenuAction

The `Sidebar.MenuAction` component is used to render a menu action within a `Sidebar.MenuItem`.

```svelte showLineNumbers
<Sidebar.MenuItem>
  <Sidebar.MenuButton>
    {#snippet child({ props })}
      <a href="##" {...props}>
        <House />
        <span>Home</span>
      </a>
    {/snippet}
  </Sidebar.MenuButton>
  <Sidebar.MenuAction>
    <Plus /> <span class="sr-only">Add Project</span>
  </Sidebar.MenuAction>
</Sidebar.MenuItem>
```

## Sidebar.MenuSub

The `Sidebar.MenuSub` component is used to render a submenu within a `Sidebar.Menu`.

```svelte showLineNumbers
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuSub>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton />
    </Sidebar.MenuSubItem>
  </Sidebar.MenuSub>
</Sidebar.MenuItem>
```

## Sidebar.MenuBadge

The `Sidebar.MenuBadge` component is used to render a badge within a `Sidebar.MenuItem`.

```svelte showLineNumbers
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuBadge>24</Sidebar.MenuBadge>
</Sidebar.MenuItem>
```

## Sidebar.MenuSkeleton

The `Sidebar.MenuSkeleton` component is used to render a skeleton for a `Sidebar.Menu`.

```svelte showLineNumbers
<Sidebar.Menu>
  {#each Array.from({ length: 5 }) as _, index (index)}
    <Sidebar.MenuItem>
      <Sidebar.MenuSkeleton />
    </Sidebar.MenuItem>
  {/each}
</Sidebar.Menu>
```

## Sidebar.Trigger

Use the `Sidebar.Trigger` component to render a button that toggles the sidebar.

```svelte showLineNumbers
<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";

  const sidebar = useSidebar();
</script>

<button onclick={() => sidebar.toggle()}>Toggle Sidebar</button>
```

## Sidebar.Rail

The `Sidebar.Rail` component is used to render a rail within a `Sidebar.Root`. This rail can be used to toggle the sidebar.

```svelte showLineNumbers
<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
  <Sidebar.Rail />
</Sidebar.Root>
```

## Controlled Sidebar

Use `bind:open` to control the sidebar.

```svelte showLineNumbers
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  let open = $state(false);
</script>

<Sidebar.Provider bind:open>
  <Sidebar.Root />
</Sidebar.Provider>
```

## Theming

We use the following CSS variables to theme the sidebar.

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

## Styling

Here are some tips for styling the sidebar based on different states.

```svelte
<Sidebar.Root collapsible="icon">
  <Sidebar.Content>
    <Sidebar.Group class="group-data-[collapsible=icon]:hidden" />
  </Sidebar.Content>
</Sidebar.Root>
```

```svelte
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuAction
    class="peer-data-[active=true]/menu-button:opacity-100"
  />
</Sidebar.MenuItem>
```
