<script lang="ts">
	import { onMount } from "svelte";
	import { navigating } from "$app/stores";

	export let carbonSrc: string =
		"//cdn.carbonads.com/carbon.js?serve=CW7DK27L&placement=shadcn-sveltecom&format=cover";

	let mounted = false;

	onMount(() => {
		refreshCarbonAds();

		return () => {};
	});

	$: if ($navigating && mounted) {
		refreshCarbonAds();
	}

	function refreshCarbonAds() {
		const carbonAdsNode = document.getElementById("carbonads");
		const scriptNode = document.getElementById("_carbonads_js");

		carbonAdsNode?.remove();
		scriptNode?.remove();

		const script = document.createElement("script");
		script.async = true;
		script.id = "_carbonads_js";
		script.src = carbonSrc;

		const container = document.getElementById("carbon-container");
		if (container) {
			container.appendChild(script);
		}
	}
</script>

<div id="carbon-container" class="pt-4"></div>
