<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/bits-ui";
	import * as AlertDialog from ".";
	import { cn, transition } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.ContentProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<AlertDialog.Portal>
	<AlertDialog.Overlay />
	<AlertDialogPrimitive.Content
		{transition}
		class={cn(
			"fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</AlertDialogPrimitive.Content>
</AlertDialog.Portal>
