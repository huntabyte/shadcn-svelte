<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	// The record page frame, after Twenty: a header, a fields rail on the left (20rem) and the main area (tabs, timeline,
	// related records) beside it. Below the md breakpoint the fields stack above the main area. Pass a height to the
	// element (it fills its parent); the rail and the main area scroll on their own.
	let {
		ref = $bindable(null),
		class: className,
		header,
		fields,
		fieldsLabel = "Fields",
		children,
		...restProps
	}: Omit<WithElementRef<HTMLAttributes<HTMLDivElement>>, "children"> & {
		/** The title row: an avatar, the name, badges and actions. */
		header?: Snippet;
		/** The fields rail, usually a RecordFields. */
		fields?: Snippet;
		/** The accessible name of the fields rail. Default "Fields". */
		fieldsLabel?: string;
		/** The main area. */
		children?: Snippet;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="record-layout"
	class={cn("flex h-full min-h-0 flex-col", className)}
	{...restProps}
>
	{#if header}
		<header
			data-slot="record-layout-header"
			class="flex flex-wrap items-center gap-3 border-b px-4 py-3"
		>
			{@render header()}
		</header>
	{/if}
	<div
		class="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[20rem_minmax(0,1fr)] md:grid-rows-1"
	>
		{#if fields}
			<aside
				data-slot="record-layout-fields"
				aria-label={fieldsLabel}
				class="max-h-[45svh] min-h-0 overflow-y-auto border-b p-4 md:max-h-none md:border-r md:border-b-0"
			>
				{@render fields()}
			</aside>
		{/if}
		<div data-slot="record-layout-main" class="min-h-0 min-w-0 overflow-y-auto">
			{@render children?.()}
		</div>
	</div>
</div>
