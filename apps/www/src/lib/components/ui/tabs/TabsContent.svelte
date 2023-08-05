<script lang="ts" context="module">
	export type ContentProps = {
		class?: string;
		value: Parameters<StoreValue<TabsElements["content"]>>[0];
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import { melt, type StoreValue, type TabsElements } from "@melt-ui/svelte";
	import { ctx } from ".";

	type $$Props = ContentProps;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"];

	const {
		elements: { content }
	} = ctx.get();
</script>

<div
	class={cn(
		"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		className
	)}
	use:melt={$content(value)}
	{...$$restProps}
>
	<slot />
</div>
