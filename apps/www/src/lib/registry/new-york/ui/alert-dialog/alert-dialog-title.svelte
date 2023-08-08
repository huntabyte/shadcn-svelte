<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.TitleProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let level: AlertDialogPrimitive.TitleProps["level"] = "h3";
</script>

<AlertDialogPrimitive.Title
	class={cn("text-lg font-semibold", className)}
	{level}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Title>
