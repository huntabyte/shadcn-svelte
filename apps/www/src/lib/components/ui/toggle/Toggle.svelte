<script lang="ts">
	import * as TogglePrimitive from "$primitives/toggle";
	import { toggleVariants, type Variant, type Size } from ".";
	import { cn } from "$lib/utils";

	type $$Props = TogglePrimitive.Props;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: Variant = "default";
	export let size: Size = "default";
	export let pressed: $$Props["pressed"] = undefined;
</script>

<TogglePrimitive.Root
	bind:pressed
	class={cn(toggleVariants({ variant, size, className }))}
	{...$$restProps}
>
	<slot />
</TogglePrimitive.Root>
