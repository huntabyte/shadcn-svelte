<script lang="ts">
	import { cn } from "$lib/utils.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
</script>

<div role="group" class={cn("grid gap-3", className)}>{@render children?.()}</div>
