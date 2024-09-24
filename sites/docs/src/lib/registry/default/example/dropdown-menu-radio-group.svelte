<script lang="ts">
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/default/ui/button/index.js";

	let position = $state("bottom");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>Open</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Panel Position</DropdownMenu.GroupHeading>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={position}>
				<DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
