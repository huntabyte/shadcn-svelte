<script lang="ts">
	import { type PrimitiveAnchorAttributes, cn } from "$lib/utils.js";

	let { class: className, href, children }: PrimitiveAnchorAttributes = $props();
</script>

<a
	{href}
	class={cn(
		"flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
		className
	)}
>
	{@render children?.()}
</a>
