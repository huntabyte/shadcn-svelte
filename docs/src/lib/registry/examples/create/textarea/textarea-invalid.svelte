<script lang="ts">
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="Invalid">
	<Textarea placeholder="Type your message here." aria-invalid="true" />
</Example>
