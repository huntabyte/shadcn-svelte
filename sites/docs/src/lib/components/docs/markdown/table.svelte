<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<div class="my-6 w-full overflow-y-auto rounded-lg">
	<table
		class={cn(
			"after:ring-border relative w-full overflow-hidden text-sm after:absolute after:inset-0 after:rounded-lg after:ring-1",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
