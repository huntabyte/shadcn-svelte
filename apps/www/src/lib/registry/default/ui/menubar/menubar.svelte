<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = MenubarPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Root
	class={cn(
		"flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
		className
	)}
	{...$$restProps}
>
	<slot />
</MenubarPrimitive.Root>
