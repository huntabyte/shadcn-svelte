<script lang="ts">
	import * as ContextMenuPrimitive from "$primitives/context-menu";
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";

	type $$Props = ContextMenuPrimitive.CheckboxItemProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<ContextMenuPrimitive.CheckboxItem
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<ContextMenuPrimitive.CheckboxItemIndicator>
			<Check class="h-4 w-4" />
		</ContextMenuPrimitive.CheckboxItemIndicator>
	</span>
	<slot />
</ContextMenuPrimitive.CheckboxItem>
