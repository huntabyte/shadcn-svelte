<script lang="ts">
	import { cn } from "$lib/utils.js";
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn("flex w-full items-center justify-center space-x-4 py-4 md:pb-10", className)}>
	<slot />
</div>
