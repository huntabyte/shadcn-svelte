<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "@/registry/new-york/ui/button/index.js";
</script>

<Button
	variant="outline"
	on:click={() =>
		toast("Event has been created", {
			description: "Sunday, December 03, 2023 at 9:00 AM",
			action: {
				label: "Undo",
				onClick: () => console.log("Undo"),
			},
		})}
>
	Show Toast
</Button>
