<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Action
	class={cn(buttonVariants(), className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Action>
