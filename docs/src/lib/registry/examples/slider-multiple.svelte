<script lang="ts">
	import { Slider } from "$lib/registry/ui/slider/index.js";

	let value = $state([10, 20, 70]);
</script>

<Slider
	type="multiple"
	bind:value
	max={100}
	step={10}
	class="mx-auto w-full max-w-xs"
/>
