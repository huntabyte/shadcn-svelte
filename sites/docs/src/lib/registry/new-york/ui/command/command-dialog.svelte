<script lang="ts">
	import {
		Command as CommandPrimitive,
		Dialog as DialogPrimitive,
		type WithoutChildrenOrChild,
	} from "bits-ui";
	import type { Snippet } from "svelte";
	import Command from "./command.svelte";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";

	let {
		open = $bindable(false),
		ref = $bindable(null),
		value = $bindable(""),
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.RootProps> &
		WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
			portalProps?: DialogPrimitive.PortalProps;
			children: Snippet;
		} = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	<Dialog.Content class="overflow-hidden p-0" {portalProps}>
		<Command
			class="[&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:h-5 [&_[data-cmdk-item]_svg]:w-5"
			{...restProps}
			bind:value
			bind:ref
			{children}
		/>
	</Dialog.Content>
</Dialog.Root>
