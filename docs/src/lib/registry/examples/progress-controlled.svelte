<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	let value = $state(40);
</script>

<div class="flex w-[60%] flex-col gap-6">
	<div class="flex flex-col gap-2">
		<Label>Progress: {value}%</Label>
		<Progress value={value} max={100} />
	</div>
	<div class="flex flex-col gap-2">
		<Label>Adjust value</Label>
		<Slider type="single" bind:value max={100} step={1} />
	</div>
</div>
