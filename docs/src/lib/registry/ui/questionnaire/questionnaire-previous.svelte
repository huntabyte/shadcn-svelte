<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	type Props = ComponentProps<typeof QuestionnairePrimitive.Previous> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
	};
	let {
		children,
		class: className,
		size = "default",
		variant = "outline",
		...restProps
	}: Props = $props();
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
	>{#if children}{@render children()}{:else}Previous{/if}</QuestionnairePrimitive.Previous
>
