<script lang="ts">
	import type { Snippet } from "svelte";
	import { config } from "$lib/stores/index.js";
	import type { Style } from "$lib/registry/styles.js";

	let { styleName, children }: { styleName: Style["name"]; children?: Snippet } = $props();
</script>

{#if !styleName || $config.style === styleName}
	{@render children?.()}
{/if}
