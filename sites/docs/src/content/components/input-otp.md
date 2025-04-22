---
title: Input OTP
description: Accessible one-time password component with copy paste functionality.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/input-otp
  doc: https://bits-ui.com/docs/components/pin-input
  api: https://bits-ui.com/docs/components/pin-input#api-reference
---

<script>
	import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
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
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

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

## Examples

### Pattern

Use the `pattern` prop to define a custom pattern for the OTP input.

<ComponentPreview name="input-otp-pattern">

<div></div>

</ComponentPreview>

```svelte showLineNumbers {3,6}
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <!-- ... -->
</InputOTP.Root>
```

### Separator

You can use the `InputOTP.Separator` component to add a separator between the groups of cells.

<ComponentPreview name="input-otp-separator">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={4}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 2) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(2, 4) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Form

<ComponentPreview name="input-otp-form">

<div></div>

</ComponentPreview>
