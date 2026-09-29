<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CommandPrimitive.ItemProps = $props();
</script>

<!-- parity-ignore-upstream: data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 | cmdk sets data-disabled="true"; Bits sets an empty data-disabled attribute, matched by data-disabled: instead -->

<CommandPrimitive.Item
	bind:ref
	data-slot="command-item"
	class={cn(
		"cn-command-item group/command-item [&_svg]:pointer-events-none [&_svg]:shrink-0",
		// parity-ignore: Bits marks disabled items with an empty data-disabled attribute, not data-disabled="true" like cmdk
		"data-disabled:pointer-events-none data-disabled:opacity-50",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<IconPlaceholder
		lucide="CheckIcon"
		tabler="IconCheck"
		hugeicons="Tick02Icon"
		phosphor="CheckIcon"
		remixicon="RiCheckLine"
		class="cn-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100"
	/>
</CommandPrimitive.Item>
