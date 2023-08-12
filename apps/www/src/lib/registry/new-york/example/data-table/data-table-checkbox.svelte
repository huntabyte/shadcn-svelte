<script lang="ts">
	import { Checkbox } from "@/registry/new-york/ui/checkbox";
	import type { Writable } from "svelte/store";

	export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} />
