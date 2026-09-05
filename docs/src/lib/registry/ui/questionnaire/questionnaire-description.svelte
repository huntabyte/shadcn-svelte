<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Description> = $props();
</script>

<QuestionnairePrimitive.Description
	data-slot="questionnaire-description"
	class={cn("cn-questionnaire-description text-pretty text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</QuestionnairePrimitive.Description>
