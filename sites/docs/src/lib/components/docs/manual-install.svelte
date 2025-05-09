<script lang="ts">
	import type { Snippet } from "svelte";
	import * as Accordion from "$lib/registry/new-york/ui/accordion/index.js";
	let { children }: { children?: Snippet } = $props();
</script>

<Accordion.Root type="single">
	<Accordion.Item value="manual-installation">
		<Accordion.Trigger>Manual Installation</Accordion.Trigger>
		<Accordion.Content>
			{@render children?.()}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
