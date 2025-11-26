---
title: Button
description: Displays a button or a component that looks like a button.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/button
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData, links } = $props();
</script>

<ComponentPreview name="button-demo" class="mb-4">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Button variant="outline">Button</Button>
<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUpIcon />
</Button>
```

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="button" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button variant="outline">Button</Button>
```

## Examples

### Size

<ComponentPreview name="button-size" class="mb-4" >

<div></div>

</ComponentPreview>

```svelte
<!-- Small -->
<Button size="sm" variant="outline">Small</Button>
<Button size="icon-sm" aria-label="Submit" variant="outline">
  <ArrowUpRightIcon />
</Button>

<!-- Medium -->
<Button variant="outline">Default</Button>
<Button size="icon" aria-label="Submit" variant="outline">
  <ArrowUpRightIcon />
</Button>

<!-- Large -->
<Button size="lg" variant="outline">Large</Button>
<Button size="icon-lg" aria-label="Submit" variant="outline">
  <ArrowUpRightIcon />
</Button>
```

### Default

<ComponentPreview name="button-default" description="A primary button" class="mb-4">

<div></div>

</ComponentPreview>

```svelte
<Button>Button</Button>
```

### Outline

<ComponentPreview name="button-outline" description="A button using the outline variant." class="mb-4">
  
<div></div>

</ComponentPreview>

```svelte
<Button variant="outline">Outline</Button>
```

### Secondary

<ComponentPreview name="button-secondary" description="A secondary button" class="mb-4">
  
<div></div>
  
</ComponentPreview>

```svelte
<Button variant="secondary">Secondary</Button>
```

### Ghost

<ComponentPreview name="button-ghost" description="A button using the ghost variant" class="mb-4">
  
<div></div>

</ComponentPreview>

```svelte
<Button variant="ghost">Ghost</Button>
```

### Destructive

<ComponentPreview name="button-destructive" description="A destructive button" class="mb-4">

<div></div>

</ComponentPreview>

```svelte
<Button variant="destructive">Destructive</Button>
```

### Link

<ComponentPreview name="button-link" description="A button using the link variant." class="mb-4">

<div></div>

</ComponentPreview>

```svelte
<Button variant="link">Link</Button>
```

### Icon

<ComponentPreview name="button-icon" description="An icon button" class="mb-4">

<div></div>

</ComponentPreview>

```svelte
<Button variant="outline" size="icon" aria-label="Submit">
  <CircleFadingArrowUpIcon />
</Button>
```

### With Icon

The spacing between the icon and the text is automatically adjusted based on the size of the button. You do not need any margin on the icon.

<ComponentPreview name="button-with-icon" description="A button with an icon" class="mb-4">

<div></div>

</ComponentPreview>

```svelte
<Button variant="outline" size="sm">
  <IconGitBranch /> New Branch
</Button>
```

### Rounded

Use the `rounded-full` class to make the button rounded.

<ComponentPreview name="button-rounded" class="mb-4" >

<div></div>

</ComponentPreview>

```svelte
<Button variant="outline" size="icon" className="rounded-full">
  <ArrowUpRightIcon />
</Button>
```

### Spinner

<ComponentPreview name="button-loading" description="A button with a loading state." class="mb-4">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<Button size="sm" variant="outline" disabled>
  <Spinner />
  Submit
</Button>
```

### Button Group

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) documentation for more details.

<ComponentPreview name="button-group-demo" class="mb-4" >

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<ButtonGroup.Root>
  <ButtonGroup.Root class="hidden sm:flex">
    <Button variant="outline" size="icon" aria-label="Go Back">
      <ArrowLeft />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline">Archive</Button>
    <Button variant="outline">Report</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline">Snooze</Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="icon"
            aria-label="More Options"
          >
            <MoreHorizontal />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" class="w-52">
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <MailCheck />
            Mark as Read
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Archive />
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Clock />
            Snooze
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CalendarPlus />
            Add to Calendar
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListFilter />
            Add to List
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Tag />
              Label As...
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.RadioGroup bind:value={label}>
                <DropdownMenu.RadioItem value="personal">
                  Personal
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="work"
                  >Work</DropdownMenu.RadioItem
                >
                <DropdownMenu.RadioItem value="other"
                  >Other</DropdownMenu.RadioItem
                >
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item class="text-destructive focus:text-destructive">
            <Trash2 />
            Trash
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Link

You can convert the `<button>` into an `<a>` element by simply passing an `href` as a prop.

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button href="/dashboard">Dashboard</Button>
```

Alternatively, you can use the `buttonVariants` helper to create a link that looks like a button.

```svelte
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
</script>

<a href="/dashboard" class={buttonVariants({ variant: "outline" })}>
  Dashboard
</a>
```

### [API Reference](https://bits-ui.com/docs/components/button#api-reference)
