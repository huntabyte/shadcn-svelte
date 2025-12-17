<script lang="ts">
	import DesignSystemProvider from "$lib/components/design-system-provider.svelte";
	import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";

	let { data } = $props();

	const ComponentPromise = import(
		`../../(layout)/(create)/examples/${data.example.name}/${data.example.name}.svelte`
	);
</script>

<DesignSystemProvider>
	{#await ComponentPromise then { default: Component }}
		<Component />
	{/await}
</DesignSystemProvider>
<TailwindIndicator />
