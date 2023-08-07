<script lang="ts">
	import { Dialog as DialogPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = DialogPrimitive.DescriptionProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DialogPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</DialogPrimitive.Description>
