<script lang="ts">
	import * as DropdownMenuPrimitive from "$primitives/dropdown-menu";
	import { cn } from "$lib/utils";

	type $$Props = DropdownMenuPrimitive.SeparatorProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Separator
	class={cn("-mx-1 my-1 h-px bg-muted", className)}
	{...$$restProps}
/>
