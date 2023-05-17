<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLAttributes<HTMLHeadingElement>;
</script>

<h1 class={cn("font-heading mt-2 scroll-m-20 text-4xl font-bold", className)}>
	<slot />
</h1>
