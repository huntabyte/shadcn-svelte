<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let position = $state("bottom");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Radio Group</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="start" class="w-56">
		<DropdownMenu.Label inset>Panel Position</DropdownMenu.Label>
		<DropdownMenu.Group>
			<DropdownMenu.RadioGroup bind:value={position}>
				<DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="right" disabled>Right</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
