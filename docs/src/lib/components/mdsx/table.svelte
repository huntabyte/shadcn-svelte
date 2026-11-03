<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<div class="typeset-scroll no-scrollbar scroll-fade-x *:[table]:w-full">
	<table class={className} {...restProps}>
		{@render children?.()}
	</table>
</div>
