<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import type { features } from "./data-table.svelte";
	import type { Schema } from "./schemas.js";
	import type { Row } from "@tanstack/svelte-table";

	let { row }: { row: Row<typeof features, Schema> } = $props();
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
			loading: `Saving ${row.original.header}`,
			success: "Done",
			error: "Error",
		});
	}}
>
	<Label for="{row.original.id}-limit" class="sr-only">Limit</Label>
	<Input
		class="h-8 w-16 border-transparent bg-transparent text-end shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
		value={row.original.limit}
		id="{row.original.id}-limit"
	/>
</form>
