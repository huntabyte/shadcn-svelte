<script lang="ts">
	import { labels } from "../(data)/data.js";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";

	export let value: string;
	export let labelValue: string;
	const label = labels.find((label) => label.value === labelValue);
</script>

<div class="flex space-x-2">
	{#if label}
		<Badge variant="outline">{label.label}</Badge>
	{/if}
	<span class="max-w-[500px] truncate font-medium">
		{value}
	</span>
</div>
