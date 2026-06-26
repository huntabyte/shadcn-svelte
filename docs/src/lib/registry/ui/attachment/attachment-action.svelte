<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		variant = "ghost",
		size = "icon-xs",
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<Button data-slot="attachment-action" {variant} {size} class={cn(className)} {...restProps}>
	{@render children?.()}
</Button>
