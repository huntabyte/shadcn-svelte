<script lang="ts">
	import { Badge } from "@/registry/default/ui/badge";
	import { labels } from "../(data)/data";

	export let value: string;
	const label = labels.find((label) => label.value === value);
</script>

<div class="flex space-x-2">
	{#if label}
		<Badge variant="outline">{label.label}</Badge>
	{/if}
	<span class="max-w-[500px] truncate font-medium">
		{value}
	</span>
</div>
