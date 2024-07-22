<script lang="ts">
	import { config } from "$lib/stores/index.js";
	import type { Style } from "$lib/registry/styles.js";

	export let styleName: Style["name"];
</script>

{#if !styleName || $config.style === styleName}
	<slot />
{/if}
