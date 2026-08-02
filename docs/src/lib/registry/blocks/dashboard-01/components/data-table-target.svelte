<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import type { Schema } from "./schemas.js";
	import type { Row } from "@tanstack/table-core";

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
	<Label for="{row.original.id}-target" class="sr-only">Target</Label>
	<Input
		class="h-8 w-16 border-transparent bg-transparent text-end shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
		value={row.original.target}
		id="{row.original.id}-target"
	/>
</form>
