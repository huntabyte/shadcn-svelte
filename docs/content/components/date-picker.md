---
title: Date Picker
description: A date picker component with range and presets.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/examples/date-picker-demo.svelte
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
</script>

<ComponentPreview name="calendar-22">

<div></div>

</ComponentPreview>

## Installation

The Date Picker is built using a composition of the `<Popover />` and either the `<Calendar />` or `<RangeCalendar />` components.

See installations instructions for the [Popover](/docs/components/popover#installation), [Calendar](/docs/components/calendar#installation), and [Range Calendar](/docs/components/range-calendar#installation) components.

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

### Date of Birth Picker

<ComponentPreview name="calendar-22" description="A calendar with date of birth picker." >

<div></div>

</ComponentPreview>

### Picker with Input

<ComponentPreview name="calendar-28" description="A calendar with input and picker." >

<div></div>

</ComponentPreview>

### Date and Time Picker

<ComponentPreview name="calendar-24" description="A calendar with date and time picker." >
<div></div>

</ComponentPreview>

### Natural Language Picker

This component uses the `chrono-node` library to parse natural language dates.

<ComponentPreview name="calendar-29" description="A calendar with natural language picker.">

<div></div>

</ComponentPreview>
