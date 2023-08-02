<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, type AccordionItemProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: AccordionItemProps["value"];
	export let disabled: AccordionItemProps["disabled"] = false;

	const { item, props } = ctx.setItem({ value, disabled });
</script>

<div
	use:item
	{...$item(props)}
	class={cn("border-b", className)}
	{...$$restProps}
>
	<slot />
</div>
