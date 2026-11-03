---
title: File Tree
description: The files the agent changed, as a folder tree.
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
</script>

<ComponentPreview name="file-tree-demo" previewStyle="rhea" previewClassName="h-auto min-h-0">

<div></div>

</ComponentPreview>

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

<PMAddComp name="collapsible button" />

## Usage

Render nodes recursively. Nest each folder's children in its `Collapsible.Content`.

```svelte showLineNumbers
{#if node.type === "folder"}
  <Collapsible.Root open class="group/folder">
    <Collapsible.Trigger>
      {#snippet child({ props })}
        <Button
          {...props}
          variant="ghost"
          size="sm"
          class="w-full justify-start"
        >
          <ChevronRightIcon
            class="transition-transform group-data-[state=open]/folder:rotate-90"
          />
          <FolderIcon />
          {node.name}
        </Button>
      {/snippet}
    </Collapsible.Trigger>
    <Collapsible.Content>
      <div class="ml-4 flex flex-col">
        {#each node.children as child (child.path)}
          <FileTreeNode node={child} />
        {/each}
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
{/if}
```

```svelte showLineNumbers
<Button
  variant="ghost"
  size="sm"
  class="w-full justify-start"
  onclick={() => onSelect(node.path)}
>
  <FileIcon />
  {node.name}
</Button>
```

See [Collapsible](/docs/components/collapsible#file-tree).
