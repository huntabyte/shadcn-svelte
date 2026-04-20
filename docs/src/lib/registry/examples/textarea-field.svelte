<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<div class="grid w-full gap-1.5">
	<Label for="textarea-message">Message</Label>
	<p class="text-muted-foreground text-sm">Enter your message below.</p>
	<Textarea id="textarea-message" placeholder="Type your message here." />
</div>
