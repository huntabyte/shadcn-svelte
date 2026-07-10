<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr class={className} {...restProps}>
	{@render children?.()}
</tr>
