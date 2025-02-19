<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveDivAttributes = $props();
</script>

<div class={cn("flex items-center justify-center [&>div]:w-full", className)} {...restProps}>
	{@render children?.()}
</div>
