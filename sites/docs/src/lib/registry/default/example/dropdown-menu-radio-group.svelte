<script lang="ts">
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";

	let position = "bottom";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]}>Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Panel Position</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.RadioGroup bind:value={position}>
			<DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
