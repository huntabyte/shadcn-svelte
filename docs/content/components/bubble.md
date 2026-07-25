---
title: Bubble
description: Displays conversational content in a message bubble.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/bubble
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import Step from "$lib/components/step.svelte";
	import Steps from "$lib/components/steps.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="bubble-demo" />

`Bubble` displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions. Compose it inside [`Message`](/docs/components/message) when you also need avatars, metadata, and message-level layout.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="bubble" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore />
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as Bubble from "$lib/components/ui/bubble/index.js";
</script>

<Bubble.Root>
  <Bubble.Content>I removed the stale route.</Bubble.Content>
  <Bubble.Reactions><span>👍</span></Bubble.Reactions>
</Bubble.Root>
```

## Composition

```text
Bubble.Root
├── Bubble.Content
└── Bubble.Reactions
```

Use `Bubble.Group` to group consecutive bubbles from the same sender.

## Features

- Seven visual variants
- Start and end alignment
- Reactions with configurable side and alignment
- Content-sized bubbles with a safe maximum width
- Polymorphic content through a `child` snippet
- Class overrides on every part

## Variants

<ComponentPreview name="bubble-variants" />

| Variant       | Use                                                    |
| ------------- | ------------------------------------------------------ |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | A neutral conversation bubble.                         |
| `muted`       | Lower-emphasis supporting content.                     |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | Bordered secondary or rich content.                    |
| `ghost`       | Unframed assistant or rich content.                    |
| `destructive` | Errors and failed actions.                             |

## Alignment

Use `align` to place a bubble at the start or end of the conversation.

<ComponentPreview name="bubble-alignment" />

For complete chat layouts, prefer setting alignment on `Message.Root`.

## Bubble Group

Use `Bubble.Group` for consecutive bubbles from the same sender. Set `align` on each `Bubble.Root`, not the group.

<ComponentPreview name="bubble-group-demo" />

## Links and Buttons

Use the `child` snippet on `Bubble.Content` to render a real link or button.

<ComponentPreview name="bubble-link-button" />

```svelte
<Bubble.Root variant="muted">
  <Bubble.Content>
    {#snippet child({ props })}
      <button {...props} type="button" onclick={handleReply}>
        I forgot my password
      </button>
    {/snippet}
  </Bubble.Content>
</Bubble.Root>
```

## Reactions

Use `side` and `align` to position `Bubble.Reactions`. Reactions overlap the bubble edge, so leave enough vertical space between rows.

<ComponentPreview name="bubble-reactions" />

## Show More / Collapsible

Compose long content with [`Collapsible`](/docs/components/collapsible).

<ComponentPreview name="bubble-collapsible" />

## Tooltip

Use [`Tooltip`](/docs/components/tooltip) to reveal metadata such as a read receipt.

<ComponentPreview name="bubble-tooltip" />

## Popover

Use [`Popover`](/docs/components/popover) to reveal details such as a complete error.

<ComponentPreview name="bubble-popover" />

## Accessibility

### Labeling reactions

For static emoji, group the row with `role="img"` and a descriptive `aria-label`. For interactive reactions, render buttons and label icon-only controls.

```svelte
<Bubble.Reactions
  role="img"
  aria-label="Reactions: thumbs up, fire, and 8 more"
>
  <span>👍</span>
  <span>🔥</span>
  <span>+8</span>
</Bubble.Reactions>
```

### Interactive bubbles

Render clickable content as a real `<button>` or `<a>` through the `child` snippet. The visible text supplies its accessible name.

### Meaning beyond color

Pair variants with text, alignment, or icons. Keep error context in a destructive bubble rather than relying on color alone.

## API Reference

### Bubble.Root

| Prop      | Type                                                                                       | Default     |
| --------- | ------------------------------------------------------------------------------------------ | ----------- |
| `variant` | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` |
| `align`   | `"start" \| "end"`                                                                         | `"start"`   |
| `class`   | `string`                                                                                   |             |

### Bubble.Content

| Prop    | Type      | Default |
| ------- | --------- | ------- |
| `child` | `Snippet` |         |
| `class` | `string`  |         |

### Bubble.Reactions

| Prop    | Type                | Default    |
| ------- | ------------------- | ---------- |
| `side`  | `"top" \| "bottom"` | `"bottom"` |
| `align` | `"start" \| "end"`  | `"end"`    |
| `class` | `string`            |            |

### Bubble.Group

Groups consecutive bubbles and accepts standard `<div>` attributes.
