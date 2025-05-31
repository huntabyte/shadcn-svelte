---
title: Svelte
description: Adding dark mode to your Svelte site.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
</script>

<Steps>

## Install mode-watcher

Start by installing `mode-watcher`:

<PMInstall command="mode-watcher" />

## Add the ModeWatcher component

Import the `ModeWatcher` component and use it in your root layout:

```svelte title="src/routes/+layout.svelte" showLineNumbers {3,7}
<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script>

<ModeWatcher />
{@render children?.()}
```

## Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

<ComponentPreview name="dark-mode-light-switch">

<div></div>

</ComponentPreview>

<ComponentPreview name="dark-mode-dropdown-menu">

<div></div>

</ComponentPreview>

</Steps>
