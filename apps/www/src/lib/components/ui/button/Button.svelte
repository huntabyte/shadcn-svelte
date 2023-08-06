<script lang="ts">
	import * as ButtonPrimitive from "$primitives/button";
	import type { VariantProps } from "class-variance-authority";
	import { cn } from "$lib/utils";
	import { buttonVariants } from ".";

	type $$Props = ButtonPrimitive.Props & {
		variant?: VariantProps<typeof buttonVariants>["variant"];
		size?: VariantProps<typeof buttonVariants>["size"];
	};

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>["variant"] =
		"default";
	export let size: VariantProps<typeof buttonVariants>["size"] = "default";
	export let builders: $$Props["builders"] = [];
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
