<script lang="ts">
	import ScrollFadeEdge from "./scroll-fade-edge.svelte";
	import ScrollFadeHorizontal from "./scroll-fade-horizontal.svelte";
	import ScrollFadeNone from "./scroll-fade-none.svelte";
	import ScrollFadeOverflow from "./scroll-fade-overflow.svelte";
	import ScrollFadeRtl from "./scroll-fade-rtl.svelte";
	import ScrollFadeSize from "./scroll-fade-size.svelte";
	import ScrollFadeVertical from "./scroll-fade-vertical.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ScrollFadeVertical />
	<ScrollFadeOverflow />
	<ScrollFadeHorizontal />
	<ScrollFadeSize />
	<ScrollFadeEdge />
	<ScrollFadeNone />
	<ScrollFadeRtl />
</ExampleWrapper>
