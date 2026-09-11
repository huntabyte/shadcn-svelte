<script lang="ts">
	import { Questionnaire as QuestionnairePrimitive } from "@shadcn/svelte/questionnaire";
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		size = "default",
		variant = "default",
		...restProps
	}: QuestionnairePrimitive.NextProps & {
		size?: ButtonSize;
		variant?: ButtonVariant;
	} = $props();
</script>

<QuestionnairePrimitive.Next
	data-slot="questionnaire-next"
	data-size={size}
	data-variant={variant}
	class={cn(
		buttonVariants({ size, variant }),
		"cn-questionnaire-next col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0",
		className
	)}
	{...restProps}
/>
