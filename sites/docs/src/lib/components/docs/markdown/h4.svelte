<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h4 class={cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight", className)} {...$$restProps}>
	<slot />
</h4>
