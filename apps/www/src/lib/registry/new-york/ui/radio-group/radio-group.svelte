<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(),
		...restProps
	}: RadioGroupPrimitive.RootProps = $props();

	export { className as class };
</script>

<RadioGroupPrimitive.Root bind:value class={cn("grid gap-2", className)} {...restProps} bind:ref />
