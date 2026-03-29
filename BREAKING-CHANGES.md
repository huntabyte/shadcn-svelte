# LayerChart state-refactor Breaking Changes

Discovered while migrating shadcn-svelte from `layerchart@2.0.0-next.43` to the `state-refactor` branch (PR #663).

## Documented / Expected Changes

These changes are covered in the [migration guide](https://techniq-state-refactor.layerchart.pages.dev/docs/guides/migrations/state-refactor) and worked as expected:

- `getTooltipContext()` removed in favor of `getChartContext()` (`.tooltip`, `.brushState`, `.transformState`)
- `type ChartContextValue` removed, replaced by `ChartState`
- `<Chart tooltip={...}>` prop renamed to `tooltipContext`
- `GeoContext` renamed to `GeoProjection`
- Various context getter/setter removals

## Undocumented / Potentially Missing from Migration Guide

### 1. `tooltip={false}` on simplified charts no longer works

The `tooltip` prop on simplified charts (`BarChart`, `AreaChart`, `LineChart`, etc.) is now typed as `ChartSnippet` (snippet only), not `boolean | Snippet`. Passing `tooltip={false}` to disable the default tooltip no longer works and causes a type error.

**Workaround:** Use `tooltipContext={false}` instead.

**Suggestion:** This should be documented in the migration guide, or the `tooltip` prop could accept `false` to disable it (matching the behavior of other props like `highlight`, `grid`, `axis` which accept `boolean | Snippet`).

### 2. `marks` snippet no longer receives helper functions

The `marks` snippet on simplified charts now only receives `{ context }` instead of the old destructured helpers like `{ series, getAreaProps }`, `{ getBarsProps, visibleSeries }`, `{ getPointsProps }`, etc.

- `series` / `visibleSeries` → `context.series.visibleSeries`
- `getAreaProps(s, i)` → no direct replacement; must manually pass `seriesKey={s.key}` and `{...s.props}` to `<Area>`
- `getBarsProps(s, i)` → same pattern with `<Bars>` / `<Bar>`
- `getPointsProps(s, i)` → same pattern with `<Points>`
- `getAxisProps("x")` / `getAxisProps("y")` → no replacement; must manually configure `<Axis>` with `placement` and props

**Key issue:** When overriding `marks`, the `props.area` / `props.bars` / etc. settings from the simplified chart are **not** automatically applied to the custom mark components. In the old API, `getAreaProps()` merged these props automatically. Now the user must manually apply them (e.g., `curve`, `fill-opacity`, `line`, `motion`).

**Suggestion:** Document this in the migration guide. Consider providing the `props` object in the snippet context so users can still access `props.area`, etc., or provide helper functions like `getAreaProps` through `context`.

### 3. `axis` snippet renamed / removed from simplified charts (radar charts)

The old `{#snippet axis({ getAxisProps })}` snippet for customizing axes appears to need different handling. The `axis` prop now accepts `ChartSnippet`, so `{#snippet axis({ context })}` works, but the `getAxisProps` helper is gone.

Users must manually specify `<Axis placement="angle">` / `<Axis placement="radius">` with all required props.

### 4. Tooltip data model completely changed

The tooltip payload structure is fundamentally different:

| Old (`tooltipCtx.payload[i]`)      | New equivalent                      |
| ---------------------------------- | ----------------------------------- |
| `.label` (x-axis value, e.g. Date) | `chartCtx.x(chartCtx.tooltip.data)` |
| `.name` (series name)              | `chartCtx.tooltip.series[i].label`  |
| `.value` (y-axis value)            | `chartCtx.tooltip.series[i].value`  |
| `.key` (series key)                | `chartCtx.tooltip.series[i].key`    |
| `.color`                           | `chartCtx.tooltip.series[i].color`  |
| `.payload` (raw data item)         | `chartCtx.tooltip.data`             |

**Key issue:** The x-axis label value (e.g., a `Date` object) was previously available directly on each payload item as `.label`. It's now only accessible via `chartCtx.x(chartCtx.tooltip.data)`. This means custom `labelFormatter` functions that expected a `Date` as the first argument break silently (receive a string series label instead).

**Suggestion:** This mapping should be prominently documented. Consider adding a `dataLabel` or `xValue` property to `TooltipSeries` items so the x-axis value is easily accessible without needing to call `chartCtx.x()`.

### 5. Positional props on Text/primitives can now be function accessors

Props like `y` on `<Text>` (used in tick label snippets) changed type from `string | number` to `string | number | ((d: any) => any)` due to data-driven primitives. Code that calls `Number.parseInt(props.y)` needs an additional type guard for the function case.

### 6. `points` snippet on `LineChart`

The `points` snippet still exists separately from `marks`, but since the snippet parameter changed to `{ context }`, it's easy to accidentally rename it to `marks` (which replaces the entire line rendering instead of just the points).

**Suggestion:** Document clearly that `points`, `axis`, `tooltip`, etc. are separate snippets from `marks`, and overriding `marks` replaces everything while the others only customize their specific layer.
