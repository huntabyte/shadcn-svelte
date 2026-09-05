<script lang="ts">
	import { useQuestionnaireContext } from "./internal/context.js";
	import type { HTMLAttributes } from "svelte/elements";
	type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { children, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
</script>

<div data-shortcuts={context.shortcuts ?? undefined} {...restProps}>
	{@render children?.()}
</div>
