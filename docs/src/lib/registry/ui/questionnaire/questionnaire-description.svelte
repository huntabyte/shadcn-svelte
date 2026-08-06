<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { id, class: className, children, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	const generatedId = $props.id();
	let descriptionId = $derived(id ?? `${generatedId}-description`);
	onMount(() => context.registerDescription(item.name, descriptionId));
</script>

<p
	id={descriptionId}
	data-slot="questionnaire-description"
	class={cn("cn-questionnaire-description text-pretty text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</p>
