<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";

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
