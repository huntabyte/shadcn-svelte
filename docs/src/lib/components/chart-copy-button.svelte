<script lang="ts">
	import CopyIcon from "@tabler/icons-svelte/icons/copy";
	import CheckIcon from "@tabler/icons-svelte/icons/check";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import type { ComponentProps } from "svelte";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";

	let {
		class: className,
		code,
		...restProps
	}: ComponentProps<typeof Button> & { code: string } = $props();

	const clipboard = new UseClipboard();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<Button
				size="icon"
				variant="ghost"
				{...props}
				class={cn("[&_svg]-h-3.5 h-7 w-7 rounded-[6px] [&_svg]:w-3.5", className)}
				onclick={() => {
					clipboard.copy(code);
				}}
				{...restProps}
			>
				<span class="sr-only" data-llm-ignore>Copy</span>
				{#if clipboard.copied}
					<CheckIcon />
				{:else}
					<CopyIcon />
				{/if}
			</Button>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content class="bg-black text-white" arrowClasses="bg-black">Copy code</Tooltip.Content>
</Tooltip.Root>
