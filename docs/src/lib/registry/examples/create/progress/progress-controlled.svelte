<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state(50);
</script>

<Example title="Controlled">
	<div class="flex w-full flex-col gap-4">
		<Progress {value} class="w-full" />
		<Slider type="single" bind:value min={0} max={100} step={1} />
	</div>
</Example>
