<script lang="ts">
	import { Dialog as SheetPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SheetPrimitive.TitleProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SheetPrimitive.Title
	class={cn("text-lg font-semibold text-foreground", className)}
	{...$$restProps}
>
	<slot />
</SheetPrimitive.Title>
