<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Checkbox } from "$lib/registry/new-york/ui/checkbox/index.js";

	let {
		checked = false,
		controlledChecked = true,
		...restProps
	}: ComponentProps<typeof Checkbox> = $props();
</script>

<Checkbox {checked} {controlledChecked} {...restProps} />
