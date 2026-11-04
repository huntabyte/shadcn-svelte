<script lang="ts">
	import * as Item from "$lib/registry/ui/item/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	// A label and a description on the left, a control on the right, built from Item. The control gets the ids of the
	// title and the description, so a switch or a field has an accessible name and description.
	let {
		ref = $bindable(null),
		class: className,
		title,
		description,
		children,
		...restProps
	}: Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children"> & {
		title: string;
		description?: string;
		/** The control. It receives { labelId, descriptionId } for aria-labelledby and aria-describedby. */
		children?: Snippet<[{ labelId: string; descriptionId: string | undefined }]>;
	} = $props();

	const id = $props.id();
	const labelId = $derived(`${id}-label`);
	const descriptionId = $derived(description ? `${id}-description` : undefined);
</script>

<Item.Root bind:ref data-slot="settings-row" size="sm" class={cn("px-0", className)} {...restProps}>
	<Item.Content>
		<Item.Title id={labelId}>{title}</Item.Title>
		{#if description}
			<Item.Description id={descriptionId}>{description}</Item.Description>
		{/if}
	</Item.Content>
	<Item.Actions>
		{@render children?.({ labelId, descriptionId })}
	</Item.Actions>
</Item.Root>
