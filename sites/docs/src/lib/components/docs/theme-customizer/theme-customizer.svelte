<script lang="ts">
	import Customizer from "./customizer.svelte";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import CopyCodeButton from "./copy-code-button.svelte";
	import "../../styles/markdown.css";
</script>

<div class="flex items-center gap-2">
	<Drawer.Root>
		<Drawer.Trigger>
			{#snippet child({ props })}
				<Button size="sm" {...props} class="md:hidden">Customize</Button>
			{/snippet}
		</Drawer.Trigger>
		<Drawer.Content class="p-6 pt-0">
			<Customizer />
		</Drawer.Content>
	</Drawer.Root>
	<div class="hidden items-center md:flex">
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button size="sm" {...props}>Customize</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content
				align="start"
				class="z-40 w-[340px] rounded-[12px] bg-white p-6 dark:bg-zinc-950"
			>
				<Customizer />
			</Popover.Content>
		</Popover.Root>
	</div>
	<CopyCodeButton variant="ghost" size="sm" class="[&_svg]:hidden" />
</div>
