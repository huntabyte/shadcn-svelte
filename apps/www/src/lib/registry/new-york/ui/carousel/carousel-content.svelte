<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getEmblaContext } from "./context.js";

	type $$Props = HTMLAttributes<HTMLDivElement>;

	let className: string | undefined | null = undefined;
	export { className as class };

	const { orientation } = getEmblaContext("<Carousel.Content/>");
</script>

<div class="overflow-hidden">
	<div
		class={cn("flex", $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
		data-embla-container=""
		{...$$restProps}
	>
		<slot />
	</div>
</div>
