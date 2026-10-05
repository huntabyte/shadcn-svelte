<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: QuestionnairePrimitive.DescriptionProps = $props();
</script>

<QuestionnairePrimitive.Description
	bind:ref
	data-slot="questionnaire-description"
	class={cn("cn-questionnaire-description text-pretty text-muted-foreground", className)}
	{...restProps}
/>
