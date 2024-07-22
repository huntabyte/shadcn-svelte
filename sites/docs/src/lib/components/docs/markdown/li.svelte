<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<li class={cn("mt-2", className)} {...$$restProps}>
	<slot />
</li>
