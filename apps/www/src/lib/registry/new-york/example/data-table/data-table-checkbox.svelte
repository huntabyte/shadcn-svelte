<script lang="ts">
	import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";
	import type { Writable } from "svelte/store";

	export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} />
