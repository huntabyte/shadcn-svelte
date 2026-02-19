<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state(50);
</script>

<div class="flex flex-col gap-4 w-[70%]">
	<div class="flex justify-between text-sm">
		<span>Volume</span>
		<span class="font-medium tabular-nums">{value}%</span>
	</div>
	<Slider type="single" bind:value max={100} step={1} />
</div>
