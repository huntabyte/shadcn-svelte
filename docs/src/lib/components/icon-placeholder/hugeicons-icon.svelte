<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import type { HugeIconsIconName } from "$lib/registry/icons/__hugeicons__/index.js";
	import { hugeiconsIconLoader } from "./icon-loader.js";

	type Props = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
		icon: HugeIconsIconName;
		placeholder: Snippet;
		"data-slot"?: string;
	};

	let { icon, placeholder, className, ...restProps }: Props = $props();

	// eslint-disable-next-line svelte/no-unused-svelte-ignore
	// svelte-ignore state_referenced_locally
	const IconPromise = hugeiconsIconLoader(icon);
</script>

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
