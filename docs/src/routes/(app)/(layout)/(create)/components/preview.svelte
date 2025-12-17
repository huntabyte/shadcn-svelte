<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { useCreateSearchParams } from "../lib/search-params.js";
	const params = useCreateSearchParams();
	let iframeKey = $state(0);
	const iframeSrc = $derived(
		`/preview/${params.item}?theme=${params.theme}&style=${params.style}&font=${params.font}&baseColor=${params.baseColor}`
	);
</script>

<div class="relative -mx-1 flex flex-1 flex-col justify-center sm:mx-0">
	<div
		class="ring-foreground/15 3xl:max-w-[1800px] relative z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-2xl ring-1"
	>
		<div class="bg-muted dark:bg-muted/30 absolute inset-0 rounded-2xl"></div>
		{#key `${params.item}-${iframeKey}`}
			<iframe src={iframeSrc} class="z-10 size-full flex-1" title="Preview"></iframe>
		{/key}
		<Badge class="absolute bottom-2 right-2 isolate z-10" variant="secondary">Preview</Badge>
	</div>
</div>