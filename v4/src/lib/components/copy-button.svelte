<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { cn } from "$lib/utils.js";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
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
</script>

<Tooltip.Root disableCloseOnTriggerClick>
	<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
	<Tooltip.Trigger onclick={() => clipboard.copy(text)} {...restProps as any}>
		{#snippet child({ props })}
			<Button
				data-slot="copy-button"
				size="icon"
				{variant}
				class={cn(
					"bg-code absolute !right-2 !top-3 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
					className
				)}
				{...props}
			>
				<span class="sr-only">Copy</span>
				{#if clipboard.copied}
					<CheckIcon class="size-4" />
				{:else}
					<ClipboardIcon class="size-4" />
				{/if}
			</Button>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content>
		{clipboard.copied ? "Copied" : "Copy to Clipboard"}
	</Tooltip.Content>
</Tooltip.Root>
