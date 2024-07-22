<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: ContextMenuPrimitive.LabelProps & {
		inset?: boolean;
	} = $props();
</script>

<ContextMenuPrimitive.Label
<<<<<<< HEAD
<<<<<<<< HEAD:sites/docs/src/lib/registry/new-york/ui/context-menu/context-menu-label.svelte
=======
<<<<<<<< HEAD:sites/docs/src/lib/registry/default/ui/context-menu/context-menu-label.svelte
>>>>>>> main
	bind:ref
	class={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
	{...restProps}
/>
========
	class={cn("text-foreground px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
	{...$$restProps}
>
	<slot />
</ContextMenuPrimitive.Label>
<<<<<<< HEAD
>>>>>>>> main:sites/docs/src/lib/registry/default/ui/context-menu/context-menu-label.svelte
=======
>>>>>>>> main:sites/docs/src/lib/registry/new-york/ui/context-menu/context-menu-label.svelte
>>>>>>> main
