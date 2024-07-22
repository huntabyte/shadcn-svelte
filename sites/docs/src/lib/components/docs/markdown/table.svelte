<script lang="ts">
	import { cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<div class="my-6 w-full overflow-y-auto">
	<table class={cn("w-full", className)} {...restProps}>
		{@render children?.()}
	</table>
</div>
