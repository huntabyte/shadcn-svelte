<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";
	type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { class: className, children, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
</script>

<div
	data-slot="questionnaire-choices"
	data-shortcuts={context.shortcuts ?? undefined}
	class={cn("cn-questionnaire-choices group/questionnaire-choices grid min-w-0", className)}
	{...restProps}
>
	{@render children?.()}
</div>
