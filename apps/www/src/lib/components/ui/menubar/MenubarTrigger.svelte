<script lang="ts">
	import { Menubar as MenubarPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = MenubarPrimitive.TriggerProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Trigger
	class={cn(
		"flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
		className
	)}
	{...$$restProps}
>
	<slot />
</MenubarPrimitive.Trigger>
