<script lang="ts">
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import CustomizerCode from "$lib/components/docs/theme-customizer/customizer-code.svelte";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<Drawer.Root>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button
				class={cn("h-8 rounded-lg shadow-none sm:hidden", className)}
				{...props}
				{...restProps}
			>
				Copy
			</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Theme</Drawer.Title>
			<Drawer.Description>
				Copy and paste the following code into your CSS file.
			</Drawer.Description>
		</Drawer.Header>
		<ThemeWrapper defaultTheme="zinc" class="relative px-6">
			<CustomizerCode />
		</ThemeWrapper>
	</Drawer.Content>
</Drawer.Root>
<Dialog.Root>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button
				class={cn("hidden h-8 rounded-lg shadow-none sm:flex", className)}
				{...props}
				{...restProps}
			>
				Copy code
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="w-auto overflow-hidden outline-none">
		<Dialog.Header>
			<Dialog.Title>Theme</Dialog.Title>
			<Dialog.Description>
				Copy and paste the following code into your CSS file.
			</Dialog.Description>
		</Dialog.Header>
		<ThemeWrapper defaultTheme="zinc" class="relative">
			<CustomizerCode />
		</ThemeWrapper>
	</Dialog.Content>
</Dialog.Root>
