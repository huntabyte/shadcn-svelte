---
title: July 2026 - Introducing shadcn-svelte/typeset
description: A complete typography system for HTML, from blog posts to streaming chat. One CSS file you own.
date: 2026-07-10
---

<script>
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

Today we're releasing **shadcn-svelte/typeset**: a styling system for HTML and rendered markdown, in one CSS file.

Your app renders the same HTML elements everywhere: headings, paragraphs, lists, tables, and code. You style them for your blog, then your docs, and now chat. Typeset lets you style them once, then tune the rhythm for each context.

```svelte
<div class="typeset">{@html content}</div>
```

Add one class and everything inside gets styled. Typeset follows the size of its container, uses your theme, and gives you three controls: size, leading, and flow.

You can create as many typesets as you need. Use a tighter rhythm for chat and a roomier one for docs:

```css
.typeset-chat {
  --typeset-leading: 1.6;
  --typeset-flow: 1em;
}

.typeset-docs {
  --typeset-size: 15px;
  --typeset-leading: 1.75;
  --typeset-flow: 1.5em;
}
```

```svelte
<div class="typeset typeset-chat">{@html message}</div>
<article class="typeset typeset-docs">{@html page}</article>
```

It's also designed for streaming, so new blocks don't restyle earlier ones. The file lives in your project. There's no package or config layer to work around.

Open the [typeset builder](/typeset) to create yours, or read the [Typeset docs](/docs/typeset) for the full guide.

<div class="not-typeset mt-6 flex gap-2">
  <Button href="/typeset" size="sm">Build your typeset</Button>
  <Button href="/docs/typeset" size="sm" variant="outline">Read the docs</Button>
</div>
