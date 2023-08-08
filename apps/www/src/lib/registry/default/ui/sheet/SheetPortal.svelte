<script lang="ts">
	import { Dialog as SheetPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = SheetPrimitive.PortalProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SheetPrimitive.Portal class={cn(className)} {...$$restProps}>
	<slot />
</SheetPrimitive.Portal>
