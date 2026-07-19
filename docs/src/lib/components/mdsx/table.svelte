<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<div class="typeset-scroll scroll-fade-x scrollbar-none">
	<table class={className} {...restProps}>
		{@render children?.()}
	</table>
</div>
