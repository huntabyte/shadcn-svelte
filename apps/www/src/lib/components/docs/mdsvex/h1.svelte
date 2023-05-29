<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h1
	class={cn("mt-2 scroll-m-20 text-4xl font-bold", className)}
	{...$$restProps}
>
	<slot />
</h1>
