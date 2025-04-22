---
title: Range Calendar
description: A calendar component that allows users to select a range of dates.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/main/sites/docs/src/lib/registry/default/ui/range-calendar
  doc: https://bits-ui.com/docs/components/range-calendar
  api: https://bits-ui.com/docs/components/range-calendar#api-reference
---

<script>
    import { ComponentPreview, PMAddComp, PMInstall, Step, Steps, InstallTabs } from '$lib/components/docs';
</script>

<ComponentPreview name="range-calendar-demo">

<div></div>

</ComponentPreview>

## About

The `<RangeCalendar />` component is built on top of the [Bits Range Calendar](https://www.bits-ui.com/docs/components/range-calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="range-calendar" />
{/snippet}
{#snippet manual()}
<Steps>
<Step>

Install `bits-ui` and `@internalized/date`:

</Step>
<PMInstall command="bits-ui @internationalized/date -D" />
<Step>Copy and paste the component source files linked at the top of this page into your project.</Step>
</Steps>
{/snippet}
</InstallTabs>
