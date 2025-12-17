<script lang="ts">
	import DesignSystemProvider from "$lib/components/design-system-provider.svelte";
	import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";
	import { useCreateSearchParams } from "../../(layout)/(create)/lib/search-params.js";

	let { data } = $props();

	const ComponentPromise = import(
		`../../(layout)/(create)/examples/${data.example.name}/${data.example.name}.svelte`
	);

	const params = useCreateSearchParams();
</script>

<DesignSystemProvider>
	{#await ComponentPromise then { default: Component }}
		<Component />
	{/await}
</DesignSystemProvider>
<TailwindIndicator />
