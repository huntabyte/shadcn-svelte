<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Writable } from "svelte/store";
	import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";

	type $$Props = HTMLButtonAttributes & {
		checked: Writable<boolean>;
	};
	export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} {...$$restProps} />
