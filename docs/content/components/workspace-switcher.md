---
title: Workspace switcher
description: A workspace menu for the top of the sidebar. The company logo or initial, its name, a caret, and a list of the user's workspaces.
component: true
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="workspace-switcher-demo">

<div></div>

</ComponentPreview>

## Source

Ported from the shadcn-svelte sidebar block `sidebar-07`, its `TeamSwitcher`: a `Sidebar.MenuButton` that opens a `DropdownMenu` of the user's workspaces with an add row at the bottom. Changes: a radio group, so the current workspace is a `menuitemradio` with a check; `Alt+1` to `Alt+9` shortcuts (not while the user is typing in a field); a logo or an initial from `Avatar`; a bold caret; and the Twenty look, a small logo and the name on one line with the menu opening below the button. It does not touch auth. Your app lists the workspaces (for example the user's organizations) and reacts to `onValueChange`.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="workspace-switcher" />
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

Put it in `Sidebar.Header`.

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { WorkspaceSwitcher } from "$lib/components/ui/workspace-switcher/index.js";

  let current = $state("advena");

  // Your app: switch the active workspace (for example with Better Auth's organization.setActive).
  function switchWorkspace(id: string) {}

  const workspaces = [
    { id: "advena", name: "Advena Group", logo: "/logos/advena.png" },
    { id: "vwork", name: "vwork Digital" },
  ];
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Header>
    <WorkspaceSwitcher
      {workspaces}
      bind:value={current}
      onValueChange={(id) => switchWorkspace(id)}
      onCreate={() => goto("/workspaces/new")}
    />
  </Sidebar.Header>
</Sidebar.Root>
```

## Props

| Prop                   | What it does                                                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `workspaces`           | `{ id, name, logo?, plan? }[]`. Without a `logo` the first letter of the name is shown. A `plan` adds a second line and makes the button taller.                        |
| `value`                | The id of the current workspace, bindable. Defaults to the first one.                                                                                                   |
| `onValueChange`        | Called with the id when the user picks another workspace.                                                                                                               |
| `onCreate`             | Called by the last row. Without it the row is not shown.                                                                                                                |
| `createLabel`, `label` | The text of the last row ("Create workspace") and of the list heading ("Workspaces").                                                                                   |
| `shortcuts`            | `Alt+1` to `Alt+9` switch to the first nine workspaces (default on). Cmd or Ctrl plus a digit belong to the browser's tabs, so the shortcut uses Alt (Option on a Mac). |

## Collapsed

In a `collapsible="icon"` sidebar the button shrinks to the logo. The name is hidden, the menu still works, and on a phone the sidebar is a sheet with the same button at the top.
