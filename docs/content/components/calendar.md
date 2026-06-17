---
title: Calendar
description: A calendar component that allows users to select dates.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/calendar
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

<ComponentPreview name="calendar-demo">

<div></div>

</ComponentPreview>

## Blocks

We have built a collection of 30+ calendar blocks that you can use to build your own calendar components.

See call calendar blocks in the [Blocks Library](/blocks/calendar) page.

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

## About

The `<Calendar />` component is built on top of the [Bits UI Calendar](https://www.bits-ui.com/docs/components/calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

If you're looking for a range calendar, check out the [Range Calendar](/docs/components/range-calendar) component.

## Date Picker

You can use the `<Calendar />` component to build a date picker. See the [Date Picker](/docs/components/date-picker) page for more information.

## Examples

### Range Calendar

<ComponentPreview name="calendar-02" class="**:[.preview]:h-auto lg:**:[.preview]:h-[450px]">

<div></div>

</ComponentPreview>

### Month and Year Selector

<ComponentPreview name="calendar-13">

<div></div>

</ComponentPreview>

### Date of Birth Picker

<ComponentPreview name="calendar-22">

<div></div>

</ComponentPreview>

### Date and Time Picker

<ComponentPreview name="calendar-24">

<div></div>

</ComponentPreview>

### Natural Language Picker

This component uses the `chrono-node` library to parse natural language dates.

<ComponentPreview name="calendar-29">

<div></div>

</ComponentPreview>

## Upgrade Guide

You can upgrade to the latest version of the `<Calendar />` component by running the following command:

<PMAddComp name="calendar" />

When you're prompted to overwrite the existing files, select `Yes`. **If you have made any changes to the `Calendar` component, you will need to merge your changes with the new version.**

#### Installing Blocks

After upgrading the `Calendar` component, you can add the new blocks with the following:

<PMAddComp name="calendar-02" />

This will add the latest version of the calendar blocks.
