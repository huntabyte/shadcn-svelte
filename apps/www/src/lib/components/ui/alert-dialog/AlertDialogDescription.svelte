<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Description>
