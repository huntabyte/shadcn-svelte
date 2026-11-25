<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { toast } from "$lib/registry/ui/toast/index.js";

	function showToast() {
		void toast
			.promise(
				new Promise<{ name: string }>((resolve) =>
					setTimeout(() => resolve({ name: "Event" }), 2000)
				),
				{
					loading: "Creating event…",
					success: (data) => `${data.name} created.`,
					error: "Could not create event.",
				}
			)
			.catch(() => {});
	}
</script>

<Button variant="outline" onclick={showToast}>Create Event</Button>
