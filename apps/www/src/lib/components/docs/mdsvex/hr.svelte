<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<hr class={cn("my-4 md:my-8", className)} {...$$restProps} />
