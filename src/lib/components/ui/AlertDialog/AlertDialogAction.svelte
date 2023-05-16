<script lang="ts">
	import { cn } from "$lib/utils";
	import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";
	import { buttonVariants } from "$ui/Button";
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Action class={cn(buttonVariants(), className)} {...$$restProps}>
	<slot />
</AlertDialogPrimitive.Action>
