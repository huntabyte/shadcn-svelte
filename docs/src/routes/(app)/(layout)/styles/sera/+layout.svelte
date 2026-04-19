<script lang="ts">
	import { onMount } from "svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { encodePreset, DEFAULT_PRESETS } from "shadcn-svelte/preset";

	let { children } = $props();

	const designSystem = useDesignSystem();
	const SERA_PRESET = encodePreset(DEFAULT_PRESETS.sera);

	onMount(() => {
		const savedPreset = designSystem.preset;
		designSystem.preset = SERA_PRESET;

		return () => {
			designSystem.preset = savedPreset;
		};
	});
</script>

{@render children()}
