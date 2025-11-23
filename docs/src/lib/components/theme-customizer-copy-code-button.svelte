<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { theme as activeTheme } from "mode-watcher";
	import ThemeCustomizerCode from "./theme-customizer-codeOLD.svelte";
	import IconCopy from "@lucide/svelte/icons/copy";

	let { class: className, variant, size }: ComponentProps<typeof Button> = $props();
</script>

<Drawer.Root>
	<Drawer.Trigger class={cn("sm:hidden!", className)}>
		{#snippet child({ props })}
			<Button {variant} {size} {...props}>Copy Code</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content class="h-auto">
		<Drawer.Header>
			<Drawer.Title class="capitalize">
				{activeTheme.current === "neutral" ? "Default" : activeTheme.current}
			</Drawer.Title>
			<Drawer.Description>
				Copy and paste the following code into your CSS file.
			</Drawer.Description>
		</Drawer.Header>
		<ThemeCustomizerCode />
	</Drawer.Content>
</Drawer.Root>
<Dialog.Root>
	<Dialog.Trigger class={cn("sm:flex! hidden", className)}>
		{#snippet child({ props })}
			<Button {variant} {size} {...props}
				><IconCopy />
				<span class="group-data-[size=icon-sm]/button:sr-only">Copy Code</span></Button
			>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="outline-none md:max-w-3xl">
		<Dialog.Header>
			<Dialog.Title class="capitalize">
				{activeTheme.current === "neutral" ? "Default" : activeTheme.current}
			</Dialog.Title>
			<Dialog.Description>
				Copy and paste the following code into your CSS file.
			</Dialog.Description>
		</Dialog.Header>
		<ThemeCustomizerCode />
	</Dialog.Content>
</Dialog.Root>
