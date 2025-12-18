<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import { HugeiconsIcon } from "@hugeicons/svelte";

	type Props = ComponentProps<typeof HugeiconsIcon> & {
		icon: string;
		placeholder: Snippet;
        'data-slot'?: string;
	};

	let { icon, placeholder, className, ...restProps }: Props = $props();

	const IconPromise = $derived(
		import('$lib/registry/icons/__hugeicons__.js').then((mod) => mod[icon])
	);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	<HugeiconsIcon icon={Icon} strokeWidth={2} data-slot="hugeicons-icon" {className} {...restProps} />
{/await}
