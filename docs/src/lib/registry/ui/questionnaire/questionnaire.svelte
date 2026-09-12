<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		item = $bindable(),
		children,
		...restProps
	}: ComponentProps<typeof QuestionnairePrimitive.Root> = $props();
</script>

<QuestionnairePrimitive.Root
	data-slot="questionnaire"
	class={cn("cn-questionnaire flex w-full min-w-0 flex-col", className)}
	bind:item
	{...restProps}
>
	{@render children?.()}
</QuestionnairePrimitive.Root>
