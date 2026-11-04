<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	// A labelled region, not a fieldset: a settings section is not always a form group, and a legend only names a
	// fieldset when it is the fieldset's first child.
	let {
		ref = $bindable(null),
		class: className,
		title,
		description,
		actions,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		title: string;
		description?: string;
		/** Controls placed at the end of the header, for example an Add button. */
		actions?: Snippet;
	} = $props();

	const id = $props.id();
</script>

<section
	bind:this={ref}
	data-slot="settings-section"
	aria-labelledby="{id}-title"
	class={cn("flex flex-col gap-3", className)}
	{...restProps}
>
	<div class="flex items-start justify-between gap-4">
		<div class="flex min-w-0 flex-col gap-1">
			<h2
				id="{id}-title"
				data-slot="field-legend"
				data-variant="label"
				class="cn-field-legend mb-0"
			>
				{title}
			</h2>
			{#if description}
				<Field.Description>{description}</Field.Description>
			{/if}
		</div>
		{#if actions}
			<div class="shrink-0">{@render actions()}</div>
		{/if}
	</div>
	{@render children?.()}
</section>
