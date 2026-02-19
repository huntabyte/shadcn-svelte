<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";

	let person = $state("pedro");
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-52">
		<ContextMenu.RadioGroup bind:value={person}>
			<ContextMenu.Label inset>People</ContextMenu.Label>
			<ContextMenu.Separator />
			<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
			<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
			<ContextMenu.RadioItem value="carlos">Carlos Cabrera</ContextMenu.RadioItem>
		</ContextMenu.RadioGroup>
	</ContextMenu.Content>
</ContextMenu.Root>
