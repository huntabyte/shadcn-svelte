<script lang="ts">
	import { setContext } from "svelte";
	import { writable, type Writable } from "svelte/store";

	const id = Math.random().toString(36).slice(2);
	export let errors: string[] | undefined = undefined;
	export let name: string;
	const errorStore = writable<string[] | undefined>(errors);

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

<div class="space-y-2">
	<slot {field} />
</div>
