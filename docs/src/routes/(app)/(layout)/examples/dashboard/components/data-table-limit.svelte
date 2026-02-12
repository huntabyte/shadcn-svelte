<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { toast } from "svelte-sonner";
	import type { Row } from "@tanstack/table-core";
	import type { Schema } from "./schemas.js";

	let { row }: { row: Row<Schema> } = $props();
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
		class="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-end shadow-none focus-visible:border dark:bg-transparent"
		value={row.original.limit}
		id="{row.original.id}-limit"
	/>
</form>
