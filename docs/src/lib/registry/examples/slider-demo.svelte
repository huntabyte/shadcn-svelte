<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state(75);
</script>

<Slider type="single" bind:value max={100} step={1} class="mx-auto w-full max-w-xs" />
