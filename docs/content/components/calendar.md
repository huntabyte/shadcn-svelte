---
title: Calendar
description: A calendar component that allows users to select a date or a range of dates.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/calendar
  doc: https://bits-ui.com/docs/components/calendar
  api: https://bits-ui.com/docs/components/calendar#api-reference
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

<ComponentPreview name="calendar-demo">

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

</Steps>
{/snippet}
</InstallTabs>

## Usage

```svelte showLineNumbers
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = $state(today(getLocalTimeZone()));
</script>
```

```svelte showLineNumbers
<Calendar type="single" bind:value class="rounded-lg border" />
```

See the [Bits UI Calendar](https://bits-ui.com/docs/components/calendar) documentation for more information.

## About

The `<Calendar />` component is built on top of the [Bits UI Calendar](https://bits-ui.com/docs/components/calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

## Date Picker

You can use the `<Calendar />` component to build a date picker. See the [Date Picker](/docs/components/date-picker) page for more information.

## Persian / Hijri / Jalali Calendar

Shadcn's Persian example uses the Persian calendar, also called the Solar Hijri or Jalali calendar. In Svelte, pass a `PersianCalendar` date value instead of replacing a DayPicker import.

<ComponentPreview name="persian-calendar-demo" previewClassName="h-[400px]">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  import "@fontsource-variable/vazirmatn/index.css";
  import { CalendarDate, PersianCalendar } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = $state(new CalendarDate(new PersianCalendar(), 1404, 3, 22));
</script>

<div lang="fa" style="font-family: 'Vazirmatn Variable', sans-serif;">
  <Calendar
    type="single"
    bind:value
    locale="fa-IR"
    numerals="arabext"
    dir="rtl"
    weekdayFormat="narrow"
    class="rounded-lg border"
  />
</div>
```

`locale` supplies localized weekday and month names. `numerals` selects the numbering system using `Intl.NumberFormat`, including day cells and the month/year controls. No handwritten weekday labels, digit tables, or custom day snippet is needed. Use `arabext` for Persian digits, `arab` for Arabic digits, or `latn` for Latin digits.

The Islamic Hijri calendar is a different calendar system. For example, use `IslamicUmalquraCalendar` with an Islamic locale:

<ComponentPreview name="hijri-calendar-demo" previewClassName="h-[400px]">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  import {
    CalendarDate,
    IslamicUmalquraCalendar,
    toCalendar,
  } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = $state(
    toCalendar(new CalendarDate(2025, 6, 12), new IslamicUmalquraCalendar())
  );
</script>

<Calendar
  type="single"
  bind:value
  locale="ar-SA-u-ca-islamic-umalqura"
  numerals="arab"
  dir="rtl"
  weekdayFormat="narrow"
  class="rounded-lg border"
/>
```

Other calendar systems can be selected with the same [@internationalized/date calendar API](https://react-spectrum.adobe.com/internationalized/date/Calendar.html).

## Selected Date (With TimeZone)

The Svelte Calendar uses `CalendarDate` values, which represent a calendar date without a time zone. Keep the selected value as a `CalendarDate`; when you need a JavaScript `Date`, convert it with `value.toDate(timeZone)` to get midnight in that time zone.

<ComponentPreview name="calendar-with-timezone" previewClassName="h-[440px]">

<div></div>

</ComponentPreview>

```svelte showLineNumbers
<script lang="ts">
  import { onMount } from "svelte";
  import {
    CalendarDate,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = $state<CalendarDate>();
  let placeholder = $state<CalendarDate>();
  let timeZone = $state<string>();
  const selectedDate = $derived(
    value && timeZone ? value.toDate(timeZone) : undefined
  );

  onMount(() => {
    timeZone = getLocalTimeZone();
    placeholder = today(timeZone);
  });
</script>

{#if timeZone}
  <Calendar
    type="single"
    bind:value
    bind:placeholder
    class="rounded-lg border"
  />
{/if}

{#if selectedDate && timeZone}
  <time datetime={selectedDate.toISOString()}>
    {selectedDate.toLocaleDateString(undefined, { timeZone })}
  </time>
{/if}
```

**Note:** Avoid converting the selected date with `new Date(value.toString())`: a date-only ISO string is interpreted as UTC and may appear on the previous day in another time zone. Use `value.toDate(timeZone)` instead. The time zone is applied during conversion; Bits UI does not expose React DayPicker's `timeZone` prop.

**Why client-side?** Detect the user's time zone in `onMount`, then initialize the visible month with `today(timeZone)`. This avoids using the server's time zone during server-side rendering and keeps the initial calendar month correct for the user.

## Basic

A basic calendar component. We used `class="rounded-lg border"` to style the calendar.

<ComponentPreview name="calendar-basic">

<div></div>

</ComponentPreview>

## Range Calendar

Use the [`RangeCalendar`](/docs/components/range-calendar) component to enable range selection.

<ComponentPreview name="calendar-range">

<div></div>

</ComponentPreview>

## Month and Year Selector

Use `captionLayout="dropdown"` to show month and year dropdowns.

<ComponentPreview name="calendar-caption">

<div></div>

</ComponentPreview>

## Presets

<ComponentPreview name="calendar-presets">

<div></div>

</ComponentPreview>

## Date and Time Picker

<ComponentPreview name="calendar-time">

<div></div>

</ComponentPreview>

## Booked dates

<ComponentPreview name="calendar-booked-dates">

<div></div>

</ComponentPreview>

## Custom Cell Size

<ComponentPreview name="calendar-custom-days" class="**:[.preview]:min-h-[560px]">

<div></div>

</ComponentPreview>

You can customize the size of calendar cells using the `--cell-size` CSS variable. You can also make it responsive by using breakpoint-specific values:

```svelte showLineNumbers
<Calendar
  type="single"
  bind:value
  class="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
/>
```

Or use fixed values:

```svelte showLineNumbers
<Calendar
  type="single"
  bind:value
  class="rounded-lg border [--cell-size:2.75rem] md:[--cell-size:3rem]"
/>
```

## RTL

To enable RTL support in shadcn-svelte, see the [RTL configuration guide](/docs/rtl).

Calendar and RangeCalendar currently use chronological horizontal arrow keys even in RTL: Left moves to the previous day and Right moves to the next. Locale labels, visual layout, and navigation buttons follow the configured locale and direction.

See also the [Bits UI Calendar documentation](https://bits-ui.com/docs/components/calendar) for localization and calendar-system support, including Persian / Hijri / Jalali calendars.

<ComponentPreview name="calendar-rtl" direction="rtl" previewClassName="h-96">

<div></div>

</ComponentPreview>

When using RTL, pass both the `locale` and `dir` props to the Calendar component. Bits UI accepts a locale string, so no locale import is needed:

```svelte showLineNumbers
<script lang="ts">
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let date = $state();
</script>

<Calendar
  type="single"
  bind:value={date}
  locale="ar-SA"
  dir="rtl"
  weekdayFormat="narrow"
/>
```

## Changelog

### RTL Support

If you're upgrading from a previous version of the `Calendar` component, review the following updates for RTL support. The Svelte component already forwards the `locale` string to its calendar and month/year controls; keep that existing behavior.

<Steps>

<Step>Set the calendar locale and direction.</Step>

```svelte
<Calendar
  type="single"
  bind:value={date}
  locale="ar-SA"
  dir="rtl"
  weekdayFormat="narrow"
/>
```

<Step>Update RTL-aware CSS classes.</Step>

Replace directional classes with logical properties in your copied calendar and range-calendar components:

```diff
- [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)
+ [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)
- [&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)
- [&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)

- data-[range-start]:rounded-l-(--cell-radius)
+ data-[range-start]:rounded-s-(--cell-radius)
- data-[range-end]:rounded-r-(--cell-radius)
+ data-[range-end]:rounded-e-(--cell-radius)
```

Use `after:end-0` for range-start decorations and `after:start-0` for range-end decorations. The `migrate rtl` command updates these classes.

<Step>Flip navigation icons once.</Step>

In `calendar-prev-button.svelte` and `calendar-next-button.svelte`, remove `rtl:rotate-180` from the button wrapper if it is present. Apply it to the fallback icon instead. When installing with `rtl: true`, the CLI converts the icon's `cn-rtl-flip` marker for you. Keeping a flip on both the wrapper and icon would cancel out the direction change.

</Steps>

After applying these changes, you can use the `locale` prop to provide locale-specific formatting:

```svelte
<Calendar type="single" bind:value={date} locale="en-US" />
```
