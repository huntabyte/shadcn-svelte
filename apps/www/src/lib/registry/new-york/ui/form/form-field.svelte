<script lang="ts">
	import { cn } from "@/utils";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	const id = Math.random().toString(36).slice(2);
	export let errors: string[] | undefined = undefined;
	export let name: string;
	const errorStore = writable<string[] | undefined>(errors);
	let className: string | undefined | null = undefined;
	export { className as class };
	setContext("FormField", {
		formItemId: id,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		errors: errorStore,
		name
	});

	$: errorStore.set(errors);

	$: field = {
		"aria-invalid": errors ? true : undefined,
		name,
		id
	};
</script>

<div class={cn("space-y-2", className)}>
	<slot {field} />
</div>
