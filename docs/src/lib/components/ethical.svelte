<script lang="ts">
	import { onMount } from "svelte";
	import { beforeNavigate } from "$app/navigation";
	import { dev, browser } from "$app/environment";

	const src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
	const localId = $props.id();
	const ethicalId = `${localId}-ethical`;

	let container: HTMLElement | null = null;

	onMount(() => {
		if (!dev) {
			refreshEthicalAds();

			return () => {
				const scriptNode = container?.querySelector(`[data-id="${localId}"]`);
				const ethicalNode = container?.querySelector(`#${ethicalId}`);
				scriptNode?.remove();
				ethicalNode?.remove();
			};
		}
	});

	beforeNavigate((navigation) => {
		const isDocIndex = navigation.from?.route.id === "/(app)/docs";
		if (isDocIndex) return;
		const goingToDocIndex = navigation.to?.route.id === "/(app)/docs";
		if (goingToDocIndex) return;
		refreshEthicalAds();
	});

	function createEthicalScript() {
		const script = document.createElement("script");
		script.async = true;
		script.id = "_ethicalads_js";
		script.src = src;
		script.dataset.id = "_ethicalads_js";
		return script;
	}

	function createEthicalDiv() {
		const div = document.createElement("div");
		div.id = ethicalId;
		div.setAttribute("data-ea-publisher", "shadcn-sveltecom");
		div.setAttribute("data-ea-type", "image");
		const container = document.getElementById(localId);
		if (container) {
			container.appendChild(div);
		}
	}

	function refreshEthicalAds() {
		if (!dev) {
			if (!browser) return;

			const scriptNode = container?.querySelector("[data-id='_ethicalads_js']");
			const ethicalNode = container?.querySelector(`#${ethicalId}`);

			ethicalNode?.remove();
			scriptNode?.remove();

			const script = createEthicalScript();
			container = document.getElementById(localId);
			if (container) {
				container.appendChild(script);
				createEthicalDiv();
			}
		}
	}
</script>

{#if !dev}
	<div id={localId} class="pt-4"></div>
{/if}
