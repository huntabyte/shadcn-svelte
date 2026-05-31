<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { dev, browser } from "$app/environment";

	beforeNavigate((navigation) => {
		const isDocIndex = navigation.from?.route.id === "/(app)/docs";
		if (isDocIndex) return;
		const goingToDocIndex = navigation.to?.route.id === "/(app)/docs";
		if (goingToDocIndex) return;
		refreshEthicalAds();
	});

	function refreshEthicalAds() {
		if (dev) return;
		if (!browser || typeof window === "undefined") return;
		if ("ethicalads" in window) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window.ethicalads as any)?.reload();
		}
	}
</script>

{#if !dev}
	<div class="pt-4">
		<div data-ea-publisher="shadcn-sveltecom" data-ea-type="image"></div>
	</div>
{/if}
