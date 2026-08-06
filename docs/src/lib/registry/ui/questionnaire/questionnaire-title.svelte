<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	type Props = Omit<HTMLAttributes<HTMLLegendElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { class: className, children, ...restProps }: Props = $props();
</script>

<legend
	data-slot="questionnaire-title"
	class={cn("cn-questionnaire-title cn-font-heading text-pretty", className)}
	{...restProps}
>
	{@render children?.()}
</legend>
