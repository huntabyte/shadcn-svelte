<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { cn } from "$lib/utils.js";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import CheckIcon from "@lucide/svelte/icons/check";

	// omit href so you can't create a link

	let {
		text,
		variant = "ghost",
		class: className,
		...restProps
	}: Omit<ButtonProps, "href"> & {
		text: string;
	} = $props();

	const clipboard = new UseClipboard();
</script>

<Button
	size="icon"
	{variant}
	class={cn("relative z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50", className)}
	onclick={() => {
		clipboard.copy(text);
	}}
	{...restProps}
>
	<span class="sr-only">Copy</span>
	{#if clipboard.copied}
		<CheckIcon class="size-3" />
	{:else}
		<ClipboardIcon class="size-3" />
	{/if}
</Button>
