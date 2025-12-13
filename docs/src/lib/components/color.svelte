<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import { toast } from "svelte-sonner";
	import type { Color } from "$lib/colors.js";
	import type { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";

	let { color, clipboard }: { color: Color; clipboard: UseClipboard } = $props();

	const userConfig = UserConfigContext.get();
</script>

<button
	class="group relative flex aspect-[3/1] w-full flex-1 cursor-pointer flex-col gap-2 text-(--text) sm:aspect-[2/3] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:end-4 [&>svg]:top-4 [&>svg]:z-10 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
	data-last-copied={clipboard.lastCopied === color[userConfig.current.colorFormat]}
	style="--bg: {color.oklch}; --text: {color.foreground};"
	onclick={() => {
		clipboard.copy(color[userConfig.current.colorFormat]);
		toast.success(`Copied ${color[userConfig.current.colorFormat]} to clipboard.`);
	}}
>
	{#if clipboard.copied}
		<CheckIcon class="group-hover:opacity-100 group-data-[last-copied=true]:opacity-100" />
	{:else}
		<ClipboardIcon class="group-hover:opacity-100" />
	{/if}
	<div
		class="border-ghost after:border-input w-full flex-1 rounded-md bg-(--bg) after:rounded-lg md:rounded-lg"
	></div>
	<div class="flex w-full flex-col items-center justify-center gap-1">
		<span
			class="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary font-mono text-xs tabular-nums transition-colors sm:hidden xl:flex"
		>
			{color.class}
		</span>
		<span
			class="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary hidden font-mono text-xs tabular-nums transition-colors sm:flex xl:hidden"
		>
			{color.scale}
		</span>
	</div>
</button>
