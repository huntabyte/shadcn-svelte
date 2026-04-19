<script lang="ts">
	import { onMount } from "svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { encodePreset, DEFAULT_PRESETS } from "shadcn-svelte/preset";

	let { children } = $props();

	const designSystem = useDesignSystem();
	const SERA_PRESET = encodePreset(DEFAULT_PRESETS.sera);

	function applyPreset(code: string) {
		const raw = JSON.stringify(code);
		localStorage.setItem("design-system-preset", raw);
		window.dispatchEvent(new StorageEvent("storage", { key: "design-system-preset", newValue: raw }));
	}

	onMount(() => {
		const savedPreset = designSystem.preset;
		applyPreset(SERA_PRESET);

		return () => {
			applyPreset(savedPreset);
		};
	});
</script>

{@render children()}
