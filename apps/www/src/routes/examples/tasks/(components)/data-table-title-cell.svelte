<script lang="ts">
	import { Badge } from "@/registry/new-york/ui/badge";
	import { labels } from "../(data)/data";

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
