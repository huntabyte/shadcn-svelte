<script lang="ts">
	import { cn } from "cn";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr class={cn("m-0 border-b", className)} {...restProps}>
	{@render children?.()}
</tr>
