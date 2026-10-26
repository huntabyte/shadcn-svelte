<script lang="ts">
	import { Progress } from "#lib/registry/ui/progress/index.js";
	import { onMount } from "svelte";

	let value = $state(13);

	onMount(() => {
		const timer = setTimeout(() => (value = 66), 500);
		return () => clearTimeout(timer);
	});
</script>

<Progress {value} max={100} class="w-[60%]" />
