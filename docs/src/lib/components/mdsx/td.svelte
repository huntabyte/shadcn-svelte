<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLTdAttributes = $props();
</script>

<td class={className} {...restProps}>
	{@render children?.()}
</td>
