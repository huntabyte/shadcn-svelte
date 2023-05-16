<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", className)} {...$$restProps}>
	<slot />
</div>
