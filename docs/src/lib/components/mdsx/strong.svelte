<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<strong class={className} {...restProps}>
	{@render children?.()}
</strong>
