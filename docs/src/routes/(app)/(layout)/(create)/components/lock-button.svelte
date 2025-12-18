<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";
	import { SquareLock01Icon, SquareUnlock01Icon } from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { useDesignSystem, type Lockable } from "$lib/features/design-system/index.js";

	type Props = {
		prop: keyof Lockable;
		class?: string;
	};

	let { prop, class: className }: Props = $props();

	const designSystem = useDesignSystem();

	const isLocked = $derived(designSystem.locks[prop]);
</script>

<Tooltip.Root>
	<Tooltip.Trigger
		onclick={() => (isLocked ? designSystem.unlock(prop) : designSystem.lock(prop))}
		data-locked={isLocked}
		class={cn(
			"pointer-coarse:hidden flex size-4 cursor-pointer items-center justify-center rounded opacity-0 transition-opacity focus-visible:opacity-100 group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 data-[locked=true]:opacity-100",
			className
		)}
		aria-label={isLocked ? "Unlock" : "Lock"}
	>
		{#if isLocked}
			<HugeiconsIcon
				icon={SquareLock01Icon}
				strokeWidth={2}
				className="text-foreground size-5"
			/>
		{:else}
			<HugeiconsIcon
				icon={SquareUnlock01Icon}
				strokeWidth={2}
				className="text-foreground size-5"
			/>
		{/if}
	</Tooltip.Trigger>
	<Tooltip.Content>
		{isLocked ? "Locked" : "Unlocked"}
	</Tooltip.Content>
</Tooltip.Root>
