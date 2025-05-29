<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	let value = $state([0.3, 0.7]);
</script>

<div class="grid w-full gap-3">
	<div class="flex items-center justify-between gap-2">
		<Label for="slider-demo-temperature">Temperature</Label>
		<span class="text-muted-foreground text-sm">
			{value.join(", ")}
		</span>
	</div>
	<Slider
		type="multiple"
		id="slider-demo-temperature"
		bind:value={() => value, (v) => (value = v)}
		min={0}
		max={1}
		step={0.1}
	/>
</div>
