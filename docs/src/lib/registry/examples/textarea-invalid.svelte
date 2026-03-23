<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<div class="grid w-full gap-1.5">
	<Label for="message-invalid">Message</Label>
	<Textarea
		id="message-invalid"
		placeholder="Type your message here."
		aria-invalid="true"
	/>
	<p class="text-destructive text-sm">Please enter a valid message.</p>
</div>
