<script lang="ts">
	import Customizer from "./customizer.svelte";
	import ThemeCopyCodeButton from "./copy-code-button.svelte";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Drawer from "$lib/registry/new-york/ui/drawer/index.js";
	import Button from "$lib/registry/new-york/ui/button/button.svelte";
</script>

<div class="flex items-center gap-2">
	<div class="block md:hidden">
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
	</div>
	<div class="hidden md:block">
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
	</div>
	<ThemeCopyCodeButton />
</div>
