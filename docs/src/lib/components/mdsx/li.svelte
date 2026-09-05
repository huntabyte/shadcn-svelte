<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLLIElement> = $props();
</script>

<li class={className} {...restProps}>
	{@render children?.()}
</li>
