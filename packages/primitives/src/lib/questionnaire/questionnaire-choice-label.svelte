<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	type Props = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { children, ...restProps }: Props = $props();
</script>

<span {...restProps}>{@render children?.()}</span>
