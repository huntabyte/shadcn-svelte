<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<tfoot
	class={cn("bg-primary font-medium text-primary-foreground", className)}
	{...$$restProps}
>
	<slot />
</tfoot>
