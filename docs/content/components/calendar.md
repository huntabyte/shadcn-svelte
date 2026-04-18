---
title: Calendar
description: A calendar component that allows users to select dates.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/docs/src/lib/registry/ui/calendar
  doc: https://bits-ui.com/docs/components/calendar
  api: https://bits-ui.com/docs/components/calendar#api-reference
---

<script>
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import Step from "$lib/components/step.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="calendar-demo" previewClassName="h-96">

<div></div>

</ComponentPreview>

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="calendar" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `bits-ui` and `@internationalized/date`:

</Step>

<PMInstall command="bits-ui @internationalized/date -D" />

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
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import type { DateValue } from "@internationalized/date";

  let date = $state<DateValue | undefined>(undefined);
</script>

<Calendar type="single" bind:value={date} class="rounded-lg border" />
```

## About

The `<Calendar />` component is built on top of the [Bits UI Calendar](https://www.bits-ui.com/docs/components/calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [Range Calendar](/docs/components/range-calendar) component.

## Date Picker

You can use the `<Calendar />` component to build a date picker. See the [Date Picker](/docs/components/date-picker) page for more information.

## Examples

### Basic

A basic calendar component with a border. We used `class="rounded-lg border"` to style the calendar.

<ComponentPreview name="calendar-basic" previewClassName="h-96">

<div></div>

</ComponentPreview>

### Range Calendar

Use the `RangeCalendar` component to enable range selection.

<ComponentPreview name="calendar-range" class="**:[.preview]:h-auto lg:**:[.preview]:h-[450px]" previewClassName="h-[36rem] md:h-96">

<div></div>

</ComponentPreview>

### Month and Year Selector

Use `captionLayout="dropdown"` to show month and year dropdowns.

<ComponentPreview name="calendar-caption" previewClassName="h-96">

<div></div>

</ComponentPreview>

### Presets

<ComponentPreview name="calendar-presets" class="**:[.preview]:h-[650px]" previewClassName="h-[650px]">

<div></div>

</ComponentPreview>

### Date and Time Picker

<ComponentPreview name="calendar-time" class="**:[.preview]:h-[600px]" previewClassName="h-[600px]">

<div></div>

</ComponentPreview>

### Booked Dates

<ComponentPreview name="calendar-booked-dates" previewClassName="h-96">

<div></div>

</ComponentPreview>

### Custom Cell Size

A calendar with custom cell content — useful for showing prices or other per-day data.

<ComponentPreview name="calendar-custom-days" description="A calendar with custom cell size that's responsive." class="**:[.preview]:h-[560px]">

<div></div>

</ComponentPreview>

<!--You can customize the size of calendar cells using the `--cell-size` CSS variable. You can also make it responsive by using breakpoint-specific values:

```svelte showLineNumbers
<RangeCalendar
  mode="single"
  selected={date}
  onSelect={setDate}
  class="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
/>
```

Or use fixed values:

```svelte showLineNumbers
<RangeCalendar
  mode="single"
  selected={date}
  onSelect={setDate}
  class="rounded-lg border [--cell-size:2.75rem] md:[--cell-size:3rem]"
/>
```-->

### Week Numbers

<!--Use `showWeekNumber` to show week numbers.-->

<ComponentPreview name="calendar-week-numbers" previewClassName="h-96">

<div></div>

</ComponentPreview>

## API Reference

See the [Bits UI](https://bits-ui.com/docs/components/calendar#api-reference) documentation for more information.
