<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	data-slot="questionnaire-actions"
	class={cn(
		"cn-questionnaire-actions grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
