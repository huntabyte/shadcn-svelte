<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";

	type Props = {
		item: string;
	};

	let { item }: Props = $props();
</script>

<div
	data-slot="preview"
	class="ring-foreground/15 relative -mx-1 flex flex-1 flex-col justify-center overflow-hidden rounded-2xl ring-1 sm:mx-0"
>
	<div
		class={cn(
			"[--preview-height:calc(100svh-var(--header-height)-2rem-150px)] md:[--preview-height:calc(100svh-var(--header-height)-2rem)]",
			"3xl:max-w-[1800px] z-0 mx-auto flex max-h-(--preview-height) w-full flex-1 flex-col overflow-y-auto"
		)}
	>
		<iframe src="/preview/{item}" class="h-(--preview-height)" title={item}></iframe>
		<Badge class="absolute right-2 bottom-2 isolate z-10" variant="secondary">Preview</Badge>
	</div>
</div>
