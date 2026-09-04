<script lang="ts">
	import { cn } from "cn";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLUListElement> = $props();
</script>

<ul class={cn("my-6 ms-6 list-disc", className)} {...restProps}>
	{@render children?.()}
</ul>
