<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Basic" class="items-center justify-center">
	<Button onclick={() => toast("Event has been created")} variant="outline" class="w-fit">
		Show Toast
	</Button>
</Example>
