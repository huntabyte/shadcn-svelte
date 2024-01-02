<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "@/registry/default/ui/button";
</script>

<Button
	variant="outline"
	on:click={() =>
		toast.success("Event has been created", {
			description: "Sunday, December 03, 2023 at 9:00 AM",
			action: {
				label: "Undo",
				onClick: () => console.log("Undo")
			}
		})}
>
	Show Toast
</Button>
