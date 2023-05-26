<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="w-full overflow-auto">
	<table
		class={cn("w-full caption-bottom text-sm", className)}
		{...$$restProps}
	>
		<slot />
	</table>
</div>
