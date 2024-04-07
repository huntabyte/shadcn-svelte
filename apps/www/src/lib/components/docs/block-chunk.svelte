<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import BlockCopyCodeButton from "../block-copy-code-button.svelte";
	import { cn, getLiftMode } from "$lib/utils.js";
	import type { Block, BlockChunk } from "$lib/registry/schema.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		chunk: BlockChunk;
		block: Block;
	};

	export let block: Block;
	export let chunk: BlockChunk;

	const { isLiftMode } = getLiftMode(block.name);
</script>

{#if chunk && $isLiftMode}
	<div
		in:fade={{ duration: 200, easing: cubicIn }}
		out:fade={{ duration: 200, easing: cubicOut }}
		class={cn(
			"group rounded-xl bg-background shadow-xl transition",
			chunk.container?.className
		)}
		{...$$restProps}
	>
		<div class="relative z-30">
			<slot />
		</div>
		{#if chunk.code}
			<div
				class="absolute inset-x-0 top-0 z-20 flex px-4 py-3 opacity-0 transition-all duration-200 ease-in group-hover:-translate-y-12 group-hover:opacity-100"
			>
				<div class="flex w-full items-center justify-end gap-2">
					<BlockCopyCodeButton name={chunk.name} code={chunk.code} />
				</div>
			</div>
		{/if}
	</div>
{/if}
