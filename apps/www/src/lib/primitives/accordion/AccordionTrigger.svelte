<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { ctx } from "./ctx";
	import { melt } from "@melt-ui/svelte";
	type $$Props = HTMLButtonAttributes;

	const { trigger, props } = ctx.getTrigger();
</script>

<button use:melt={$trigger(props)} {...$$restProps} on:m-click on:m-keydown>
	<slot />
</button>
