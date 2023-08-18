<script lang="ts">
	import { config } from "@/stores";
	import type { Style } from "@/registry/styles";

	export let styleName: Style["name"];
</script>

{#if !styleName || $config.style === styleName}
	<slot />
{/if}
