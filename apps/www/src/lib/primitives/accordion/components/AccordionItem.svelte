<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { ctx } from "../ctx";
	import type { AccordionItemProps } from "../types";
	import { melt } from "@melt-ui/svelte";
	type $$Props = AccordionItemProps & HTMLAttributes<HTMLDivElement>;

	export let value: AccordionItemProps["value"];
	export let disabled: AccordionItemProps["disabled"] = undefined;

	const { item, props } = ctx.setItem({ value, disabled });
</script>

<div use:melt={$item(props)} {...$$restProps}>
	<slot />
</div>
