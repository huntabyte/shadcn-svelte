<script lang="ts">
	import { Toggle as TogglePrimitive } from "bits-ui";
	import { type ToggleSize, type ToggleVariant, toggleVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		pressed = $bindable(),
		class: className,
		size = "default",
		variant = "default",
		...restProps
	}: TogglePrimitive.RootProps & {
		variant?: ToggleVariant;
		size?: ToggleSize;
	} = $props();
</script>

<TogglePrimitive.Root
	bind:ref
	bind:pressed
	class={cn(toggleVariants({ variant, size, className }))}
	{...restProps}
/>
