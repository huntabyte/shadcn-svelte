<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import type { HugeIconsIconName } from "$lib/registry/icons/__hugeicons__.js";

	type Props = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
		icon: HugeIconsIconName;
		placeholder: Snippet;
		"data-slot"?: string;
	};

	let { icon, placeholder, className, ...restProps }: Props = $props();

	const IconPromise = $derived(
		import("$lib/registry/icons/__hugeicons__.js").then((mod) => mod[icon])
	);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	<HugeiconsIcon
		icon={Icon}
		strokeWidth={2}
		data-slot="hugeicons-icon"
		{className}
		{...restProps}
	/>
{/await}
