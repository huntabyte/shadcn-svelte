<script lang="ts">
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import type { HugeIconsIconName } from "$lib/registry/icons/__hugeicons__/index.js";
	import { hugeiconsIconLoader } from "./icon-loader.js";
	import type { ComponentProps, Snippet } from "svelte";

	type Props = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
		icon: HugeIconsIconName;
		placeholder: Snippet;
		"data-slot"?: string;
	};

	let { icon, placeholder, className, ...restProps }: Props = $props();

	// Icons that are already loaded render synchronously; otherwise fall back to the async
	// placeholder. This avoids a double render for every icon after the first load.
	// svelte-ignore state_referenced_locally
	const CachedIcon = hugeiconsIconLoader.peek(icon);
	// svelte-ignore state_referenced_locally
	const IconPromise = CachedIcon === undefined ? hugeiconsIconLoader(icon) : null;
</script>

{#if CachedIcon}
	<HugeiconsIcon
		icon={CachedIcon}
		strokeWidth={2}
		data-slot="hugeicons-icon"
		{className}
		{...restProps}
	/>
{:else if IconPromise}
	{#await IconPromise}
		{@render placeholder?.()}
	{:then Icon}
		{#if Icon !== null}
			<HugeiconsIcon
				icon={Icon}
				strokeWidth={2}
				data-slot="hugeicons-icon"
				{className}
				{...restProps}
			/>
		{:else}
			{@render placeholder?.()}
		{/if}
	{/await}
{:else}
	{@render placeholder?.()}
{/if}
