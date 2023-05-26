<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Title
	class={cn("text-lg font-semibold", className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Title>
