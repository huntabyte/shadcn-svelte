<script lang="ts">
	import { Menubar as MenubarPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	type $$Props = MenubarPrimitive.Props;
</script>

<MenubarPrimitive.Root
	class={cn(
		"flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
		className
	)}
>
	<slot />
</MenubarPrimitive.Root>
