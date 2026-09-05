<script lang="ts">
	import * as FormPrimitive from "formsnap";
	import { cn } from "cn";
	import { type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.DescriptionProps> = $props();
</script>

<FormPrimitive.Description
	bind:ref
	data-slot="form-description"
	class={cn("text-sm text-muted-foreground", className)}
	{...restProps}
/>
