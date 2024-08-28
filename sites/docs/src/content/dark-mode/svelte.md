---
title: Dark mode
description: Adding dark mode to your Svelte site.
---

<script>
  import { Steps, ComponentPreview, PMInstall } from "$lib/components/docs";
</script>

We use the `class` strategy from Tailwind CSS to support dark mode toggling. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) for more information.

How you add the ` dark` class to the `html` element is up to you. In this guide, we will take a look at enabling dark mode toggling with [mode-watcher](https://github.com/svecosystem/mode-watcher).

## Usage

<Steps>

### Install mode-watcher

Start by installing `mode-watcher`:

<PMInstall command="mode-watcher" />

### Add the ModeWatcher component

Import the `ModeWatcher` component and use it in your root layout:

```svelte title="src/routes/+layout.svelte"
<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />
```

### Add a mode toggle

Place a mode toggle on your site to toggle between light and dark mode.

#### Light switch

<ComponentPreview name="dark-mode-light-switch">

<div />

</ComponentPreview>

#### Dropdown menu

<ComponentPreview name="dark-mode-dropdown-menu">

<div />

</ComponentPreview>

</Steps>
