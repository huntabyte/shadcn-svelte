<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state(50);
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
	<Progress value={value} />
	<Slider
		type="single"
		bind:value
		min={0}
		max={100}
		step={1}
	/>
</div>
