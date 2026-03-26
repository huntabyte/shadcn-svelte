---
title: Date Picker
description: A date picker component with range and presets.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/examples/date-picker-demo.svelte
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

<ComponentPreview name="date-picker-demo">

<div></div>

</ComponentPreview>

## Installation

The Date Picker is built using a composition of the `<Popover />` and either the `<Calendar />` or `<RangeCalendar />` components.

See installation instructions for the [Popover](/docs/components/popover#installation), [Calendar](/docs/components/calendar#installation), and [Range Calendar](/docs/components/range-calendar#installation) components.

## Usage

```svelte showLineNumbers title="lib/components/example-date-picker.svelte"
<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value = $state<DateValue>();
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-start font-normal",
          !value && "text-muted-foreground"
        )}
        {...props}
      >
        <CalendarIcon class="me-2 size-4" />
        {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value type="single" initialFocus captionLayout="dropdown" />
  </Popover.Content>
</Popover.Root>
```

## Examples

### Basic

A basic date picker component.

<ComponentPreview name="date-picker-basic">

<div></div>

</ComponentPreview>

### Range Picker

A date picker component for selecting a range of dates.

<ComponentPreview name="date-picker-range">

<div></div>

</ComponentPreview>

### Date of Birth

A date picker component for selecting a date of birth. Includes a dropdown caption layout and closes on selection.

<ComponentPreview name="date-picker-dob">

<div></div>

</ComponentPreview>

### Picker with Input

A date picker component with an input field for selecting a date.

<ComponentPreview name="date-picker-input">

<div></div>

</ComponentPreview>

### Date and Time Picker

A date picker component with a time input field.

<ComponentPreview name="date-picker-time">

<div></div>

</ComponentPreview>

### Natural Language Picker

This component uses the `chrono-node` library to parse natural language dates.

<ComponentPreview name="date-picker-natural-language">

<div></div>

</ComponentPreview>
