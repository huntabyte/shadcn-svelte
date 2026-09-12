<script lang="ts">
	import { cn } from "cn";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class={cn("leading-relaxed [&:not(:first-child)]:mt-6", className)} {...restProps}>
	{@render children?.()}
</p>
