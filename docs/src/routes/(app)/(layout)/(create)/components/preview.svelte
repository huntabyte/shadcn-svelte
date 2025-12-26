<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import { cn } from "$lib/utils.js";

	type Props = {
		item: string;
	};

	let { item }: Props = $props();

	const ComponentPromise = $derived.by(() => {
		try {
			return import(`$lib/registry/examples/create/${item}/${item}.svelte`);
		} catch (error) {
			throw new Error(
				"Failed to load preview component. If you just created the component preview file try restarting the dev server.",
				{
					cause: error,
				}
			);
		}
	});
</script>

<div data-slot="preview" class="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
	<div
		class={cn(
			'[--preview-height:calc(100svh-var(--header-height)-2rem)]',
			"ring-foreground/15 3xl:max-w-[1800px] z-0 mx-auto flex max-h-(--preview-height) w-full flex-1 flex-col overflow-y-auto rounded-2xl ring-1",
		)}
	>
		{#await ComponentPromise}
			<div class="absolute inset-0 flex items-center justify-center">
				<Spinner />
			</div>
		{:then { default: Component }}
			<Component />
		{/await}
		<Badge class="absolute right-2 bottom-2 isolate z-10" variant="secondary">Preview</Badge>
	</div>
</div>
