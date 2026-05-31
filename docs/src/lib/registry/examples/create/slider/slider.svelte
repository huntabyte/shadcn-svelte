<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import SliderBasic from "./slider-basic.svelte";
	import SliderRange from "./slider-range.svelte";
	import SliderMultiple from "./slider-multiple.svelte";
	import SliderVertical from "./slider-vertical.svelte";
	import SliderControlled from "./slider-controlled.svelte";
	import SliderDisabled from "./slider-disabled.svelte";
</script>

<ExampleWrapper>
	<SliderBasic />
	<SliderRange />
	<SliderMultiple />
	<SliderVertical />
	<SliderControlled />
	<SliderDisabled />
</ExampleWrapper>
