<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLOListElement> = $props();
</script>

<ol class={cn("my-6 ms-6 list-decimal", className)} {...restProps}>
	{@render children?.()}
</ol>
