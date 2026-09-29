<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let first = $state(50);
	let second = $state(25);
</script>

<div class="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
	<Slider type="single" bind:value={first} max={100} step={1} orientation="vertical" class="h-40" />
	<Slider
		type="single"
		bind:value={second}
		max={100}
		step={1}
		orientation="vertical"
		class="h-40"
	/>
</div>
