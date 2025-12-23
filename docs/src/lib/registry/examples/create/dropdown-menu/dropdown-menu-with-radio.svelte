<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let position = $state("bottom");
</script>

<Example title="With Radio Group">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Radio Group</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Panel Position</DropdownMenu.Label>
				<DropdownMenu.RadioGroup bind:value={position}>
					<DropdownMenu.RadioItem value="top">
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUp01Icon"
							phosphor="ArrowUpIcon"
						/>
						Top
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="bottom">
						<IconPlaceholder
							lucide="ArrowDownIcon"
							tabler="IconArrowDown"
							hugeicons="ArrowDown01Icon"
							phosphor="ArrowDownIcon"
						/>
						Bottom
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="right" disabled>
						<IconPlaceholder
							lucide="ArrowRightIcon"
							tabler="IconArrowRight"
							hugeicons="ArrowRight01Icon"
							phosphor="ArrowRightIcon"
						/>
						Right
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
