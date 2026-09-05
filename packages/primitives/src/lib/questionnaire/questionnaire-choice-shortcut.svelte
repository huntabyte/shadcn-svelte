<script lang="ts">
	import { useQuestionnaireChoiceContext } from "./internal/context.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { children, ...restProps }: Props = $props();
	let choice = useQuestionnaireChoiceContext();
</script>

<span aria-hidden="true" hidden={!choice.shortcut} {...restProps}>
	{#if children}{@render children()}{:else}{choice.shortcut}{/if}
</span>
