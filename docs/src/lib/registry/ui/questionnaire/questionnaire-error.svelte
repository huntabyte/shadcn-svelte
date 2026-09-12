<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Error> = $props();
</script>

<QuestionnairePrimitive.Error
	data-slot="questionnaire-error"
	class={cn("cn-questionnaire-error text-destructive", className)}
	{children}
	{...restProps}
/>
