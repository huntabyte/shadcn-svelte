<script lang="ts" context="module">
	export type ListProps = {
		class?: string;
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import { melt } from "@melt-ui/svelte";
	import { ctx } from ".";

	type $$Props = ListProps;

	let className: string | undefined | null = undefined;
	export { className as class };

	const {
		elements: { list }
	} = ctx.get();
</script>

<div
	use:melt={$list}
	class={cn(
		"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
