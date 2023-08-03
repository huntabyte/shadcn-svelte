<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { ctx, melt } from ".";
	const input = ctx.getInput();
	type $$Props = HTMLInputAttributes;
</script>

<input use:melt={$input} hidden {...$$restProps} />
