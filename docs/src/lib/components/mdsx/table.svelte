<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<div class="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
	<table
		class={cn(
			"relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
