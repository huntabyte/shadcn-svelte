<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<div class="flex flex-wrap gap-2">
	<Button variant="outline" onclick={() => toast("Top Left", { position: "top-left" })}>
		Top Left
	</Button>
	<Button variant="outline" onclick={() => toast("Top Center", { position: "top-center" })}>
		Top Center
	</Button>
	<Button variant="outline" onclick={() => toast("Top Right", { position: "top-right" })}>
		Top Right
	</Button>
	<Button variant="outline" onclick={() => toast("Bottom Left", { position: "bottom-left" })}>
		Bottom Left
	</Button>
	<Button
		variant="outline"
		onclick={() => toast("Bottom Center", { position: "bottom-center" })}
	>
		Bottom Center
	</Button>
	<Button variant="outline" onclick={() => toast("Bottom Right", { position: "bottom-right" })}>
		Bottom Right
	</Button>
</div>
