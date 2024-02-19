<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tr class={cn("m-0 border-t p-0 even:bg-muted", className)} {...$$restProps}>
	<slot />
</tr>
