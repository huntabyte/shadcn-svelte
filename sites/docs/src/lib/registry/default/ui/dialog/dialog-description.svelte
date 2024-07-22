<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
<<<<<<< HEAD
<<<<<<<< HEAD:sites/docs/src/lib/registry/default/ui/dialog/dialog-description.svelte
=======
<<<<<<<< HEAD:sites/docs/src/lib/registry/new-york/ui/dialog/dialog-description.svelte
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
</DialogPrimitive.Description>
<<<<<<< HEAD
>>>>>>>> main:sites/docs/src/lib/registry/new-york/ui/dialog/dialog-description.svelte
=======
>>>>>>>> main:sites/docs/src/lib/registry/default/ui/dialog/dialog-description.svelte
>>>>>>> main
