<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { toast } from "$lib/registry/ui/toast/index.js";
</script>

{#snippet title()}<span>Event <strong>created</strong></span>{/snippet}
{#snippet description()}<span
		>View the event in your <a href="/docs/components/toast" class="underline underline-offset-4"
			>calendar</a
		>.</span
	>{/snippet}
<Button variant="outline" onclick={() => toast.add({ title, description, type: "success" })}
	>Show Rich Content</Button
>
