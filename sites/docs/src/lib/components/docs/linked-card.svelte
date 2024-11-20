<script lang="ts">
	import { type PrimitiveAnchorAttributes, cn } from "$lib/utils.js";

	let { class: className, href, children }: PrimitiveAnchorAttributes = $props();
</script>

<a
	{href}
	class={cn(
		"bg-card text-card-foreground hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10",
		className
	)}
>
	{@render children?.()}
</a>
