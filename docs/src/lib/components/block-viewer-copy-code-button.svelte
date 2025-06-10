<svelte:options runes />

<script lang="ts">
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { BlockViewerContext } from "./block-viewer.svelte";

	const ctx = BlockViewerContext.get();

	const clipboard = new UseClipboard();
</script>

{#if ctx.activeFileCodeToCopy}
	<Button
		onclick={() => {
			clipboard.copy(ctx.activeFileCodeToCopy);
		}}
		class="size-7 shrink-0 rounded-md p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3"
		variant="ghost"
	>
		{#if clipboard.copied}
			<CheckIcon />
		{:else}
			<ClipboardIcon />
		{/if}
	</Button>
{/if}
