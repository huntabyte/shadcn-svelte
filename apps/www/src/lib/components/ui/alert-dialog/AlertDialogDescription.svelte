<script lang="ts">
	import * as AlertDialogPrimitive from "$primitives/alert-dialog";
	import { cn } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.DescriptionProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Description>
