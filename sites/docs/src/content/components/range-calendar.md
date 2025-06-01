---
title: Range Calendar
description: A calendar component that allows users to select a range of dates.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/range-calendar
bits: https://www.bits-ui.com/docs/components/range-calendar
---

<script>
    import { ComponentPreview, ManualInstall, PMAddComp, PMInstall } from '$lib/components/docs';
</script>

<ComponentPreview name="range-calendar-demo">

<div />

</ComponentPreview>

## About

The `<RangeCalendar />` component is built on top of the [Bits Range Calendar](https://www.bits-ui.com/docs/components/range-calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

## Installation

<PMAddComp name="range-calendar" />

<ManualInstall>

1. Install `bits-ui` and `@internationalized/date`:

<PMInstall command="bits-ui @internationalized/date" />

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>
