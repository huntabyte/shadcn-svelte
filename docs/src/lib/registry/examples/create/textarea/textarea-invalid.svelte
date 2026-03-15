<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Example title="Invalid">
	<Textarea placeholder="Type your message here." aria-invalid="true" />
</Example>
