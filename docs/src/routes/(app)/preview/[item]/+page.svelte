<script lang="ts">
	import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";

	let { data } = $props();

	const ComponentPromise = import(
		// eslint-disable-next-line svelte/no-unused-svelte-ignore
		// svelte-ignore state_referenced_locally
		`$lib/registry/examples/create/${data.example.name}/${data.example.name}.svelte`
	);
</script>

{#await ComponentPromise then { default: Component }}
	<Component />
{/await}
<TailwindIndicator />
