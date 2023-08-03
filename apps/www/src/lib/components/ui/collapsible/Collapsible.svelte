<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt, type CollapsibleProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let disabled: CollapsibleProps["disabled"] = undefined;
	export let defaultOpen: CollapsibleProps["defaultOpen"] = undefined;
	export let open: CollapsibleProps["open"] = undefined;
	export let onOpenChange: CollapsibleProps["onOpenChange"] = undefined;

	const root = ctx.set({
		disabled,
		defaultOpen,
		open,
		onOpenChange
	});
</script>

<div use:melt={$root} class={cn(className)} {...$$restProps}>
	<slot />
</div>
