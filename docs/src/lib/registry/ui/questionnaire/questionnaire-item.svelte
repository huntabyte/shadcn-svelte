<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Item> = $props();
</script>

<QuestionnairePrimitive.Item
	data-slot="questionnaire-item"
	class={cn("cn-questionnaire-item min-w-0 border-0 p-0 outline-none", className)}
	{...restProps}
>
	{@render children?.()}
</QuestionnairePrimitive.Item>
