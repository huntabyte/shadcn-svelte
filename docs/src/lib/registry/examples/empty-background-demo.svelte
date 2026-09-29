<script lang="ts">
	import RefreshCcwIcon from "@lucide/svelte/icons/refresh-ccw";
	import BellIcon from "@tabler/icons-svelte/icons/bell";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Empty.Root class="h-full bg-muted/30">
	<Empty.Header>
		<Empty.Media variant="icon">
			<BellIcon />
		</Empty.Media>
		<Empty.Title>No Notifications</Empty.Title>
		<Empty.Description class="max-w-xs text-pretty">
			You're all caught up. New notifications will appear here.
		</Empty.Description>
	</Empty.Header>
	<Empty.Content>
		<Button variant="outline">
			<RefreshCcwIcon data-icon="inline-start" />
			Refresh
		</Button>
	</Empty.Content>
</Empty.Root>
