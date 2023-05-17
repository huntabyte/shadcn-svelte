<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLAttributes<HTMLParagraphElement>;
</script>

<p class={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...$$restProps}>
	<slot />
</p>
