<script lang="ts">
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import type { Writable } from "svelte/store";

	export let checked: Writable<boolean>;
	let localChecked = false;
	function updateChecked(localChecked: boolean) {
		checked.set(localChecked);
	}

	$: updateChecked(localChecked);

	$: console.log($checked);
	$: console.log(localChecked);
</script>

<Checkbox bind:checked={localChecked} />
