<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
</script>

<div class={cn("flex flex-wrap items-center justify-between gap-2 pt-2", className)}>
	{@render children?.()}
</div>
