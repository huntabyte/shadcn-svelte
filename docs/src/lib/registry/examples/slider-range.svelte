<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state([25, 50]);
</script>

<Slider type="multiple" bind:value max={100} step={5} class="mx-auto w-full max-w-xs" />
