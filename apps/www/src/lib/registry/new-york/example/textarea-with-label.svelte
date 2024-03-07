<script lang="ts">
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
</script>

<div class="grid w-full gap-1.5">
	<Label for="message">Your message</Label>
	<Textarea placeholder="Type your message here." id="message" />
</div>
