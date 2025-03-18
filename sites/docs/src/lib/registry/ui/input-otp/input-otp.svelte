<script lang="ts">
	import { PinInput as InputOTPPrimitive } from "bits-ui";
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: ComponentProps<typeof InputOTPPrimitive.Root> = $props();
</script>

<InputOTPPrimitive.Root
	bind:ref
	bind:value
	class={cn(
		"flex items-center gap-2 has-[:disabled]:opacity-50 [&_input]:disabled:cursor-not-allowed",
		className
	)}
	{...restProps}
/>
