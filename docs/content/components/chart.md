---
title: Chart
description: Beautiful charts. Built using LayerChart. Copy and paste into your apps.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/chart
---

<script>
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import ComponentSource from "$lib/components/component-source.svelte";
	import Callout from "$lib/components/callout.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InstallTabs from "$lib/components/install-tabs.svelte";
	import Step from "$lib/components/step.svelte";

	let { viewerData } = $props();
</script>

<ComponentPreview name="chart-demo" class="theme-blue -mt-2 [&_.preview]:p-0 [&_.preview>div]:w-full [&_.preview>div]:shadow-none [&_.preview>div]:border-none [&_.preview]:lg:min-h-[404px]" hideCode>

<div></div>

</ComponentPreview>

Introducing **Charts**. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with the other components and are fully customizable to fit your project.

[Browse the Charts Library](/charts).

## Component

We use [LayerChart](https://layerchart.com) under the hood.

We designed the `Chart` component with composition in mind. **You build your charts using LayerChart components and only bring in custom components, such as `ChartTooltip`, when and where you need it**

```svelte showLineNumbers /Chart.Container/ /Chart.Tooltip/
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { BarChart } from "layerchart";

  const data = [
    // ...
  ];
</script>

<Chart.Container>
  <BarChart {data} x="date" y="value">
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

We do not wrap LayerChart. This means you're not locked into an abstraction. When a new LayerChart version is released, you can follow the official upgrade path to upgrade your charts.

**The components are yours**.

## Installation

<InstallTabs>
{#snippet cli()}
<PMAddComp name="chart" />
{/snippet}
{#snippet manual()}
<Steps>

<Step>

Install `layerchart`:

</Step>

<PMInstall command="layerchart@latest -D" />

<Step>

Add the following colors to your CSS file

</Step>

```css title="src/app.css" showLineNumbers
:root {
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}

@theme inline {
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
}
```

<Step>

Copy and paste the following code into your project.

</Step>

</Steps>
{/snippet}
</InstallTabs>

## Your First Chart

Let's build your first chart. We'll build a bar chart with an axis, grid, tooltip, and legend.

<Steps>

### Start by defining your data

The following data represents the number of desktop and mobile users for each month.

<Callout class="mt-4">

**Note:** Your data can be in any shape. You are not limited to the shape of the data below. Use the `x` prop and `series` keys to map your data to the chart.

</Callout>

```svelte title="lib/components/example-chart.svelte" showLineNumbers
<script lang="ts">
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
</script>
```

### Define your chart config

The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons, and color tokens for theming.

```svelte title="lib/components/example-chart.svelte" showLineNumbers
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Build your chart

You can now build your chart using LayerChart components. We're using the `BarChart` component in this example, which is one of LayerChart's "Simplified Charts".

The example groups two bars per month. Set `props.bars.motion` to `Chart.defaultBarMotion` to grow the bars from the baseline while respecting reduced motion.

{#if viewerData}
<ComponentSource item={viewerData} data-llm-ignore/>
{/if}

<ComponentPreview name="chart-bar-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

</Steps>

### Add a Grid

Enable horizontal grid lines with `grid={{ x: false, y: true }}`.

<Steps>

<ComponentPreview name="chart-bar-grid-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

</Steps>

### Add an Axis

Set `axis="x"` to show month labels. Use `props.xAxis.format` to shorten each label to three letters.

<Steps>

<ComponentPreview name="chart-bar-axis-tick-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

</Steps>

### Add Tooltip

Enable the tooltip context by removing `tooltipContext={false}`. Render `Chart.Tooltip` in the `tooltip` snippet.

<Steps>

<ComponentPreview name="chart-bar-tooltip-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

</Steps>

### Add Legend

Set the `legend` prop to show the series labels and colors.

<Steps>

<ComponentPreview name="chart-bar-legend-demo" previewClassName="h-80">

<div></div>

</ComponentPreview>

</Steps>

Done. You've built your first chart! What's next?

- [Themes and Colors](/docs/components/chart#theming)
- [Tooltip](/docs/components/chart#tooltip)

## Chart Config

The chart config is where you define the labels, icons and colors for a chart.

It is intentionally decoupled from chart data.

This allows you to share config and color tokens between charts. It can also works independently for cases where your data or color tokens live remotely or in a different format.

```svelte
<script lang="ts">
  import MonitorIcon from "@lucide/svelte/icons/monitor";
  import * as Chart from "$lib/components/ui/chart/index.js";

  const chartConfig = {
    desktop: {
      label: "Desktop",
      icon: MonitorIcon,
      // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
      color: "#2563eb",
      // OR a theme object with 'light' and 'dark' keys
      theme: {
        light: "#2563eb",
        dark: "#dc2626",
      },
    },
  } satisfies Chart.ChartConfig;
</script>
```

## Theming

Charts has built-in support for theming. You can use css variables (recommended) or color values in any color format, such as hex, hsl, or oklch.

### CSS Variables

<Steps>

### Define your colors in your css file

```css {5-6,13-14} title="src/routes/layout.css" showLineNumbers
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
}
```

### Add the color to your `chartConfig`

```svelte {5,9} showLineNumbers
<script lang="ts">
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
  } satisfies Chart.ChartConfig;
</script>
```

</Steps>

### hex, hsl or oklch

You can also define your colors directly in the chart config. Use the color format you prefer.

```svelte showLineNumbers
<script lang="ts">
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Using Colors

To use the theme colors in your chart, reference the colors using the format `var(--color-KEY)`.

#### Components

```svelte
<Bar fill="var(--color-desktop)" />
```

#### Chart Data

```ts showLineNumbers
const chartData = [
  { browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, color: "var(--color-safari)" },
];
```

#### Tailwind

```svelte
<Label class="fill-(--color-desktop)" />
```

## Tooltip

A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.

<ComponentPreview name="chart-tooltip-demo" class="[&_.preview]:p-0" hideCode>

<div></div>

</ComponentPreview>

You can turn on/off any of these using the `hideLabel`, `hideIndicator` props and customize the indicator style using the `indicator` prop.

Use `labelKey` and `nameKey` to use a custom key for the tooltip label and name.

Chart comes with the `<Chart.Tooltip>` component. You can use this component to add custom tooltips to your chart.

### Props

Use the following props to customize the tooltip.

| Prop             | Type                     | Description                                             |
| :--------------- | :----------------------- | :------------------------------------------------------ |
| `labelKey`       | string                   | The config or data key to use for the label.            |
| `nameKey`        | string                   | The config or data key to use for the name.             |
| `indicator`      | `dot` `line` or `dashed` | The indicator style for the tooltip.                    |
| `hideLabel`      | boolean                  | Whether to hide the label.                              |
| `hideIndicator`  | boolean                  | Whether to hide the indicator.                          |
| `label`          | string                   | A custom label for the tooltip                          |
| `labelFormatter` | function                 | A function to format the label.                         |
| `formatter`      | Snippet                  | A snippet to provide flexible rendering of the tooltip. |

### Colors

Colors are automatically referenced from the chart config.

### Custom

To use a custom key for tooltip label and names, use the `labelKey` and `nameKey` props.

```svelte showLineNumbers /browser/
<script lang="ts">
  const chartData = [
    { browser: "chrome", visitors: 187, color: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, color: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Total Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;
</script>

<Chart.Tooltip labelKey="visitors" nameKey="browser" />
```

This will use `Total Visitors` for label and `Chrome` and `Safari` for the tooltip names.

## RTL

Set `dir="rtl"` on the container and enable `xReverse` on the chart to show categories from right to left.

<ComponentPreview name="chart-rtl-demo" previewClassName="min-h-92">

<div></div>

</ComponentPreview>
