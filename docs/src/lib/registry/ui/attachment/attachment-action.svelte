<script lang="ts">
	import { cn } from "cn";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "ghost",
		size = "icon-xs",
		...restProps
	}: ButtonProps = $props();
</script>

<Button
	bind:ref
	data-slot="attachment-action"
	{variant}
	{size}
	class={cn("cn-attachment-action", className)}
	{...restProps}
/>
