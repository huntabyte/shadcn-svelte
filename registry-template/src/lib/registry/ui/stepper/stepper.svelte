<!--
This is a custom `ui` component that is not a part of the shadcn-svelte registry.
-->

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("bg-background", className)} {...restProps}>
	{@render children?.()}
</div>
