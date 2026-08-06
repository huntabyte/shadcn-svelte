<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type State = { current: number; first: boolean; last: boolean; total: number };
	type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & { children?: Snippet<[State]> };
	let { class: className, children, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
	let state = $derived({
		current: context.current,
		first: context.first,
		last: context.last,
		total: context.total,
	});
	let label = $derived(
		context.total ? `Question ${context.current} of ${context.total}` : undefined
	);
</script>

<div
	data-slot="questionnaire-progress"
	class={cn(
		"cn-questionnaire-progress min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums",
		className
	)}
	role="progressbar"
	aria-label="Questionnaire progress"
	aria-live="polite"
	aria-valuemin={context.total ? 1 : undefined}
	aria-valuemax={context.total || undefined}
	aria-valuenow={context.total ? context.current : undefined}
	aria-valuetext={label}
	{...restProps}
>
	{#if children}{@render children(state)}{:else}{label}{/if}
</div>
