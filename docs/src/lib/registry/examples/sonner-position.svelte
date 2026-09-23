<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/registry/ui/button/index.js";

	const positions = [
		{ label: "Top Left", value: "top-left" },
		{ label: "Top Center", value: "top-center" },
		{ label: "Top Right", value: "top-right" },
		{ label: "Bottom Left", value: "bottom-left" },
		{ label: "Bottom Center", value: "bottom-center" },
		{ label: "Bottom Right", value: "bottom-right" },
	] as const;
</script>

<div class="flex flex-wrap justify-center gap-2">
	{#each positions as position (position.value)}
		<Button
			variant="outline"
			onclick={() => toast("Event has been created", { position: position.value })}
		>
			{position.label}
		</Button>
	{/each}
</div>
