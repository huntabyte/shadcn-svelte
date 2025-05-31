<script lang="ts">
	import { InstallationTypeContext, type InstallationType } from "$lib/installation-type.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { children }: ComponentProps<typeof Tabs.Root> = $props();

	const installationType = InstallationTypeContext.getOr({ current: "cli" });
</script>

<Tabs.Root
	value={installationType.current}
	onValueChange={(v) => (installationType.current = v as InstallationType)}
	class="relative mt-6 w-full"
>
	{@render children?.()}
</Tabs.Root>
