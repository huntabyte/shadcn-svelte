---
title: Calendar
description: A calendar component that allows users to select dates.
component: true
source: https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/registry/default/ui/calendar
bits: https://www.bits-ui.com/docs/components/calendar
---

<script>
    import { ComponentPreview, ManualInstall } from '$components/docs';
</script>

<ComponentPreview name="calendar-demo">

<div />

</ComponentPreview>

## About

The `<Calendar />` component is built on top of the [Bits Calendar](https://www.bits-ui.com/docs/components/calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [Range Calendar](/docs/components/range-calendar) component.

## Installation

```bash
npx shadcn-svelte@latest add calendar
```

<ManualInstall>

1. Install `bits-ui` and `@internationalized/date`:

```bash
npm install bits-ui @internationalized/date
```

2. Copy and paste the component source files linked at the top of this page into your project.

</ManualInstall>
