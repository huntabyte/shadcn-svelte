<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: QuestionnairePrimitive.InputProps = $props();
</script>

<div
	data-slot="questionnaire-input-wrapper"
	class="cn-questionnaire-input-wrapper group/questionnaire-input relative min-w-0"
>
	<QuestionnairePrimitive.Input
		data-slot="questionnaire-input"
		class={cn(
			"cn-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0",
			"selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
			className
		)}
		{...restProps}
	/>
</div>
