<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";

	type $$Props = MenubarPrimitive.CheckboxItemProps;
	type $$Events = MenubarPrimitive.CheckboxItemEvents;

	let className: $$Props["class"] = undefined;
	export let checked: $$Props["checked"] = false;
	export { className as class };
</script>

<MenubarPrimitive.CheckboxItem
	bind:checked
	class={cn(
		"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className
	)}
	on:click
	on:keydown
	on:focusin
	on:focusout
	on:pointerleave
	on:pointermove
	on:pointerdown
	{...$$restProps}
>
	<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
		<MenubarPrimitive.CheckboxIndicator>
			<Check class="h-4 w-4" />
		</MenubarPrimitive.CheckboxIndicator>
	</span>
	<slot />
</MenubarPrimitive.CheckboxItem>
