<script lang="ts">
	import * as SelectPrimitive from "$primitives/select";
	import { cn } from "$lib/utils";

	type $$Props = SelectPrimitive.SeparatorProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SelectPrimitive.Separator
	class={cn("-mx-1 my-1 h-px bg-muted", className)}
	{...$$restProps}
/>
