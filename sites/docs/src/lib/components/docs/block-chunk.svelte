<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import BlockCopyCodeButton from "./block-copy-code-button.svelte";
	import { cn, getLiftMode } from "$lib/utils.js";
	import type { RawBlockChunk } from "$lib/blocks.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		chunk: RawBlockChunk;
		block: {
			name: string;
			style: string;
			container: {
				height: string;
				className: string;
			};
		};
	};

	export let block: $$Props["block"];
	export let chunk: $$Props["chunk"];

	const { isLiftMode } = getLiftMode(block.name);
</script>

<div
	class={cn(
		"bg-background group rounded-xl shadow-xl",
		!$isLiftMode && "invisible",
		chunk.container?.className
	)}
	data-x-chunk-container-for={chunk.name}
	{...$$restProps}
>
	<div class="relative z-30">
		<slot />
	</div>
	{#await chunk.raw() then code}
		<div
			class="absolute inset-x-0 top-0 z-20 flex px-4 py-3 opacity-0 transition-all duration-200 ease-in group-hover:-translate-y-12 group-hover:opacity-100"
		>
			<div class="flex w-full items-center justify-end gap-2">
				<BlockCopyCodeButton name={chunk.name} {code} />
			</div>
		</div>
	{/await}
</div>
