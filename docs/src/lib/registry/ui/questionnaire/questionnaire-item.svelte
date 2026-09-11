<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: QuestionnairePrimitive.ItemProps = $props();
</script>

<QuestionnairePrimitive.Item
	data-slot="questionnaire-item"
	class={cn("cn-questionnaire-item min-w-0 border-0 p-0 outline-none", className)}
	{...restProps}
/>
