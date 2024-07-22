<script lang="ts">
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tr class={cn("even:bg-muted m-0 border-t p-0", className)} {...$$restProps}>
	<slot />
</tr>
