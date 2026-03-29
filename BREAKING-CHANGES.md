# LayerChart state-refactor Breaking Changes

Discovered while migrating shadcn-svelte from `layerchart@2.0.0-next.43` to the `state-refactor` branch (PR #663).

---

## 1. `tooltip={false}` on simplified charts must use `tooltipContext={false}`

The `tooltip` prop on simplified charts is now a snippet slot, not a boolean. Use `tooltipContext={false}` to disable tooltips.

```diff
- <BarChart tooltip={false} />
+ <BarChart tooltipContext={false} />
```

## 2. `getTooltipContext()` removed — use `getChartContext()`

```diff
- import { getTooltipContext, Tooltip as TooltipPrimitive } from "layerchart";
+ import { getChartContext, Tooltip as TooltipPrimitive } from "layerchart";

- const tooltipCtx = getTooltipContext();
- tooltipCtx.payload
+ const chartCtx = getChartContext();
+ chartCtx.tooltip.series
```

## 3. Tooltip data model changed

The old `payload` array items are now `TooltipSeries` objects accessed via `chartCtx.tooltip.series`. The x-axis label (e.g., a Date) is no longer on each item — use `chartCtx.x(chartCtx.tooltip.data)` instead.

```diff
  // Old payload item properties → New equivalents
- item.label        // x-axis value (e.g. Date)
+ chartCtx.x(chartCtx.tooltip.data)

- item.name         // series name
+ item.label

- item.payload      // raw data object
+ chartCtx.tooltip.data

- item.payload.color // nested data color
+ item.config?.color
```

## 4. `type ChartContextValue` removed — use `ChartState`

```diff
- import { BarChart, type ChartContextValue } from "layerchart";
+ import { BarChart, type ChartState } from "layerchart";

- let context = $state<ChartContextValue>();
+ let context = $state<ChartState>();
```

## 5. `marks` snippet no longer receives helper functions

The `marks` snippet now only receives `{ context }`. Helper functions like `getAreaProps()`, `getBarsProps()`, `getPointsProps()` are gone. You must pass props directly to mark components.

**Important:** `props.area` / `props.bars` settings on the simplified chart are NOT applied when overriding `marks`. Move those props directly onto the mark components.

```diff
  <AreaChart
-   props={{ area: { curve: curveNatural, fillOpacity: 0.4 } }}
+   props={{ xAxis: { ... } }}
  >
-   {#snippet marks({ series, getAreaProps })}
-     {#each series as s, i (s.key)}
-       <Area {...getAreaProps(s, i)} fill="url(#grad)" />
+   {#snippet marks({ context })}
+     {#each context.series.visibleSeries as s (s.key)}
+       <Area
+         seriesKey={s.key}
+         curve={curveNatural}
+         fillOpacity={0.4}
+         {...s.props}
+         fill="url(#grad)"
+       />
      {/each}
    {/snippet}
  </AreaChart>
```

Same pattern for Bars:
```diff
- {#snippet marks({ getBarsProps, visibleSeries })}
-   {#each visibleSeries as s, i (s.key)}
-     <Bar {...getBarsProps(s, i)} />
+ {#snippet marks({ context })}
+   {#each context.series.visibleSeries as s (s.key)}
+     <Bar seriesKey={s.key} {...s.props} />
    {/each}
  {/snippet}
```

## 6. `axis` snippet loses `getAxisProps` helper

```diff
- {#snippet axis({ getAxisProps })}
-   <Axis {...getAxisProps("x")} />
-   <Axis {...getAxisProps("y")} />
+ {#snippet axis({ context })}
+   <Axis placement="angle" />
+   <Axis placement="radius" />
  {/snippet}
```

## 7. `fill-opacity` prop renamed to `fillOpacity`

Applies to both component props and `props` objects.

```diff
  props={{
    area: {
-     "fill-opacity": 0.4,
+     fillOpacity: 0.4,
    },
  }}
```

## 8. Bar mount animation simplified

`initialY`/`initialHeight` are now auto-computed when `motion` is set. Per-property motion configs can be a single flat object.

```diff
  bars: {
-   initialY: context?.height,
-   initialHeight: 0,
-   motion: {
-     y: { type: "tween", duration: 500, easing: cubicInOut },
-     height: { type: "tween", duration: 500, easing: cubicInOut },
-   },
+   motion: { type: "tween", duration: 500, easing: cubicInOut },
  },
```

## 9. `points` snippet vs `marks` snippet on LineChart

The `points` snippet only overrides point rendering. The `marks` snippet replaces the entire chart (lines + points). Don't accidentally rename `points` to `marks`.

```diff
  <LineChart>
-   {#snippet points({ visibleSeries, getPointsProps })}
-     {#each visibleSeries as s, i (s.key)}
-       <Points {...getPointsProps(s, i)}>
+   {#snippet points({ context })}
+     {#each context.series.visibleSeries as s (s.key)}
+       <Points seriesKey={s.key} {...s.props}>
          ...
        </Points>
      {/each}
    {/snippet}
  </LineChart>
```

## 10. Text/primitive positional props may be function accessors

Due to data-driven primitives, props like `y` on `<Text>` can now be `string | number | ((d: any) => any)`. Add a type guard when parsing.

```diff
  {#snippet tickLabel({ props })}
    {@const y = props.y
      ? typeof props.y === "number"
        ? props.y
-       : Number.parseInt(props.y)
+       : typeof props.y === "string"
+         ? Number.parseInt(props.y)
+         : 0
      : 0}
  {/snippet}
```
