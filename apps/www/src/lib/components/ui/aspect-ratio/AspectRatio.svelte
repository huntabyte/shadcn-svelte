<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let ratio: number = 4 / 3;
</script>

<div
	style:position="relative"
	style:width="100%"
	style:padding-bottom="{100 / ratio}%"
>
	<div
		style:position="absolute"
		style:top="0"
		style:right="0"
		style:bottom="0"
		style:left="0"
		class={cn(className)}
		{...$$restProps}
	>
		<slot />
	</div>
</div>
