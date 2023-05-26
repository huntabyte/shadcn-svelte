<script lang="ts">
	import type { SwitchRootProps } from "radix-svelte";
	import { Switch } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let rootChecked: SwitchRootProps["checked"] = undefined;
	export let rootRequired: SwitchRootProps["required"] = undefined;
	export let rootDisabled: SwitchRootProps["disabled"] = undefined;
	export let rootName: SwitchRootProps["name"] = undefined;
	export let rootValue: SwitchRootProps["value"] = undefined;
</script>

<Switch.Root
	class={cn(
		"peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
		className
	)}
	{...$$restProps}
	bind:checked={rootChecked}
	bind:required={rootRequired}
	bind:disabled={rootDisabled}
	bind:name={rootName}
	bind:value={rootValue}
>
	<Switch.Thumb
		class={cn(
			"pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
		)}
	/>
</Switch.Root>
