<script lang="ts">
	import { Toggle as TogglePrimitive } from "bits-ui";
	import type { ToggleVariants } from "../toggle-group/index.js";
	import { toggleVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		pressed = $bindable(false),
		class: className,
		size,
		variant,
		...restProps
	}: TogglePrimitive.RootProps & ToggleVariants = $props();
</script>

<TogglePrimitive.Root
	bind:ref
	bind:pressed
	class={cn(toggleVariants({ variant, size, className }))}
	{...restProps}
/>
