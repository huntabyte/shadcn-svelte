<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...props }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h3 class={className} {...props}>
	{@render children?.()}
</h3>
