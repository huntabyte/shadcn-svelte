<script lang="ts">
	import { onMount } from "svelte";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./internal/context.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { id, children, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	const generatedId = $props.id();
	let descriptionId = $derived(id ?? `${generatedId}-description`);
	onMount(() => context.registerDescription(item.name, descriptionId));
</script>

<p id={descriptionId} {...restProps}>
	{@render children?.()}
</p>
