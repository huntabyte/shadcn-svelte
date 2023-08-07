<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SelectPrimitive.LabelProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SelectPrimitive.Label
	class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
	{...$$restProps}
>
	<slot />
</SelectPrimitive.Label>
