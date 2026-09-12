<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	type Props = Omit<HTMLAttributes<HTMLLegendElement>, "children"> & {
		children?: import("svelte").Snippet;
	};
	let { children, ...restProps }: Props = $props();
</script>

<legend {...restProps}>
	{@render children?.()}
</legend>
