<script lang="ts">
	import { Button as ButtonPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { buttonVariants, type Size, type Variant } from ".";

	type $$Props = ButtonPrimitive.Props & {
		variant?: Variant;
		size?: Size;
	};

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</ButtonPrimitive.Root>
