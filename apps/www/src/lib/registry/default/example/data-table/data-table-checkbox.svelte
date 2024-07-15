<script lang="ts">
	import type { Writable } from "svelte/store";
	import { Checkbox } from "$lib/registry/default/ui/checkbox/index.js";

	let { checked }: { checked: Writable<boolean> } = $props();
</script>

<Checkbox bind:checked={$checked} />
