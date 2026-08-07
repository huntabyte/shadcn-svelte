<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	type Props = ComponentProps<typeof QuestionnairePrimitive.Submit> & {
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

<QuestionnairePrimitive.Submit
	data-slot="questionnaire-submit"
	data-size={size}
	data-variant={variant}
	class={cn(
		buttonVariants({ size, variant }),
		"cn-questionnaire-submit col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0",
		className
	)}
	{...restProps}
	>{#if children}{@render children()}{:else}Submit{/if}</QuestionnairePrimitive.Submit
>
