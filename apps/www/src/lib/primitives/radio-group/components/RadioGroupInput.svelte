<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { ctx } from "../ctx";
	import { melt } from "@melt-ui/svelte";

	const input = ctx.getInput();

	type $$Props = HTMLInputAttributes;
</script>

<input use:melt={$input} hidden {...$$restProps} />
