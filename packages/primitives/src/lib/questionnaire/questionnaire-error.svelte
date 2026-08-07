<script lang="ts">
	import { onMount } from "svelte";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./internal/context.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
		message?: string;
		children?: import("svelte").Snippet;
	};

	let { message, id, children, ...restProps }: Props = $props();
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
	data-invalid={visible ? "" : undefined}
	role={visible ? "alert" : undefined}
	{...restProps}
>
	{#if children}{@render children()}{:else}{message ?? defaultMessage}{/if}
</p>
