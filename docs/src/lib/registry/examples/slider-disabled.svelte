<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state(50);
</script>

<Slider type="single" bind:value max={100} step={1} disabled class="mx-auto w-full max-w-xs" />
