<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	let { class: className, children }: { class?: string; children?: import("svelte").Snippet } =
		$props();
	let context = useQuestionnaireContext();
	let value = $derived(context.current + 1);
</script>

<div
	data-slot="questionnaire-progress"
	class={cn(
		"cn-questionnaire-progress min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums",
		className
	)}
	role="progressbar"
	aria-valuemin="1"
	aria-valuemax={context.total}
	aria-valuenow={context.current + 1}
>
	{#if children}{@render children?.({ current: value, total: context.total })}{:else}Question {value}
		of {context.total}{/if}
</div>
