<script lang="ts">
	import ShimmerAngle from "./shimmer-angle.svelte";
	import ShimmerBasic from "./shimmer-basic.svelte";
	import ShimmerColor from "./shimmer-color.svelte";
	import ShimmerDuration from "./shimmer-duration.svelte";
	import ShimmerMarker from "./shimmer-marker.svelte";
	import ShimmerNone from "./shimmer-none.svelte";
	import ShimmerOnce from "./shimmer-once.svelte";
	import ShimmerRtl from "./shimmer-rtl.svelte";
	import ShimmerSpread from "./shimmer-spread.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ShimmerBasic />
	<ShimmerMarker />
	<ShimmerColor />
	<ShimmerOnce />
	<ShimmerDuration />
	<ShimmerSpread />
	<ShimmerAngle />
	<ShimmerNone />
	<ShimmerRtl />
</ExampleWrapper>
