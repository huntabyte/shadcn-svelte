---
title: Sources
description: Displays the links the agent used for a reply.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="sources-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

Sources is a line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one.

Sources is built with `Trace` with a `Trace.Collapsible` for the list.

## Installation

Sources is built with the [Trace](/docs/components/trace) component.

<PMAddComp name="trace" />

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as Trace from "$lib/components/ui/trace/index.js";
</script>
```

```svelte showLineNumbers
<Trace.Root>
  <Trace.Collapsible>
    <Trace.CollapsibleTrigger>
      <Trace.Line>
        <Trace.Icon>
          <GlobeIcon />
        </Trace.Icon>
        <Trace.Title>Used {sources.length} sources</Trace.Title>
      </Trace.Line>
    </Trace.CollapsibleTrigger>
    <Trace.CollapsibleContent>
      <Trace.Root>
        {#each sources as source (source.sourceId)}
          <a href={source.url} target="_blank" rel="noreferrer">
            <Trace.Line>
              <Trace.Icon>
                <GlobeIcon />
              </Trace.Icon>
              <Trace.Title>
                {source.title ?? new URL(source.url).hostname}
                <span class="sr-only"> (opens in a new tab)</span>
              </Trace.Title>
              <Trace.Icon>
                <ArrowUpRightIcon />
              </Trace.Icon>
            </Trace.Line>
          </a>
        {/each}
      </Trace.Root>
    </Trace.CollapsibleContent>
  </Trace.Collapsible>
</Trace.Root>
```

## AI SDK

Collect the `source-url` parts of a message and render them after the text. The agent can cite the same page more than once, so dedupe them by `url`.

```ts showLineNumbers
const sources = $derived(
  message.parts
    .filter((part) => part.type === "source-url")
    .filter(
      (part, index, all) =>
        all.findIndex((other) => other.url === part.url) === index
    )
);
```

`title` is optional on a `source-url` part. Fall back to the hostname of the URL.

## Accessibility

Each source is a plain link inside the list.

- Links open in a new tab. Add `sr-only` text, like "(opens in a new tab)", so screen readers announce it.
- The arrow icon is decorative. The title is the name of the link.
- The count in the trigger, like "Used 3 sources", tells the person what opens before they open it.

## API Reference

See [Trace](/docs/components/trace#api-reference).
