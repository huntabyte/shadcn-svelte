<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { buttonVariants } from "@/registry/default/ui/button";
	import { cn } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.ActionProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Action
	class={cn(buttonVariants(), className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Action>
