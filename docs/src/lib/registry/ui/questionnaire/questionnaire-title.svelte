<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Title> = $props();
</script>

<QuestionnairePrimitive.Title
	data-slot="questionnaire-title"
	class={cn("cn-questionnaire-title cn-font-heading text-pretty", className)}
	{...restProps}
>
	{@render children?.()}
</QuestionnairePrimitive.Title>
