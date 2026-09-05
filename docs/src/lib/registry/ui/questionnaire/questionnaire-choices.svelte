<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Choices> = $props();
</script>

<QuestionnairePrimitive.Choices
	data-slot="questionnaire-choices"
	class={cn("cn-questionnaire-choices group/questionnaire-choices grid min-w-0", className)}
	{...restProps}
>
	{@render children?.()}
</QuestionnairePrimitive.Choices>
