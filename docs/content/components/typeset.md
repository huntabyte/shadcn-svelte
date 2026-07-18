---
title: Typeset
description: Apply consistent, readable typography to rich content.
component: true
---

## Installation

```bash
npx shadcn-svelte@latest add typeset
```

## Usage

```svelte
<script lang="ts">
  import { Typeset } from "$lib/components/ui/typeset";
</script>

<Typeset>
  <h1>Release notes</h1>
  <p>Rich text, links, lists, code blocks, tables, and media inherit a cohesive typographic treatment.</p>
</Typeset>
```

Use `Typeset` around trusted rendered markdown or article content.
