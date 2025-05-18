<script lang="ts">
	import * as DocTabs from "$lib/components/docs/doc-tabs/index.js";
	import type { Snippet } from "svelte";

	let { cli, manual }: { cli?: Snippet; manual?: Snippet } = $props();
</script>

<DocTabs.Root value="cli" class="relative mr-auto mt-2 w-full">
	<DocTabs.List class="w-full justify-start rounded-none border-b bg-transparent p-0">
		<DocTabs.Trigger
			value="cli"
			class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
			>CLI</DocTabs.Trigger
		>
		<DocTabs.Trigger
			value="manual"
			class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
			>Manual</DocTabs.Trigger
		>
	</DocTabs.List>
	<DocTabs.Content value="cli">
		{@render cli?.()}
	</DocTabs.Content>
	<DocTabs.Content value="manual" data-manual-install="">
		{@render manual?.()}
	</DocTabs.Content>
</DocTabs.Root>
