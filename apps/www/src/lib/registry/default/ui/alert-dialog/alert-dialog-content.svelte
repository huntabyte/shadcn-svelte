<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive, type WithoutChild } from "bits-ui";
	import * as AlertDialog from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<AlertDialogPrimitive.ContentProps> = $props();
</script>

<AlertDialog.Portal>
	<AlertDialog.Overlay />
	<AlertDialogPrimitive.Content
		bind:ref
		class={cn(
			"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",
			className
		)}
		{...restProps}
	/>
</AlertDialog.Portal>
