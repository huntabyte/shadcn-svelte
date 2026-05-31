<script lang="ts">
	import SiteFooter from "$lib/components/site-footer.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";
	import { UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { page } from "$app/state";

	let { children, data } = $props();

	// svelte-ignore state_referenced_locally
	UserConfigContext.set(new UserConfig(data.userConfig));

	const useAppShell = $derived(
		!page.route.id?.startsWith("/(app)/(create)") &&
			!page.route.id?.startsWith("/(app)/preview")
	);
</script>

<ModeWatcher defaultMode="system" disableTransitions />
<Toaster position="top-center" />

<Tooltip.Provider>
	<DesignSystemProvider>
		{#if useAppShell}
			<div class="bg-background relative z-10 flex min-h-svh flex-col">
				<SiteHeader />
				<main class="flex flex-1 flex-col">
					<Tooltip.Provider>
						{@render children()}
					</Tooltip.Provider>
				</main>
				<SiteFooter />
			</div>
		{:else}
			{@render children()}
		{/if}
	</DesignSystemProvider>
</Tooltip.Provider>
