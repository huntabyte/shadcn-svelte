<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLUListElement> = $props();
</script>

<ul class={cn("my-6 ms-6 list-disc", className)} {...restProps}>
	{@render children?.()}
</ul>
