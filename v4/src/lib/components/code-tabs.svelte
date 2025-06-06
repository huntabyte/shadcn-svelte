<script lang="ts">
	import { type InstallationType } from "$lib/user-config.svelte.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import type { ComponentProps } from "svelte";

	let { children }: ComponentProps<typeof Tabs.Root> = $props();

	const userConfig = UserConfigContext.get();
</script>

<Tabs.Root
	value={userConfig.current.installationType}
	onValueChange={(v) => userConfig.setConfig({ installationType: v as InstallationType })}
	class="relative mt-6 w-full"
>
	{@render children?.()}
</Tabs.Root>
