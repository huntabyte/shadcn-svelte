<script lang="ts">
	import { onMount } from "svelte";
	import { isBrowser } from "$lib/utils.js";
	import { beforeNavigate } from "$app/navigation";
	import { dev } from "$app/environment";

	const src =
		"//cdn.carbonads.com/carbon.js?serve=CW7DK27L&placement=shadcn-sveltecom&format=cover";
	const localId = crypto.randomUUID();

	let container: HTMLElement | null = null;

	onMount(() => {
		if (!dev) {
			refreshCarbonAds();

			return () => {
				const scriptNode = container?.querySelector(`[data-id="${localId}"]`);
				const carbonNode = container?.querySelector(`#carbonads`);
				scriptNode?.remove();
				carbonNode?.remove();
			};
		}
	});

	beforeNavigate((navigation) => {
		const isDocIndex = navigation.from?.route.id === "/(app)/docs";
		if (isDocIndex) return;
		const goingToDocIndex = navigation.to?.route.id === "/(app)/docs";
		if (goingToDocIndex) return;
		refreshCarbonAds();
	});

	function createCarbonScript() {
		const script = document.createElement("script");
		script.async = true;
		script.id = "_carbonads_js";
		script.src = src;
		script.type = "text/javascript";
		script.dataset.id = localId;
		return script;
	}

	function refreshCarbonAds() {
		if (!dev) {
			if (!isBrowser) return;

			const scriptNode = container?.querySelector("[data-id='_carbonads_js']");
			const carbonAdsNode = container?.querySelector("#carbonads");

			carbonAdsNode?.remove();
			scriptNode?.remove();

			const script = createCarbonScript();
			container = document.getElementById(localId);
			if (container) {
				container.appendChild(script);
			}
		}
	}
</script>

{#if !dev}
	<div id={localId} class="pt-4"></div>
{/if}
