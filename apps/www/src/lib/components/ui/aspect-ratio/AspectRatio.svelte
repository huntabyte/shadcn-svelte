<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let ratio: number = 4 / 3;

	$: ratioClass = `aspect-[${ratio}]`;
</script>

<div class={cn(ratioClass, className)} {...$$restProps}>
	<slot />
</div>
