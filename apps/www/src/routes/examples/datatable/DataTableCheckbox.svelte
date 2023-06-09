<script lang="ts">
	import { Checkbox } from "$components/ui/checkbox";
	import type { Writable } from "svelte/store";

	export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} />
