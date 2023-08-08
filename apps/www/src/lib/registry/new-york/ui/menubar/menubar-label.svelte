<script lang="ts">
	import { Menubar as MenubarPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = MenubarPrimitive.LabelProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;
</script>

<MenubarPrimitive.Label
	class={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
	{...$$restProps}
>
	<slot />
</MenubarPrimitive.Label>
