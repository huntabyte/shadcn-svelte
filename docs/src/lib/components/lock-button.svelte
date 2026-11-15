<script lang="ts">
	import { SquareLock01Icon, SquareUnlock01Icon } from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";

	type Props = {
		locked: boolean;
		onToggle: () => void;
		class?: string;
	};

	let { locked, onToggle, class: className }: Props = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger
		onclick={onToggle}
		data-locked={locked}
		class={cn(
			"flex size-4 cursor-pointer items-center justify-center rounded opacity-0 transition-opacity group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus-visible:opacity-100 data-[locked=true]:opacity-100 pointer-coarse:hidden",
			className
		)}
		aria-label={locked ? "Unlock" : "Lock"}
	>
		{#if locked}
			<HugeiconsIcon icon={SquareLock01Icon} strokeWidth={2} className="text-foreground size-5" />
		{:else}
			<HugeiconsIcon icon={SquareUnlock01Icon} strokeWidth={2} className="text-foreground size-5" />
		{/if}
	</Tooltip.Trigger>
	<Tooltip.Content>
		{locked ? "Locked" : "Unlocked"}
	</Tooltip.Content>
</Tooltip.Root>
