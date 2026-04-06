<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state([0.3, 0.7]);
</script>

<div class="mx-auto grid w-full max-w-xs gap-3">
	<div class="flex items-center justify-between gap-2">
		<Label for="slider-demo-temperature">Temperature</Label>
		<span class="text-sm text-muted-foreground">
			{value.join(", ")}
		</span>
	</div>
	<Slider
		id="slider-demo-temperature"
		type="multiple"
		bind:value
		min={0}
		max={1}
		step={0.1}
	/>
</div>
