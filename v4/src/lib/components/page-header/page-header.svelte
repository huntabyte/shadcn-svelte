<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<section class={cn("border-grid", className)} {...restProps}>
	<div class="container-wrapper">
		<div
			class="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
		>
			{@render children?.()}
		</div>
	</div>
</section>
