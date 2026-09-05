<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLOListElement> = $props();
</script>

<ol class={className} {...restProps}>
	{@render children?.()}
</ol>
