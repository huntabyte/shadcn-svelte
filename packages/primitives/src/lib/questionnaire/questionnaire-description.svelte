<script lang="ts">
	import { onMount } from "svelte";
	import { useQuestionnaireItemContext } from "./internal/context.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLParagraphElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { id, children, ...restProps }: Props = $props();
	let item = useQuestionnaireItemContext();
	const generatedId = $props.id();
	let descriptionId = $derived(id ?? `${generatedId}-description`);
	onMount(() => item.registerDescription(descriptionId));
</script>

<p id={descriptionId} {...restProps}>
	{@render children?.()}
</p>
