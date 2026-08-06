<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
		message?: string;
		children?: import("svelte").Snippet;
	};

	let { message, id, class: className, children, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	const generatedId = $props.id();
	let errorId = $derived(id ?? `${generatedId}-error`);
	let visible = $derived(context.invalid(item.name));
	let defaultMessage = $derived(
		item.required ? "Choose an answer to continue." : "Choose an answer or skip this question."
	);

	onMount(() => context.registerError(item.name, errorId));
</script>

<p
	hidden={!visible}
	id={errorId}
	data-slot="questionnaire-error"
	data-invalid={visible ? "" : undefined}
	role={visible ? "alert" : undefined}
	class={cn("cn-questionnaire-error text-destructive", className)}
	{...restProps}
>
	{#if children}{@render children()}{:else}{message ?? defaultMessage}{/if}
</p>
