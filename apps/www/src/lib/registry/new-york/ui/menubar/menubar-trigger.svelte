<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = MenubarPrimitive.TriggerProps;
	type $$Events = MenubarPrimitive.TriggerEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Trigger
	class={cn(
		"flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
	on:pointerenter
>
	<slot />
</MenubarPrimitive.Trigger>
