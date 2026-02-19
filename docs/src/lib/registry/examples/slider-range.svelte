<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state([20, 80]);
</script>

<Slider type="multiple" bind:value max={100} step={1} class="max-w-[70%]" />
