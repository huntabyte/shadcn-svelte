<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Progress> = $props();
</script>

<QuestionnairePrimitive.Progress
	data-slot="questionnaire-progress"
	class={cn(
		"cn-questionnaire-progress min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground tabular-nums",
		className
	)}
	{children}
	{...restProps}
/>
