<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: QuestionnairePrimitive.TitleProps = $props();
</script>

<QuestionnairePrimitive.Title
	data-slot="questionnaire-title"
	class={cn("cn-questionnaire-title cn-font-heading text-pretty", className)}
	{...restProps}
/>
