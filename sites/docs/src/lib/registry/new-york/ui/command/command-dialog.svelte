<script lang="ts">
	import type { Dialog as DialogPrimitive, WithoutChild } from "bits-ui";
	import type { Command as CommandPrimitive } from "cmdk-sv";
	import Command from "./command.svelte";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";

	let {
		open = $bindable(false),
		value = $bindable(""),
		children,
		...restProps
	}: WithoutChild<DialogPrimitive.RootProps> & CommandPrimitive.CommandProps = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	<Dialog.Content class="overflow-hidden p-0">
		<Command
			class="[&_[data-cmdk-group-heading]]:text-muted-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:h-5 [&_[data-cmdk-item]_svg]:w-5"
			{...restProps}
			bind:value
		>
			{@render children?.()}
		</Command>
	</Dialog.Content>
</Dialog.Root>
