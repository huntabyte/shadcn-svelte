---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/src/lib/components/ui/switch
radix: https://www.radix-svelte.com/docs/switch
---

<script>
  import { SwitchDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/switch/SwitchDemo.svelte">

<div slot="example">
<SwitchDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-ui add switch
```

<ManualInstall>

1. Install `radix-svelte`:

```bash
npm install radix-svelte
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>

## Usage

```svelte
<script lang="ts">
  import { Switch } from "$components/ui/switch";
</script>
```

```svelte
<Switch />
```
