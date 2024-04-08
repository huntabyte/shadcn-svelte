<script lang="ts">
	import { fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { tick } from "svelte";
	import type { Blocks } from "../../../__registry__/blocks.js";
	import { getLiftMode, isBrowser } from "$lib/utils.js";

	export let block: (typeof Blocks)["default"]["dashboard-01"];

	const { isLiftMode } = getLiftMode(block.name);

	function updateChunkStyles(chunks: (typeof block)["chunks"], _: boolean) {
		if (!isBrowser) return;
		tick().then(() => {
			const components = document.querySelectorAll<HTMLElement>("[data-x-chunk-name]");

			for (let i = 0; i < chunks.length; i++) {
				const chunk = chunks[i];
				const chunkEl = document.querySelector<HTMLElement>(
					`[data-x-chunk-name="${chunk.name}"]`
				);

				const wrapperEl = document.querySelector<HTMLElement>(
					`[data-x-chunk-container="${chunk.name}"]`
				);

				const componentEl = components[i];

				if (!chunkEl || !componentEl) continue;

				const position = componentEl.getBoundingClientRect();
				chunkEl.style.zIndex = "40";
				chunkEl.style.width = `${position.width}px`;
				chunkEl.style.height = `${position.height}px`;

				if (!wrapperEl) continue;

				wrapperEl.style.zIndex = "40";
				wrapperEl.style.position = "absolute";
				wrapperEl.style.top = `${position.top}px`;
				wrapperEl.style.left = `${position.left}px`;
				wrapperEl.style.width = `${position.width}px`;
				wrapperEl.style.height = `${position.height}px`;
			}
		});
	}

	$: updateChunkStyles(block.chunks, $isLiftMode);
</script>

<slot />
{#if $isLiftMode}
	<div
		class="fill-mode-backwards absolute inset-0 z-30 bg-background/90"
		in:fade={{ duration: 200, delay: 180, easing: cubicOut }}
		out:fade={{ duration: 380, delay: 0, easing: cubicOut }}
	></div>
{/if}
