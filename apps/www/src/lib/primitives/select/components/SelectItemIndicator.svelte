<script lang="ts">
	import { ctx } from "../ctx";
	const { isSelected, value } = ctx.getItemIndicator();
</script>

{#if $isSelected(value)}
	<slot />
{/if}
