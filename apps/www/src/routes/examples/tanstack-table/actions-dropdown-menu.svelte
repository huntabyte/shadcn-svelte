<script lang="ts">
	import { DotsHorizontal } from "radix-icons-svelte";
	import { Button } from "@/registry/default/ui/button";
	import * as DropdownMenu from "@/registry/new-york/ui/dropdown-menu";

	export let paymentId: string;
</script>

<DropdownMenu.Root positioning={{ placement: "bottom-end" }}>
	<DropdownMenu.Trigger asChild let:trigger>
		<Button builders={[trigger]} variant="ghost" class="h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<DotsHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item
				on:click={() => navigator.clipboard.writeText(paymentId)}
			>
				Copy payment Id
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>View customer</DropdownMenu.Item>
			<DropdownMenu.Item>View payment details</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
