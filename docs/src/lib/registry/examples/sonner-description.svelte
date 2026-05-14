<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Button
	variant="outline"
	onclick={() =>
		toast("Event has been created", {
			description: "Monday, January 3rd at 6:00pm",
		})}
>
	Show Toast
</Button>
