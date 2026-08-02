<script lang="ts">
	import CarouselBasic from "./carousel-basic.svelte";
	import CarouselMultiple from "./carousel-multiple.svelte";
	import CarouselWithGap from "./carousel-with-gap.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper class="lg:grid-cols-1">
	<CarouselBasic />
	<CarouselMultiple />
	<CarouselWithGap />
</ExampleWrapper>
