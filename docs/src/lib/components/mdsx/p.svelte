<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class={className} {...restProps}>
	{@render children?.()}
</p>
