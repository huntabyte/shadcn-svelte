<script lang="ts">
	import { cn } from "$lib/utils.js";
	import RandomButton from "./random-button.svelte";
	import ResetButton from "./reset-button.svelte";

	type Props = {
		class?: string;
		submenu?: boolean;
	};

	let { class: className, submenu = false }: Props = $props();
</script>

<div class={cn("items-center gap-0", className)}>
	<RandomButton {submenu} />
	<ResetButton {submenu} />
</div>
