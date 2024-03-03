<script lang="ts">
	import { Label } from "@/registry/default/ui/label/index.js";
	import { Textarea } from "@/registry/default/ui/textarea/index.js";
</script>

<div class="grid w-full gap-1.5">
	<Label for="message">Your message</Label>
	<Textarea placeholder="Type your message here." id="message" />
</div>
