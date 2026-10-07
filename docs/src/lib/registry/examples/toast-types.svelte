<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { toast } from "$lib/registry/ui/toast/index.js";
</script>

<div class="flex flex-wrap gap-2">
	<Button variant="outline" onclick={() => toast.add({ description: "Event has been created." })}
		>Default</Button
	>
	<Button
		variant="outline"
		onclick={() => toast.add({ type: "success", description: "Event has been created." })}
		>Success</Button
	>
	<Button
		variant="outline"
		onclick={() => toast.add({ type: "info", description: "Arrive 10 minutes before the event." })}
		>Info</Button
	>
	<Button
		variant="outline"
		onclick={() =>
			toast.add({ type: "warning", description: "The event cannot start before 8:00 AM." })}
		>Warning</Button
	>
	<Button
		variant="outline"
		onclick={() =>
			toast.add({
				type: "error",
				description: "The event could not be created.",
				priority: "high",
			})}>Error</Button
	>
</div>
