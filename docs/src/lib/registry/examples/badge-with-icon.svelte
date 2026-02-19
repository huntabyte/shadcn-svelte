<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<div class="flex flex-wrap gap-2">
	<Badge>
		<CheckIcon />
		Verified
	</Badge>
	<Badge variant="secondary">
		<CheckIcon />
		Completed
	</Badge>
	<Badge variant="outline">
		<CheckIcon />
		Approved
	</Badge>
</div>
