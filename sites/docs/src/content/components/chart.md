---
title: Chart
description: Beautiful charts. Built using Recharts. Copy and paste into your apps.
component: true
links:
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/chart
  doc: https://next.layerchart.com
---

<script>
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
	import { ComponentPreview, InstallTabs, Steps, PMAddComp, PMInstall } from "$lib/components/docs";
</script>

<Alert.Root class="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200 mb-4">
<TriangleAlertIcon />
<Alert.Title>Preview - Use at Your Own Risk</Alert.Title>
<Alert.Description class="text-foreground/90">
<span>
LayerChart v2 is still in pre-release (@next) and is actively evolving. Only use if
you're comfortable with potential breaking changes before stable v2.
</span><span>
Current development status can be tracked <a
			href="https://github.com/techniq/layerchart/pull/449"
			class="inline underline hover:text-yellow-900 dark:hover:text-yellow-100"
			>here</a
		>.
</span>
</Alert.Description>
</Alert.Root>

<ComponentPreview name="chart-bar-interactive" class="-mt-2 [&_.preview]:p-0 [&_.preview]:border-t [&_.preview>div]:shadow-none [&_.preview]:border-none [&_.preview>div]:w-full [&_.preview]:lg:min-h-[404px]" hideCode>

<div></div>

</ComponentPreview>

Introducing **Charts**. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with other components are are fully customizable to fit your project.

[Browse the Charts Library](/charts)

## Component

We use [LayerChart](https://next.layerchart.com) under the hood.

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

### Install `layerchart`:

<PMInstall command="layerchart@next -D" />

### Add the following colors to your CSS file

```css
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

### Copy and paste the component source files linked at the top of this page into your project.

</Steps>
{/snippet}
</InstallTabs>
