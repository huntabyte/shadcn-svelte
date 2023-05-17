<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLAttributes<HTMLHeadingElement>;
</script>

<h2
	class={cn(
		"font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
		className
	)}
	{...$$restProps}
>
	<slot />
</h2>
