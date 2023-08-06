<script lang="ts">
	import * as MenubarPrimitive from "$primitives/menubar";
	import { cn } from "$lib/utils";

	type $$Props = MenubarPrimitive.SeparatorProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Separator
	class={cn("-mx-1 my-1 h-px bg-muted", className)}
	{...$$restProps}
/>
