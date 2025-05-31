<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<div class="my-6 w-full overflow-y-auto">
	<table
		class={cn("relative w-full overflow-hidden border-none text-sm", className)}
		{...restProps}
	>
		{@render children?.()}
	</table>
</div>
