<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { toast } from "$lib/registry/ui/toast/index.js";

	function showToast() {
		const id = toast.add({
			title: "Event created",
			description: "Sunday, December 3 at 9:00 AM",
			actionProps: { children: "Undo", onclick: () => toast.close(id) },
		});
	}
</script>

<Button variant="outline" onclick={showToast}>Show Toast</Button>
