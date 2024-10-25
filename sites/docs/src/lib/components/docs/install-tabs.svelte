<script lang="ts">
	import * as Tabs from "$lib/components/docs/tabs/index.js";
	import type { Snippet } from "svelte";

	let { cli, manual }: { cli?: Snippet; manual?: Snippet } = $props();
</script>

<Tabs.Root value="cli">
	<Tabs.List>
		<Tabs.Trigger value="cli">CLI</Tabs.Trigger>
		<Tabs.Trigger value="manual">Manual</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="cli">
		{@render cli?.()}
	</Tabs.Content>
	<Tabs.Content value="manual">
		{@render manual?.()}
	</Tabs.Content>
</Tabs.Root>
