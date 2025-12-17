<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useCreateSearchParams } from "../../routes/(app)/(layout)/(create)/lib/search-params.js";
	import { RADII } from "$lib/registry/config.js";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

    const params = useCreateSearchParams();

	const radius = $derived(RADII.find((radius) => radius.name === params.radius)?.value ?? RADII[0].value);
</script>

<div style="display: contents; --radius: {radius};" class={cn(`style-${params.style}`)}>
    {@render children?.()}
</div>
