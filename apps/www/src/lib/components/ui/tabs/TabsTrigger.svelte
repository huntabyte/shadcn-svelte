<script lang="ts" context="module">
	type EnforceObject<T> = T extends object ? T : never;

	export type TriggerProps = EnforceObject<TabsTriggerProps> & {
		class?: string;
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import { melt, type TabsTriggerProps } from "@melt-ui/svelte";
	import { ctx } from ".";

	type $$Props = TriggerProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let value: $$Props["value"];
	export let disabled: $$Props["disabled"] = undefined;

	const {
		elements: { trigger }
	} = ctx.get();
</script>

<button
	class={cn(
		"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
		className
	)}
	use:melt={$trigger({ value, disabled })}
	{...$$restProps}
>
	<slot />
</button>
