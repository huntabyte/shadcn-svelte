<script lang="ts">
	import * as SelectPrimitive from "$primitives/select";
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
