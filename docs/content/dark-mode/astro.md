---
title: Astro
description: Adding dark mode to your Astro site.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
</script>

Just like in regular Svelte, we use the `class` strategy from Tailwind CSS to support dark mode toggling. See the [Tailwind CSS documentation](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) for more information.

How you add the `dark` class to the `html` element is up to you. In this guide, we'll take a look at enabling dark mode toggling with [mode-watcher](https://github.com/svecosystem/mode-watcher).

## Usage

<Steps>

### Create an inline theme script

This script will, in part, keep and track the dark mode value in `localStorage` and prevent [FUOC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

```astro title="src/pages/index.astro" {5-27} showLineNumbers
---
import "../styles/global.css";
---

<script is:inline>
  const isBrowser = typeof localStorage !== 'undefined';
  const getThemePreference = () => {
    if (isBrowser && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  };
  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (isBrowser) {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

### Install mode-watcher

<PMInstall command="mode-watcher@0.5.1" />

### Add the ModeWatcher component

Import the `ModeWatcher` component and use it in your page with the `client:load` directive:

```astro title="src/pages/index.astro" {3,9} showLineNumbers
---
import "../styles/global.css";
import { ModeWatcher } from "mode-watcher";
---

<!-- inline-script -->
<html lang="en">
	<body>
      <h1>Astro</h1>
      <ModeWatcher client:load />
	</body>
</html>
```

### Create a mode toggle

Create a mode toggle on your site to toggle between light and dark mode:

#### Light switch

<ComponentPreview name="dark-mode-light-switch">

<div></div>

</ComponentPreview>

#### Dropdown menu

<ComponentPreview name="dark-mode-dropdown-menu">

<div></div>

</ComponentPreview>

### Add mode toggle to page

Add the mode toggle to the page (also with the `client:load` directive):

```astro title="src/pages/index.astro" {4,12} showLineNumbers
---
import "../styles/global.css";
import { ModeWatcher } from "mode-watcher";
import ModeToggle from "$lib/components/mode-toggle.svelte";
---

<!-- inline-script -->
<html lang="en">
	<body>
      <h1>Astro</h1>
      <ModeWatcher client:load />
      <ModeToggle client:load />
	</body>
</html>
```

</Steps>
