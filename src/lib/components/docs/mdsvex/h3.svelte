<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLAttributes<HTMLHeadingElement>;
</script>

<h3 class={cn("font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)}>
	<slot />
</h3>
