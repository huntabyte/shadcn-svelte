<script lang="ts">
	import { type Props, buttonVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		children,
		...restProps
	}: Props = $props();
</script>

<button
	bind:this={ref}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...restProps}
>
	{@render children?.()}
</button>
