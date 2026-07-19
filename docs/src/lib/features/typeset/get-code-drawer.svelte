<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/ui/button/button.svelte";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import DocsPanel from "./docs-panel.svelte";
	import type { TypesetState } from "./typeset.svelte.js";

	let {
		typeset,
		class: className,
	}: {
		typeset: TypesetState;
		class?: string;
	} = $props();

	const isMobile = new IsMobile();
</script>

<Drawer.Root direction={isMobile.current ? "bottom" : "right"}>
	<Drawer.Trigger class={cn(buttonVariants({ variant: "outline" }), className)}>
		Get Code
	</Drawer.Trigger>
	<Drawer.Content class="max-md:max-h-[85svh]">
		<Drawer.Header>
			<Drawer.Title>Get Code</Drawer.Title>
			<Drawer.Description>Install typeset with the values you picked.</Drawer.Description>
		</Drawer.Header>
		<DocsPanel {typeset} compact />
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: "outline" })}>Done</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
