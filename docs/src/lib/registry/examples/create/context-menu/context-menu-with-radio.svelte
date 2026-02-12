<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";

	let user = $state("pedro");
	let theme = $state("light");
</script>

<Example title="With Radio Group">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Group>
				<ContextMenu.Label>People</ContextMenu.Label>
				<ContextMenu.RadioGroup bind:value={user}>
					<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
				</ContextMenu.RadioGroup>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Label>Theme</ContextMenu.Label>
				<ContextMenu.RadioGroup bind:value={theme}>
					<ContextMenu.RadioItem value="light">Light</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="dark">Dark</ContextMenu.RadioItem>
					<ContextMenu.RadioItem value="system">System</ContextMenu.RadioItem>
				</ContextMenu.RadioGroup>
			</ContextMenu.Group>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
