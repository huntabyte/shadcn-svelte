<script lang="ts">
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	const items = [
		{ id: "recents", label: "Recents" },
		{ id: "home", label: "Home" },
		{ id: "applications", label: "Applications" },
		{ id: "desktop", label: "Desktop" },
		{ id: "downloads", label: "Downloads" },
		{ id: "documents", label: "Documents" },
	] as const;
</script>

<div class="flex flex-col space-y-3">
	<p class="text-sm font-medium leading-none">Sidebar</p>
	{#each items as item (item.id)}
		<div class="flex items-center space-x-2">
			<Checkbox id={item.id} />
			<Label for={item.id}>{item.label}</Label>
		</div>
	{/each}
</div>
