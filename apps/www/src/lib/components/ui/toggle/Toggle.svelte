<script lang="ts">
	import { Toggle as TogglePrimitive } from "@huntabyte/primitives";
	import { toggleVariants, type Variant, type Size } from ".";
	import { cn } from "$lib/utils";

	type $$Props = TogglePrimitive.Props & {
		variant?: Variant;
		size?: Size;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let pressed: $$Props["pressed"] = undefined;
</script>

<TogglePrimitive.Root
	bind:pressed
	class={cn(toggleVariants({ variant, size, className }))}
	{...$$restProps}
>
	<slot />
</TogglePrimitive.Root>
