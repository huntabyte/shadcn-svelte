<script lang="ts">
	import { labels } from "../(data)/data.js";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";

	let { value, labelValue }: { value?: string; labelValue?: string } = $props();

	const label = $derived(labels.find((label) => label.value === labelValue));
</script>

<div class="flex space-x-2">
	{#if label}
		<Badge variant="outline">{label.label}</Badge>
	{/if}
	<span class="max-w-[500px] truncate font-medium">
		{value}
	</span>
</div>
