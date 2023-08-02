<script lang="ts">
	import { onMount } from "svelte";
	import { Progress } from "$components/ui/progress";
	import { writable } from "svelte/store";

	const value = writable(13);
	onMount(() => {
		const timer = setTimeout(() => value.set(66), 500);
		return () => clearTimeout(timer);
	});
</script>

<Progress {value} max={100} />
