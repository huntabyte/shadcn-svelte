<script lang="ts">
	import { ctx } from "../ctx";
	import type { ItemProps } from "../types";
	import { melt } from "@melt-ui/svelte";
	type $$Props = ItemProps;

	export let value: ItemProps["value"];
	export let disabled: ItemProps["disabled"] = undefined;

	const { item, props } = ctx.setItem({ value, disabled });
</script>

<div use:melt={$item(props)} {...$$restProps}>
	<slot />
</div>
