<script lang="ts">
	import { Checkbox } from "@/registry/new-york/ui/checkbox/index.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Writable } from "svelte/store";

	type $$Props = HTMLButtonAttributes & {
		checked: Writable<boolean>;
	};
	export let checked: Writable<boolean>;
</script>

<Checkbox bind:checked={$checked} {...$$restProps} />
