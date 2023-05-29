<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div
	class={cn(
		"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
