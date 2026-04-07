<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<div class="grid w-full gap-1.5">
	<Label for="textarea-disabled">Message</Label>
	<Textarea id="textarea-disabled" placeholder="Type your message here." disabled />
</div>
