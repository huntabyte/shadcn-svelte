<script lang="ts">
	import { Command as CommandPrimitive } from "cmdk-sv";
	import { cn } from "$lib/utils";

	type $$Props = CommandPrimitive.ItemProps;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Item
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	{...$$restProps}
>
	<slot />
</CommandPrimitive.Item>
