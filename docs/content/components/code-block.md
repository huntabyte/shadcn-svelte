---
title: Code Block
description: Displays code, terminal output and diffs with an optional header, line numbers and a copy button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/code-block
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
	import Step from "$lib/components/step.svelte";
</script>

<ComponentPreview name="code-block-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

`CodeBlock` displays code, terminal output, logs and diffs. It has a header with a title and actions, line numbers, wrapping, diff and highlighted lines, and a small size for tool output in a [Trace](/docs/components/trace).

Syntax highlighting is optional and lives in a separate hook, so a block that only shows plain output stays small.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="code-block" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `shiki`:

</Step>

<PMInstall command="shiki" />

<Step>

Install the required shadcn-svelte dependencies:

</Step>

<PMAddComp name="button use-highlighted-code" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

`code-block` also installs `useHighlightedCode` for [syntax highlighting](#syntax-highlighting).

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as CodeBlock from "$lib/components/ui/code-block/index.js";
</script>
```

```svelte showLineNumbers
<CodeBlock.Root>
  <CodeBlock.Header>
    <CodeBlock.Title>Terminal</CodeBlock.Title>
    <CodeBlock.Actions>
      <CodeBlock.CopyButton value={output} />
    </CodeBlock.Actions>
  </CodeBlock.Header>
  <CodeBlock.Content code={output} />
</CodeBlock.Root>
```

## Composition

```text
CodeBlock.Root
├── CodeBlock.Header
│   ├── CodeBlock.Title
│   └── CodeBlock.Actions
│       └── CodeBlock.CopyButton
├── CodeBlock.Actions (floating, when there is no header)
├── CodeBlock.Content
│   └── CodeBlock.Line
└── CodeBlock.Footer
```

`CodeBlock.Content` takes a `code` string or a list of `CodeBlock.Line` children. Use lines when you need line variants or highlighted tokens. Each `CodeBlock.Line` takes its own `code`: a string, or the tokens of a highlighted line.

## Features

- **It streams cheaply.** A `code` string renders as one text node, and the highlighter tokenizes only the new lines as code arrives.
- **It copies cleanly.** Line numbers and diff markers are left out of a selection, and blank lines survive the copy.
- **It reads left to right.** The content is always `dir="ltr"`. The header follows the page direction.
- **It highlights without WASM.** `useHighlightedCode` uses Shiki's JavaScript engine, loads each language on first use and renders ANSI colors in terminal output.
- **It fits where code shows up.** Use it in a message, a Trace line, Tabs or a Dialog.
- **It scrolls by keyboard.** The content is focusable, and floating actions show on focus as well as on hover.

## Basic

Pass a string to the `code` prop of `CodeBlock.Content`. It renders as one text node, so it stays cheap while output streams.

<ComponentPreview name="code-block-basic" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Header

`CodeBlock.Header` holds a `CodeBlock.Title` and `CodeBlock.Actions`. `CodeBlock.CopyButton` copies its `value`.

<ComponentPreview name="code-block-header" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

A long title truncates. To link the title to a file, wrap `CodeBlock.Title` in an anchor.

```svelte showLineNumbers
<CodeBlock.Header>
  <a href="/files/route.ts">
    <CodeBlock.Title>app/api/chat/route.ts</CodeBlock.Title>
  </a>
</CodeBlock.Header>
```

## Actions

`CodeBlock.Actions` holds any number of buttons. For a wrap toggle, keep the state yourself and pass it to `wrap`.

<ComponentPreview name="code-block-actions" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  let wrap = $state(false);
</script>

<CodeBlock.Actions>
  <Button
    variant="ghost"
    size="icon-xs"
    aria-label="Wrap lines"
    aria-pressed={wrap}
    onclick={() => (wrap = !wrap)}
  >
    <WrapTextIcon />
  </Button>
  <CodeBlock.CopyButton value={output} />
</CodeBlock.Actions>
<CodeBlock.Content {wrap} code={output} />
```

## Floating Actions

Without a header, put `CodeBlock.Actions` directly inside `CodeBlock.Root`. The actions float at the top end and stay hidden until the block is hovered or focused. They always show on touch screens.

<ComponentPreview name="code-block-floating-actions" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Line Numbers

Add `lineNumbers` to `CodeBlock.Content`. A `code` string is split into lines, and the numbers are not copied with a selection.

<ComponentPreview name="code-block-line-numbers" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Start Line

Set `startLine` to number lines from a given line, for a snippet from the middle of a file. The gutter grows to fit the widest number.

<ComponentPreview name="code-block-start-line" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Wrap

Long lines scroll by default. Add `wrap` to wrap them, which suits tool output and error messages. To let the reader toggle it, see [Actions](#actions).

<ComponentPreview name="code-block-wrap" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Highlighted Lines

Render each line as a `CodeBlock.Line` and set `variant="highlighted"` on the lines to call out.

<ComponentPreview name="code-block-highlighted-lines" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Diff

Set `variant="added"` or `variant="removed"` on a `CodeBlock.Line`. Each one adds a `+` or `−` marker.

<ComponentPreview name="code-block-diff" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Height

Cap the height with a `max-h-*` class on `CodeBlock.Content`. The content scrolls inside the block.

<ComponentPreview name="code-block-height" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

`CodeBlock.Content` fades its edges with [`scroll-fade`](/docs/utils/scroll-fade) as it scrolls: left and right by default, top and bottom when it wraps. Add `scroll-fade-y` to a capped block that does not wrap.

## Show More

`CodeBlock.Footer` is a slot below the content. For Show More, cap the content while it is collapsed and put a ghost `xs` `Button` in the footer.

<ComponentPreview name="code-block-show-more" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  let expanded = $state(false);
  const id = $props.id();
</script>

<CodeBlock.Content
  {id}
  class={expanded ? undefined : "max-h-64 overflow-y-hidden scroll-fade-y"}
  {code}
/>
<CodeBlock.Footer class="justify-center">
  <Button
    variant="ghost"
    size="xs"
    aria-expanded={expanded}
    aria-controls={id}
    onclick={() => (expanded = !expanded)}
  >
    {expanded ? "Show less" : "Show more"}
  </Button>
</CodeBlock.Footer>
```

### Max Height

To keep a long block from taking over the page, raise the cap instead of removing it. The expanded content scrolls, and the edges fade as you scroll.

<ComponentPreview name="code-block-show-more-scroll" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Size

Use `size="sm"` for tool and [Trace](#trace) output. It has tighter padding and `text-xs` text.

<ComponentPreview name="code-block-size" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Destructive

Use `variant="destructive"` for errors and failed output.

<ComponentPreview name="code-block-destructive" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Trace

Put a `CodeBlock.Root` with `size="sm"` in `Trace.CollapsibleContent` for tool and terminal output. Add `wrap` and a `max-h-64` class to `CodeBlock.Content` so long output wraps and scrolls inside the trace. The block sets its own text color, so `Trace.CollapsibleContent` does not mute it.

<ComponentPreview name="code-block-trace" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

See [Tool](/docs/ai-elements/tool), [Terminal](/docs/ai-elements/terminal) and [Stack Trace](/docs/ai-elements/stack-trace) for more examples.

## Tabs

Show several files with [Tabs](/docs/components/tabs), one `CodeBlock.Root` in each `Tabs.Content`.

<ComponentPreview name="code-block-tabs" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Message

Put a `CodeBlock.Root` between paragraphs inside a [Message](/docs/components/message).

<ComponentPreview name="code-block-chat" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

## Syntax Highlighting

`useHighlightedCode` highlights with [Shiki](https://shiki.style). Its `current` property has one entry per line. Pass each one to the `code` prop of a `CodeBlock.Line`.

<ComponentPreview name="code-block-highlighting" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  import { useHighlightedCode } from "$lib/hooks/use-highlighted-code.svelte.js";

  const lines = useHighlightedCode(
    () => code,
    () => "json"
  );
</script>

<CodeBlock.Root>
  <CodeBlock.Content>
    {#each lines.current as line, index (index)}
      <CodeBlock.Line code={line} />
    {/each}
  </CodeBlock.Content>
</CodeBlock.Root>
```

Shiki uses its JavaScript regex engine, so there is no WASM to load.

### Languages

Each language loads the first time it is used. Edit the list in `lib/highlighter.ts`. A language that is not in the list renders as plain text.

<ComponentPreview name="code-block-languages" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

The list ships with `bash`, `css`, `diff`, `html`, `javascript`, `json`, `jsx`, `markdown`, `python`, `sql`, `svelte`, `tsx`, `typescript` and `yaml`, plus aliases such as `ts`, `js`, `sh` and `yml`.

### Terminal Output

Pass `"ansi"` as the language to render the colors in terminal output. Without it, escape codes show as text.

<ComponentPreview name="code-block-ansi" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

ANSI colors do not carry from one line to the next.

### Server Rendering

`highlightCode` is async and returns plain data, so you can call it in a `load` function. Shiki then stays out of the client bundle.

```ts showLineNumbers title="src/routes/+page.server.ts"
import { highlightCode } from "$lib/highlighter.js";

const code = `export function add(a: number, b: number) {
  return a + b;
}`;

export async function load() {
  return {
    lines: (await highlightCode(code, "ts")) ?? code.split("\n"),
  };
}
```

```svelte showLineNumbers title="src/routes/+page.svelte"
<script lang="ts">
  import * as CodeBlock from "$lib/components/ui/code-block/index.js";

  let { data } = $props();
</script>

<CodeBlock.Root>
  <CodeBlock.Content lineNumbers>
    {#each data.lines as line, index (index)}
      <CodeBlock.Line code={line} />
    {/each}
  </CodeBlock.Content>
</CodeBlock.Root>
```

### Streaming

While the code streams, the hook tokenizes only the new lines, starting where the last line left off. Lines that did not change keep the same tokens, so Svelte skips them.

<ComponentPreview name="code-block-streaming" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

### Markdown

Render the message with [svelte-streamdown](https://github.com/beynar/svelte-streamdown) and route fenced code to a `CodeBlock` with `components.code`. Inline code goes through the `codespan` snippet, so it stays inline.

<ComponentPreview name="code-block-markdown" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

The `code` component gets `incomplete`, which is `true` until the closing fence arrives. Use it to disable the copy button while the code is incomplete.

```svelte showLineNumbers title="markdown-code-block.svelte"
<script lang="ts">
  import { useHighlightedCode } from "$lib/hooks/use-highlighted-code.svelte.js";
  import * as CodeBlock from "$lib/components/ui/code-block/index.js";

  let {
    token,
    incomplete,
  }: { token: { text: string; lang?: string }; incomplete: boolean } =
    $props();

  const language = $derived(token.lang?.split(/\s/)[0] ?? "");
  const lines = useHighlightedCode(
    () => token.text,
    () => language
  );
</script>

<CodeBlock.Root>
  <CodeBlock.Header>
    <CodeBlock.Title>{language || "text"}</CodeBlock.Title>
    <CodeBlock.Actions>
      <CodeBlock.CopyButton value={token.text} disabled={incomplete} />
    </CodeBlock.Actions>
  </CodeBlock.Header>
  <CodeBlock.Content>
    {#each lines.current as line, index (index)}
      <CodeBlock.Line code={line} />
    {/each}
  </CodeBlock.Content>
</CodeBlock.Root>
```

```svelte showLineNumbers
<Streamdown
  {content}
  controls={false}
  components={{ code: MarkdownCodeBlock }}
/>
```

## Accessibility

- `CodeBlock.Content` is a `pre` with a `code` element and always sets `dir="ltr"`, so code reads left to right on an RTL page.
- `CodeBlock.Content` has `tabindex={0}`, so keyboard users can focus it and scroll it. Pass `tabindex={-1}` to remove the tab stop.
- Floating actions show when focus is inside the block, not only on hover, so keyboard users can reach them.
- Line numbers are hidden from screen readers.
- Diff lines carry a `+` or `−` marker as well as a tint, so the change does not rely on color.
- `CodeBlock.CopyButton` is labelled "Copy", and a polite live region announces "Copied" after a successful copy.
- Give a wrap toggle `aria-pressed` so its state is announced.
- Give a Show More button `aria-expanded` and point `aria-controls` at the `id` of `CodeBlock.Content`.

## API Reference

### CodeBlock.Root

The surface that holds the header, the content and the footer.

| Prop      | Type                         | Default     | Description                                                     |
| --------- | ---------------------------- | ----------- | --------------------------------------------------------------- |
| `variant` | `"default" \| "destructive"` | `"default"` | The tone of the block.                                          |
| `size`    | `"default" \| "sm"`          | `"default"` | `"sm"` has tighter padding and `text-xs` code, for tool output. |
| `class`   | `string`                     | -           | Additional classes to apply to the block.                       |

### CodeBlock.Header

A row above the content for a title and actions.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the header. |

### CodeBlock.Title

A filename or a label, with an optional icon. It truncates.

| Prop    | Type     | Default | Description                               |
| ------- | -------- | ------- | ----------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the title. |

### CodeBlock.Actions

Holds buttons at the end of the header. As a direct child of `CodeBlock.Root`, it floats.

| Prop    | Type     | Default | Description                                 |
| ------- | -------- | ------- | ------------------------------------------- |
| `class` | `string` | -       | Additional classes to apply to the actions. |

### CodeBlock.CopyButton

A ghost icon button that copies `value` to the clipboard. It accepts the props of [`Button`](/docs/components/button).

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `value` | `string` | -       | Required. The text to copy.                |
| `class` | `string` | -       | Additional classes to apply to the button. |

### CodeBlock.Content

The `pre` that scrolls or wraps.

| Prop          | Type      | Default | Description                                                     |
| ------------- | --------- | ------- | --------------------------------------------------------------- |
| `code`        | `string`  | -       | Plain text to render. When it is set, `children` is ignored.    |
| `children`    | `Snippet` | -       | A list of `CodeBlock.Line`.                                     |
| `wrap`        | `boolean` | `false` | Wrap long lines instead of scrolling.                           |
| `lineNumbers` | `boolean` | `false` | Number each line. A `code` string is split into lines.          |
| `startLine`   | `number`  | `1`     | The number of the first line, when `lineNumbers` is set.        |
| `tabindex`    | `number`  | `0`     | Makes the content focusable so it can be scrolled by keyboard.  |
| `class`       | `string`  | -       | Additional classes to apply to the content, such as `max-h-72`. |

### CodeBlock.Line

One line of code.

| Prop      | Type                                                 | Default     | Description                                                                              |
| --------- | ---------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `variant` | `"default" \| "added" \| "removed" \| "highlighted"` | `"default"` | The state of the line.                                                                   |
| `code`    | `string \| CodeBlockLineToken[]`                     | -           | The line as plain text, or as highlighted tokens. When it is set, `children` is ignored. |
| `class`   | `string`                                             | -           | Additional classes to apply to the line.                                                 |

### CodeBlock.Footer

A row below the content, such as for a Show More button.

| Prop    | Type     | Default | Description                                |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | -       | Additional classes to apply to the footer. |

### useHighlightedCode

```ts
const lines = useHighlightedCode(
  () => code,
  () => language
);
```

Returns an object whose `current` property has one entry per line, for the `code` prop of `CodeBlock.Line`. Each entry is the line's tokens once highlighting finishes. It is a plain string until then, and for a language that is not in the list.

| Argument   | Type           | Description                                                 |
| ---------- | -------------- | ----------------------------------------------------------- |
| `code`     | `() => string` | The code to highlight. A trailing newline is ignored.       |
| `language` | `() => string` | A language or alias from `lib/highlighter.ts`, or `"ansi"`. |
