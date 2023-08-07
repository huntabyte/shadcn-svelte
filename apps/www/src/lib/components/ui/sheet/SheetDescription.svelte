<script lang="ts">
	import { Dialog as SheetPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SheetPrimitive.DescriptionProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SheetPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</SheetPrimitive.Description>
