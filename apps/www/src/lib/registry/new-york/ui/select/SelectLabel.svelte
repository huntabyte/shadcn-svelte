<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SelectPrimitive.LabelProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SelectPrimitive.Label
	class={cn("px-2 py-1.5 text-sm font-semibold", className)}
	{...$$restProps}
>
	<slot />
</SelectPrimitive.Label>
