---
title: Settings
description: A settings area with a grouped sub navigation, sections with a title and a description, and rows with a control.
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

<ComponentPreview name="settings-demo">

<div></div>

</ComponentPreview>

## Source

Settings is a composition of parts the fork already has, so there is no new control. The sub navigation is the pattern from the shadcn-svelte settings dialog block (`sidebar-13`): a `Sidebar.Provider` with a non collapsible `Sidebar.Root`, so it can sit inside a page that has its own sidebar. Section headers use `Field.Set`, `Field.Legend` and `Field.Description`. Rows use `Item`. The layout follows the Twenty settings screens (a grouped left nav, a centered column of sections).

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="settings" />
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

```svelte
<script lang="ts">
  import * as Settings from "$lib/components/ui/settings/index.js";
</script>
```

```svelte
<Settings.Root>
  <Settings.Nav>
    <Settings.NavGroup label="User">
      <Settings.NavItem active href="/settings/accounts">
        {#snippet icon()}<AtSignIcon />{/snippet}
        Accounts
        {#snippet sub()}
          <Settings.NavSubItem href="/settings/emails">Emails</Settings.NavSubItem>
        {/snippet}
      </Settings.NavItem>
    </Settings.NavGroup>
  </Settings.Nav>
  <Settings.Content>
    <Settings.Section title="Blocklist" description="Exclude people and domains.">
      <Settings.Row title="Emails" description="Set email visibility.">
        {#snippet children({ labelId, descriptionId })}
          <Switch aria-labelledby={labelId} aria-describedby={descriptionId} />
        {/snippet}
      </Settings.Row>
    </Settings.Section>
  </Settings.Content>
</Settings.Root>
```

## Parts

| Part | What it is |
| --- | --- |
| `Settings.Root` | The flex container. Give it a height. |
| `Settings.Nav` | The sub navigation. `width` sets its width (default 220 px). Hidden below `md`. It has its own Sidebar provider with the Cmd/Ctrl+B shortcut and the cookie turned off, so it can sit inside a page that has an app sidebar. |
| `Settings.NavGroup` | A heading (`label`) and a menu. |
| `Settings.NavItem` | A link with `href`, `active`, an `icon` snippet and an optional `sub` snippet for nested items. Extra attributes (`class`, `onclick`, `data-sveltekit-*`) go to the link. Without `href` it renders a button. |
| `Settings.NavSubItem` | A nested link, drawn with a tree line. |
| `Settings.Content` | The scrolling area, with a centered 44 rem column. `columnClass` styles the column. It is a `div`, so your app shell keeps the page's one `main`. |
| `Settings.Section` | A labelled `section` with a `title`, a `description` and optional `actions`, then the body. |
| `Settings.Row` | A `title` and `description` on the left, the control on the right. The control snippet receives `{ labelId, descriptionId }`; pass them as `aria-labelledby` and `aria-describedby` so the control has a name. |
