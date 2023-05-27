<script lang="ts">
	import type { DialogDescriptionProps } from "radix-svelte";
	import { Dialog as SheetPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = DialogDescriptionProps;
</script>

<SheetPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</SheetPrimitive.Description>
