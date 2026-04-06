---
title: Input OTP
description: Accessible one-time password component with copy paste functionality.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/input-otp
  doc: https://bits-ui.com/docs/components/pin-input
  api: https://bits-ui.com/docs/components/pin-input#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="input-otp-demo">

<div></div>

</ComponentPreview>

## About

Input OTP is built on top of Bits UI's [PinInput](https://bits-ui.com/docs/components/pin-input) which is inspired by [@guilherme_rodz](https://twitter.com/guilherme_rodz)'s Input OTP component.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="input-otp" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui`:

</Step>

<PMInstall command="bits-ui -D" />

<Step>

Copy and paste the following code into your project.

</Step>
{#if viewerData}
	<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<Step>

Update the import paths to match your project setup.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>
```

```svelte showLineNumbers
<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

## Pattern

Use the `pattern` prop to restrict input to a specific pattern. The `REGEXP_ONLY_DIGITS` constant can be imported from `bits-ui`.

<ComponentPreview name="input-otp-pattern">

<div></div>

</ComponentPreview>

## Examples

### Separator

You can use the `InputOTP.Separator` component to add a separator between the groups of cells.

<ComponentPreview name="input-otp-separator">

<div></div>

</ComponentPreview>

### Disabled

Use the `disabled` prop to prevent user interaction with the input.

<ComponentPreview name="input-otp-disabled">

<div></div>

</ComponentPreview>

### Controlled

Use `bind:value` to control the input value programmatically.

<ComponentPreview name="input-otp-controlled">

<div></div>

</ComponentPreview>

### Invalid

Use the `aria-invalid` attribute on slots to display an error state.

<ComponentPreview name="input-otp-invalid">

<div></div>

</ComponentPreview>

### Four Digits

A common pattern for PIN codes using a 4-digit numeric input.

<ComponentPreview name="input-otp-four-digits">

<div></div>

</ComponentPreview>

### Alphanumeric

Use the `REGEXP_ONLY_DIGITS_AND_CHARS` pattern to accept both letters and numbers.

<ComponentPreview name="input-otp-alphanumeric">

<div></div>

</ComponentPreview>

### Form

Use the input in a form with a label and description.

<ComponentPreview name="input-otp-form">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/pin-input#api-reference) documentation for more information.
