<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.LinkItemProps = $props();
</script>

<!-- parity-ignore-upstream: data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 | cmdk sets data-disabled="true"; Bits sets an empty data-disabled attribute, matched by data-disabled: instead -->

<CommandPrimitive.LinkItem
	bind:ref
	data-slot="command-item"
	class={cn(
		"cn-command-item group/command-item [&_svg]:pointer-events-none [&_svg]:shrink-0",
		// parity-ignore: Bits marks disabled items with an empty data-disabled attribute, not data-disabled="true" like cmdk
		"data-disabled:pointer-events-none data-disabled:opacity-50",
		className
	)}
	{...restProps}
/>
