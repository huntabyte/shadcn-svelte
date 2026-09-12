<script lang="ts">
	import ToggleGroupBasic from "./toggle-group-basic.svelte";
	import ToggleGroupDateRange from "./toggle-group-date-range.svelte";
	import ToggleGroupFilter from "./toggle-group-filter.svelte";
	import ToggleGroupFontWeightSelector from "./toggle-group-font-weight-selector.svelte";
	import ToggleGroupOutlineWithIcons from "./toggle-group-outline-with-icons.svelte";
	import ToggleGroupOutline from "./toggle-group-outline.svelte";
	import ToggleGroupSizes from "./toggle-group-sizes.svelte";
	import ToggleGroupSort from "./toggle-group-sort.svelte";
	import ToggleGroupSpacing from "./toggle-group-spacing.svelte";
	import ToggleGroupVerticalOutlineWithIcons from "./toggle-group-vertical-outline-with-icons.svelte";
	import ToggleGroupVerticalOutline from "./toggle-group-vertical-outline.svelte";
	import ToggleGroupVerticalWithSpacing from "./toggle-group-vertical-with-spacing.svelte";
	import ToggleGroupVertical from "./toggle-group-vertical.svelte";
	import ToggleGroupWithIcons from "./toggle-group-with-icons.svelte";
	import ToggleGroupWithInputAndSelect from "./toggle-group-with-input-and-select.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ToggleGroupBasic />
	<ToggleGroupOutline />
	<ToggleGroupOutlineWithIcons />
	<ToggleGroupSizes />
	<ToggleGroupSpacing />
	<ToggleGroupWithIcons />
	<ToggleGroupFilter />
	<ToggleGroupDateRange />
	<ToggleGroupSort />
	<ToggleGroupWithInputAndSelect />
	<ToggleGroupVertical />
	<ToggleGroupVerticalOutline />
	<ToggleGroupVerticalOutlineWithIcons />
	<ToggleGroupVerticalWithSpacing />
	<ToggleGroupFontWeightSelector />
</ExampleWrapper>
