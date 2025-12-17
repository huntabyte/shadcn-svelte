<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { useCreateSearchParams } from "../lib/search-params.js";
	const params = useCreateSearchParams();

	// if you are having issues with this restart your dev server
	// for whatever reason vite cannot seem to detect newly created files imported dynamically
	const ComponentPromise = $derived(import(`../examples/${params.item}/${params.item}.svelte`));
</script>

<div data-slot="preview" class="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
	<div
		class="ring-foreground/15 3xl:max-w-[1800px] z-0 mx-auto flex max-h-[calc(100svh-var(--header-height)-2rem)] w-full flex-1 flex-col overflow-y-auto rounded-2xl ring-1"
	>
		{#await ComponentPromise then { default: Component }}
			<Component />
		{/await}
		<Badge class="absolute bottom-2 right-2 isolate z-10" variant="secondary">Preview</Badge>
	</div>
</div>
