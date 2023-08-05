<script lang="ts">
	import { ctx } from "../ctx";
	const { isChecked, value } = ctx.getRadioIndicator();
</script>

{#if $isChecked(value)}
	<slot />
{/if}
