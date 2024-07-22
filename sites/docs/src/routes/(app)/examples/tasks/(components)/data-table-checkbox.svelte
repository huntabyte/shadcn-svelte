<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { WithoutChildren } from "bits-ui";
	import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";

	let {
		checked,
		...restProps
	}: {
		checked: Writable<boolean>;
	} & WithoutChildren<HTMLButtonAttributes & { checked: Writable<boolean> }> = $props();
</script>

<Checkbox bind:checked={$checked} {...restProps as any} />
