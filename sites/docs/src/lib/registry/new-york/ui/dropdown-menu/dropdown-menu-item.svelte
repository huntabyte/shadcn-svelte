<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	class={cn(
		"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		inset && "pl-8",
		className
	)}
<<<<<<< HEAD
<<<<<<<< HEAD:sites/docs/src/lib/registry/new-york/ui/dropdown-menu/dropdown-menu-item.svelte
	{...restProps}
/>
========
	{...$$restProps}
=======
<<<<<<<< HEAD:sites/docs/src/lib/registry/default/ui/dropdown-menu/dropdown-menu-item.svelte
	{...restProps}
========
>>>>>>>> main:sites/docs/src/lib/registry/new-york/ui/dropdown-menu/dropdown-menu-item.svelte
>>>>>>> main
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerdown
	on:pointerleave
	on:pointermove
<<<<<<< HEAD
>
	<slot />
</DropdownMenuPrimitive.Item>
>>>>>>>> main:sites/docs/src/lib/registry/default/ui/dropdown-menu/dropdown-menu-item.svelte
=======
<<<<<<<< HEAD:sites/docs/src/lib/registry/default/ui/dropdown-menu/dropdown-menu-item.svelte
/>
========
	{...$$restProps}
>
	<slot />
</DropdownMenuPrimitive.Item>
>>>>>>>> main:sites/docs/src/lib/registry/new-york/ui/dropdown-menu/dropdown-menu-item.svelte
>>>>>>> main
