<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	let { class: className, children, ...restProps }: PrimitiveDivAttributes = $props();
</script>

<div
	class={cn("flex w-full items-center justify-center space-x-4 py-4 md:pb-10", className)}
	{...restProps}
>
	{@render children?.()}
</div>
