<script lang="ts">
	import Customizer from "./customizer.svelte";
	import ThemeCopyCodeButton from "./copy-code-button.svelte";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import { IsMobile } from "$lib/registry/hook/is-mobile.svelte.js";

	const isMobile = new IsMobile();
</script>

<div class="flex items-center gap-2">
	{#if isMobile.current}
		<Drawer.Root>
			<Drawer.Trigger>
				{#snippet child({ props })}
					<Button {...props} size="sm">Customize</Button>
				{/snippet}
			</Drawer.Trigger>
			<Drawer.Content class="bg-white p-6 dark:bg-zinc-950">
				<Customizer />
			</Drawer.Content>
		</Drawer.Root>
	{:else}
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button {...props} size="sm">Customize</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content
				class="z-40 w-[340px] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
				align="end"
			>
				<Customizer />
			</Popover.Content>
		</Popover.Root>
	{/if}
	<ThemeCopyCodeButton />
</div>
