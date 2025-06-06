<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div class={cn("container-wrapper scroll-mt-24", className)} {...restProps}>
	<div class="container flex items-center justify-between gap-4 py-4">
		{@render children?.()}
	</div>
</div>
