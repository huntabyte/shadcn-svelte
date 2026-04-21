<script lang="ts">
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { ComponentCodeViewerContext } from "./component-code-viewer.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import CopyIcon from "@tabler/icons-svelte/icons/copy";
	import CheckIcon from "@tabler/icons-svelte/icons/check";
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
		class={cn("me-2 size-7", className)}
		variant="ghost"
	>
		{#if clipboard.copied}
			<CheckIcon />
		{:else}
			<CopyIcon />
		{/if}
	</Button>
{/if}
