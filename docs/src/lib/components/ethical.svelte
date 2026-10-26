<script lang="ts">
	import { dev, browser } from "$app/env";
	import { beforeNavigate } from "$app/navigation";

	beforeNavigate((navigation) => {
		if (navigation.shallow && navigation.type === "goto") return;

		const isDocIndex = navigation.from?.route.id === "/(app)/(layout)/docs/[...slug]";
		if (isDocIndex) return;
		const goingToDocIndex = navigation.to?.route.id === "/(app)/(layout)/docs/[...slug]";
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
