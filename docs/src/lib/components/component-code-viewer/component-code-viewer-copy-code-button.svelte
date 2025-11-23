<script lang="ts">
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { ComponentCodeViewerContext } from "./component-code-viewer.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Copy from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className }: ComponentProps<typeof Button> = $props();

	const ctx = ComponentCodeViewerContext.get();
	const clipboard = new UseClipboard();
</script>

{#if ctx.activeFileCodeToCopy}
	<Button
		onclick={() => {
			clipboard.copy(ctx.activeFileCodeToCopy);
		}}
		class={cn(
			"me-2 size-7 shrink-0 rounded-md p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3",
			className
		)}
		variant="ghost"
	>
		{#if clipboard.copied}
			<CheckIcon />
		{:else}
			<Copy />
		{/if}
	</Button>
{/if}
