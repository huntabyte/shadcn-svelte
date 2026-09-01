---
title: Typeset
description: A styling system for HTML and rendered markdown, from blog posts to streaming chat. One CSS file you own.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/typeset
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

Typeset styles headings, paragraphs, lists, tables, code, and other rendered HTML inside a single container. The installed `typeset.css` file lives in your project, so you can edit it directly.

<ComponentPreview name="typeset-demo" align="start" previewClass="h-auto">

<div></div>

</ComponentPreview>

## Installation

```bash
npx shadcn-svelte@latest add typeset
```

## Usage

```svelte
<script lang="ts">
  import { Typeset } from "$lib/components/ui/typeset/index.js";
</script>

<Typeset class="typeset-docs">
  {@html renderedMarkdown}
</Typeset>
```

The component imports the colocated `typeset.css` file and adds the `typeset` class.

## Rhythm

Most of the reading rhythm comes from three custom properties:

```css
.typeset-docs {
  --typeset-font-body: var(--font-geist);
  --typeset-font-heading: var(--font-geist);
  --typeset-font-mono: var(--font-geist-mono);
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.5em;
}
```

- `--typeset-size` controls body text size and follows the surrounding layout by default.
- `--typeset-leading` controls line height.
- `--typeset-flow` controls the space between blocks.

You can keep multiple presets for different contexts:

```css
.typeset-chat {
  --typeset-leading: 1.6;
  --typeset-flow: 1em;
}

.typeset-reading {
  --typeset-font-body: var(--font-lora);
  --typeset-font-heading: var(--font-lora);
  --typeset-size: 18px;
  --typeset-leading: 1.9;
  --typeset-flow: 2em;
}
```

## Responsive tables

Tables remain real tables and wrap to fit. Wrap a wide table or other block in `typeset-scroll` to scroll it horizontally:

```svelte
<div class="typeset-scroll">
  <table>...</table>
</div>
```

## Overrides

Typeset lives in the `components` layer and uses low-specificity selectors. Tailwind utilities and ordinary CSS selectors can override it without `!important`.

```svelte
<Typeset>
  <p class="text-lg">Larger text</p>
</Typeset>
```

## Opting out

Add `not-typeset` or `data-not-typeset` to leave a component and its descendants untouched:

```svelte
<Typeset>
  <p>Styled prose.</p>
  <Card class="not-typeset">Untouched component.</Card>
</Typeset>
```

## Streaming

Typeset uses start-side flow margins and avoids forward-looking layout selectors such as `:last-child`, `:has()`, and `:empty`. Appending a streamed block therefore does not restyle blocks that are already on screen.
