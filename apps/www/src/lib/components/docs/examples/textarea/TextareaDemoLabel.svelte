<script lang="ts">
	import { Label } from "@/registry/default/ui/label";
	import { Textarea } from "@/registry/default/ui/textarea";
</script>

<div class="grid w-full gap-1.5">
	<Label for="message">Your message</Label>
	<Textarea placeholder="Type your message here." id="message" />
</div>
