<script lang="ts">
	import { Button } from "#lib/registry/ui/button/index.js";
	import { toast } from "svelte-sonner";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="With Description" class="items-center justify-center">
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
</Example>
