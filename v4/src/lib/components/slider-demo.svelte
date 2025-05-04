<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import SliderControlled from "./slider-controlled.svelte";
</script>

<div class="flex w-full max-w-sm flex-col flex-wrap gap-6 md:flex-row">
	<Slider type="single" value={50} max={100} step={1} />
	<Slider type="multiple" value={[25, 50]} max={100} step={1} />
	<Slider type="multiple" value={[10, 20]} max={100} step={10} />
	<div class="flex w-full items-center gap-6">
		<Slider type="single" value={50} max={100} step={1} orientation="vertical" />
		<Slider type="single" value={25} max={100} step={1} orientation="vertical" />
	</div>
	<SliderControlled />
</div>
