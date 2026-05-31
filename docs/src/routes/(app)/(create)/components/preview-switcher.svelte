<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { Button } from "$lib/registry/ui/button/index.js";

	const PREVIEW_ITEMS = [
		{ label: "01", value: "preview-02" },
		{ label: "02", value: "preview" },
	] as const;

	type Props = {
		item: string;
	};

	let { item }: Props = $props();

	const visible = $derived(item === "preview" || item.startsWith("preview-0"));
</script>

{#if visible}
	<div
		class="dark bg-card/90 absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl p-1 shadow-xl backdrop-blur-xl"
	>
		{#each PREVIEW_ITEMS as previewItem (previewItem.value)}
			<Button
				variant="ghost"
				size="sm"
				data-active={item === previewItem.value}
				class="text-muted-foreground hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground h-7 min-w-8 cursor-pointer rounded-lg px-2.5 text-xs font-medium transition-colors"
				onclick={() => goto(`/create/${previewItem.value}${page.url.search}`)}
			>
				{previewItem.label}
			</Button>
		{/each}
	</div>
{/if}
