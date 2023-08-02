<script lang="ts">
	import { cn } from "$lib/utils";
	import { setAccordionItem, type AccordionItemProps, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: AccordionItemProps["value"];
	export let disabled: AccordionItemProps["disabled"] = false;

	const { item, props } = setAccordionItem({ value, disabled });
</script>

<div use:melt={$item(props)} class={cn("border-b", className)} {...$$restProps}>
	<slot />
</div>
