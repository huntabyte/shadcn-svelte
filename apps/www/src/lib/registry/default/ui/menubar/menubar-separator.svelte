<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = MenubarPrimitive.SeparatorProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Separator class={cn("-mx-1 my-1 h-px bg-muted", className)} {...$$restProps} />
