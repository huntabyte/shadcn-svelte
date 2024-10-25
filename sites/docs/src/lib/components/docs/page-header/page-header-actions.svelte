<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: PrimitiveDivAttributes = $props();
</script>

<div class={cn("flex w-full items-center justify-start gap-2 py-2", className)} {...restProps}>
	{@render children?.()}
</div>
