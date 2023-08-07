<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = DropdownMenuPrimitive.LabelProps & {
		inset?: boolean;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let inset: boolean | undefined = undefined;
</script>

<DropdownMenuPrimitive.Label
	class={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
	{...$$restProps}
>
	<slot />
</DropdownMenuPrimitive.Label>
