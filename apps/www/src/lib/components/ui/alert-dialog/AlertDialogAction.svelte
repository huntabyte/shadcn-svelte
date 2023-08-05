<script lang="ts">
	import * as AlertDialogPrimitive from "$primitives/alert-dialog";
	import { buttonVariants } from "$components/ui/button";
	import { cn } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.ActionProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Action
	class={cn(buttonVariants(), className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Action>
