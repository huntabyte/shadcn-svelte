<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="my-6 w-full overflow-y-auto">
	<table class={cn("w-full", className)} {...$$restProps}>
		<slot />
	</table>
</div>
