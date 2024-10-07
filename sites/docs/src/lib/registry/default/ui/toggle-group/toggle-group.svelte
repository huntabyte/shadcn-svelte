<script lang="ts" module>
	import { getContext, setContext } from "svelte";
	import type { ToggleVariants } from "$lib/registry/default/ui/toggle/index.js";
	export function setToggleGroupCtx(props: ToggleVariants) {
		setContext("toggleGroup", props);
	}

	export function getToggleGroupCtx() {
		return getContext<ToggleVariants>("toggleGroup");
	}
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

<ToggleGroupPrimitive.Root
	bind:ref
	class={cn("flex items-center justify-center gap-1", className)}
	bind:value={value as any}
	{...restProps}
/>
