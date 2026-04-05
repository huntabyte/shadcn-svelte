<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { cn } from "$lib/utils.js";
	import CopyIcon from "@tabler/icons-svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import type { ComponentProps } from "svelte";

	let {
		text,
		variant = "ghost",
		class: className,
		...restProps
	}: ComponentProps<typeof Button> & {
		text: string;
	} = $props();

	const clipboard = new UseClipboard();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const rp = $derived(restProps as any);
</script>

<Button
	data-slot="copy-button"
	size="icon"
	{variant}
	onclick={() => clipboard.copy(text)}
	class={cn(
		"bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
		className
	)}
	{...rp}
	,
>
	<span class="sr-only" data-llm-ignore>Copy</span>
	{#if clipboard.copied}
		<CheckIcon />
	{:else}
		<CopyIcon />
	{/if}
</Button>
