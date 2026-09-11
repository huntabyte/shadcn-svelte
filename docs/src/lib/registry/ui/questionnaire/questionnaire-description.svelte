<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn/svelte/questionnaire";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: QuestionnairePrimitive.DescriptionProps = $props();
</script>

<QuestionnairePrimitive.Description
	data-slot="questionnaire-description"
	class={cn("cn-questionnaire-description text-pretty text-muted-foreground", className)}
	{...restProps}
/>
