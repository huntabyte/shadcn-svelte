<script lang="ts" module>
	import { createContext } from "svelte";
	import type { ToggleVariants } from "$lib/registry/ui/toggle/index.js";
	export const [getToggleGroupCtx, setToggleGroupCtx] = createContext<ToggleVariants>();
</script>

<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size = "default",
		variant = "default",
		...restProps
	}: ToggleGroupPrimitive.RootProps & ToggleVariants = $props();

	setToggleGroupCtx({
		variant,
		size,
	});
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<ToggleGroupPrimitive.Root
	bind:value={value as never}
	bind:ref
	data-slot="toggle-group"
	data-variant={variant}
	data-size={size}
	class={cn(
		"group/toggle-group data-[variant=outline]:shadow-xs flex w-fit items-center rounded-md",
		className
	)}
	{...restProps}
/>
