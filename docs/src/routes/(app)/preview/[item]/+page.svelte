<script lang="ts">
	import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";

	let { data } = $props();

	const ComponentPromise = import(
		`../../(layout)/(create)/examples/${data.example.name}/${data.example.name}.svelte`
	);
</script>

	{#await ComponentPromise then { default: Component }}
		<Component />
	{/await}
<TailwindIndicator />
