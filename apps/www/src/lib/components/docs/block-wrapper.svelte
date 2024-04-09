<script lang="ts">
	import { fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { tick } from "svelte";
	import type { Blocks } from "../../../__registry__/blocks.js";
	import { getLiftMode, isBrowser } from "$lib/utils.js";

	export let block: (typeof Blocks)["default"]["dashboard-01"];

	const { isLiftMode } = getLiftMode(block.name);

	function getBlockChunks() {
		return Array.from(document.querySelectorAll<HTMLElement>("[data-x-chunk-name]")).filter(
			(el) => {
				const anscestorContainer = el.closest("[data-x-chunk-container-for]");
				if (!anscestorContainer) return true;
				return false;
			}
		);
	}

	function getChunkByName(name: string) {
		return Array.from(
			document.querySelectorAll<HTMLElement>(`[data-x-chunk-name="${name}"]`)
		).filter((el) => {
			const anscestorContainer = el.closest("[data-x-chunk-container-for]");
			if (!anscestorContainer) return false;
			return true;
		})[0];
	}

	function updateChunkStyles(_?: boolean) {
		if (!isBrowser) return;
		tick().then(() => {
			const components = getBlockChunks();
			for (let i = 0; i < block.chunks.length; i++) {
				const chunk = block.chunks[i];
				if (!chunk) continue;
				const chunkEl = getChunkByName(block.chunks[i].name);

				const wrapperEl = document.querySelector<HTMLElement>(
					`[data-x-chunk-container-for="${chunk.name}"]`
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

	$: updateChunkStyles($isLiftMode);
</script>

<slot />
{#if $isLiftMode}
	<div
		class="absolute inset-0 z-30 bg-background/90"
		style="animation-fill-mode: backwards;"
		in:fade={{ duration: 200, delay: 180, easing: cubicOut }}
		out:fade={{ duration: 380, delay: 0, easing: cubicOut }}
	></div>
{/if}
