<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: QuestionnairePrimitive.TitleProps = $props();
</script>

<QuestionnairePrimitive.Title
	bind:ref
	data-slot="questionnaire-title"
	class={cn("cn-questionnaire-title cn-font-heading text-pretty", className)}
	{...restProps}
/>
