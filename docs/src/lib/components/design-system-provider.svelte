<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useCreateSearchParams } from "../../routes/(app)/(layout)/(create)/lib/search-params.js";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

    const params = useCreateSearchParams();
</script>

<div style="display: contents; --radius: {params.radius};" class={cn(`style-${params.style}`)}>
    {@render children?.()}
</div>
