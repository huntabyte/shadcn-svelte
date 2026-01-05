<script lang="ts">
	import { page } from "$app/state";
	import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let { data } = $props();

	const ComponentPromise = import(
		// eslint-disable-next-line svelte/no-unused-svelte-ignore
		// svelte-ignore state_referenced_locally
		`$lib/registry/examples/create/${data.example.name}/${data.example.name}.svelte`
	);
</script>

{#if page.url.searchParams.get("fromPreview") === "true"}
	<Button
		class="absolute top-2 right-2 isolate z-10"
		href="/create/{data.example.name}{page.url.search}"
		variant="ghost"
		size="icon-sm"
	>
		<IconPlaceholder
			lucide="MinimizeIcon"
			tabler="IconMinimize"
			hugeicons="ArrowShrinkIcon"
			phosphor="CornersInIcon"
		/>
	</Button>
{/if}
{#await ComponentPromise then { default: Component }}
	<Component />
{/await}
<TailwindIndicator />
