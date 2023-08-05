<script lang="ts">
	import * as ContextMenuPrimitive from "$primitives/context-menu";
	import { cn } from "$lib/utils";

	type $$Props = ContextMenuPrimitive.SeparatorProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<ContextMenuPrimitive.Separator
	class={cn("-mx-1 my-1 h-px bg-border", className)}
	{...$$restProps}
/>
