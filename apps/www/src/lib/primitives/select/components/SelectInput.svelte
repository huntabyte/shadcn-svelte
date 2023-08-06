<script lang="ts">
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";
	import type { InputProps } from "../types";

	type $$Props = InputProps;
	const input = ctx.getInput();
</script>

<input use:melt={$input} hidden {...$$restProps} />
