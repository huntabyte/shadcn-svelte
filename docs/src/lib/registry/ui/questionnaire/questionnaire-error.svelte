<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn/svelte/questionnaire";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: QuestionnairePrimitive.ErrorProps = $props();
</script>

<QuestionnairePrimitive.Error
	data-slot="questionnaire-error"
	class={cn("cn-questionnaire-error text-destructive", className)}
	{...restProps}
/>
