<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SheetPrimitive.TitleProps = $props();
</script>

<SheetPrimitive.Title
<<<<<<< HEAD
<<<<<<<< HEAD:sites/docs/src/lib/registry/default/ui/sheet/sheet-title.svelte
=======
<<<<<<<< HEAD:sites/docs/src/lib/registry/new-york/ui/sheet/sheet-title.svelte
>>>>>>> main
	bind:ref
	class={cn("text-lg font-semibold text-foreground", className)}
	{...restProps}
/>
========
	class={cn("text-foreground text-lg font-semibold", className)}
	{...$$restProps}
>
	<slot />
</SheetPrimitive.Title>
<<<<<<< HEAD
>>>>>>>> main:sites/docs/src/lib/registry/new-york/ui/sheet/sheet-title.svelte
=======
>>>>>>>> main:sites/docs/src/lib/registry/default/ui/sheet/sheet-title.svelte
>>>>>>> main
