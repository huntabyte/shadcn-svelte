<script lang="ts">
	import Metadata from "$lib/components/metadata.svelte";
	import { cn } from "$lib/utils.js";
	import type { PageProps } from "./$types.js";

	let { data }: PageProps = $props();
</script>

<Metadata
	title={data.meta.name}
	description={data.meta.description}
	ogImage={{
		url: `/og?title=${encodeURIComponent(data.meta.name)}&description=${encodeURIComponent(data.meta.description)}`,
	}}
	ogType="article"
/>

<div class={cn("bg-background", data.meta?.className)}>
	<data.component />
</div>
