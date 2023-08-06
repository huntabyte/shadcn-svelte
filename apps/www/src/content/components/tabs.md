---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/ui/tabs
radix: https://www.radix-svelte.com/docs/tabs
external:
  project: Radix Svelte
  url: https://www.radix-svelte.com/docs/tabs
---

<script>
  import { TabsDemo, ComponentExample, ManualInstall } from '$lib/components/docs';
</script>

<ComponentExample src="src/lib/components/docs/examples/tabs/TabsDemo.svelte">

<div slot="example">
<TabsDemo />
</div>

</ComponentExample>

## Installation

```bash
npx shadcn-svelte add tabs
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
  import * as Tabs from "$components/ui/tabs";
</script>

<Tabs value="account" class="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```
