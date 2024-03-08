<script lang="ts">
	import { cn } from "$lib/utils.js";

	export let balanced = true;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	class={cn(
		"max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl",
		balanced && "text-balance",
		className
	)}
	{...$$restProps}
>
	<slot />
</p>
