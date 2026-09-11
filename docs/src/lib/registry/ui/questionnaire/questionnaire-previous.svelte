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
		variant = "outline",
		...restProps
	}: QuestionnairePrimitive.PreviousProps & {
		size?: ButtonSize;
		variant?: ButtonVariant;
	} = $props();
</script>

<QuestionnairePrimitive.Previous
	data-slot="questionnaire-previous"
	data-size={size}
	data-variant={variant}
	class={cn(
		buttonVariants({ size, variant }),
		"cn-questionnaire-previous col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0",
		className
	)}
	{...restProps}
/>
