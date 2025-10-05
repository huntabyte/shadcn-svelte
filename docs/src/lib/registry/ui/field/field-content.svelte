<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="field-content"
	class={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
	{...restProps}
>
	{@render children?.()}
</div>
