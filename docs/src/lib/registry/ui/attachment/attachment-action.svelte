<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	let {
		class: className,
		variant = "ghost",
		size = "icon-xs",
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<Button data-slot="attachment-action" {variant} {size} class={className} {...restProps}>
	{@render children?.()}
</Button>
