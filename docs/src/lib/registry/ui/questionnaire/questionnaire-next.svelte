<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	type Props = ComponentProps<typeof QuestionnairePrimitive.Next> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
	};
	let {
		children,
		class: className,
		size = "default",
		variant = "default",
		...restProps
	}: Props = $props();
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
	>{#if children}{@render children()}{:else}Next{/if}</QuestionnairePrimitive.Next
>
