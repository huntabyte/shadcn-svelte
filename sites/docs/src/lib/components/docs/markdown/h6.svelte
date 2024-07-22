<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h6
	class={cn("mt-8 scroll-m-20 text-base font-semibold tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</h6>
