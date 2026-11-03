<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Button
	onclick={() =>
		toast("Event has been created", {
			description: "Monday, January 3rd at 6:00pm",
		})}
	variant="outline"
	class="w-fit"
>
	Show Toast
</Button>
