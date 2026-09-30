<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: QuestionnairePrimitive.ProgressProps = $props();
</script>

<QuestionnairePrimitive.Progress
	data-slot="questionnaire-progress"
	class={cn(
		"cn-questionnaire-progress min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums",
		className
	)}
	{...restProps}
/>
