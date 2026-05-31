<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import AspectRatio16x9 from "./aspect-ratio-16x9.svelte";
	import AspectRatio21x9 from "./aspect-ratio-21x9.svelte";
	import AspectRatio1x1 from "./aspect-ratio-1x1.svelte";
	import AspectRatio9x16 from "./aspect-ratio-9x16.svelte";
</script>

<ExampleWrapper class="max-w-4xl 2xl:max-w-4xl">
	<AspectRatio16x9 />
	<AspectRatio21x9 />
	<AspectRatio1x1 />
	<AspectRatio9x16 />
</ExampleWrapper>
