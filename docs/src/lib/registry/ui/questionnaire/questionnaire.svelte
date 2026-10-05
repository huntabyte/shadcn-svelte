<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		item = $bindable(undefined),
		ref = $bindable(null),
		...restProps
	}: QuestionnairePrimitive.RootProps = $props();
</script>

<QuestionnairePrimitive.Root
	bind:item
	bind:ref
	data-slot="questionnaire"
	class={cn("cn-questionnaire flex w-full min-w-0 flex-col", className)}
	{...restProps}
/>
