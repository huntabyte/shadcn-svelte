<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AlertDialogPrimitive.DescriptionProps = $props();
</script>

<AlertDialogPrimitive.Description
<<<<<<< HEAD
<<<<<<<< HEAD:sites/docs/src/lib/registry/default/ui/alert-dialog/alert-dialog-description.svelte
=======
<<<<<<<< HEAD:sites/docs/src/lib/registry/new-york/ui/alert-dialog/alert-dialog-description.svelte
>>>>>>> main
	bind:ref
	class={cn("text-sm text-muted-foreground", className)}
	{...restProps}
/>
========
	class={cn("text-muted-foreground text-sm", className)}
	{...$$restProps}
>
	<slot />
</AlertDialogPrimitive.Description>
<<<<<<< HEAD
>>>>>>>> main:sites/docs/src/lib/registry/new-york/ui/alert-dialog/alert-dialog-description.svelte
=======
>>>>>>>> main:sites/docs/src/lib/registry/default/ui/alert-dialog/alert-dialog-description.svelte
>>>>>>> main
