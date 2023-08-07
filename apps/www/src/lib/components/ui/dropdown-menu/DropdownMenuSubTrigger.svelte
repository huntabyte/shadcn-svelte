<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { ChevronRight } from "lucide-svelte";

	type $$Props = DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;
</script>

<DropdownMenuPrimitive.SubTrigger
	class={cn(
		"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
		inset && "pl-8",
		className
	)}
	{...$$restProps}
>
	<slot />
	<ChevronRight class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
