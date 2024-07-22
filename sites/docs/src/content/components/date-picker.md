---
title: Date Picker
description: A date picker component with range and presets.
component: true
source: https://github.com/huntabyte/shadcn-svelte/blob/main/sites/docs/src/lib/registry/default/example/date-picker-demo.svelte
---

<script>
    import { ComponentPreview, ManualInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="date-picker-demo">

<div />

</ComponentPreview>

## Installation

The Date Picker is built using a composition of the `<Popover />` and either the `<Calendar />` or `<RangeCalendar />` components.

See installations instructions for the [Popover](/docs/components/popover#installation), [Calendar](/docs/components/calendar#installation), and [Range Calendar](/docs/components/range-calendar#installation) components.

## Usage

```svelte
<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import * as Popover from "$lib/components/ui/popover";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value: DateValue | undefined = undefined;
</script>

<Popover.Root openFocus>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        "w-[280px] justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value initialFocus />
  </Popover.Content>
</Popover.Root>
```

## Examples

### Date Picker

<ComponentPreview name="date-picker-demo">

<div />

</ComponentPreview>

### Date Range Picker

<ComponentPreview name="date-picker-with-range">

<div />

</ComponentPreview>

### With Presets

<ComponentPreview name="date-picker-with-presets">

<div />

</ComponentPreview>

### Form

<ComponentPreview name="date-picker-form">

<div />

</ComponentPreview>
