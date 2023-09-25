<script lang="ts">
	import * as DropdownMenu from "@/registry/default/ui/dropdown-menu";
	import { Button } from "@/registry/default/ui/button";
	import { MoreHorizontal } from "lucide-svelte";

	import type { Readable } from "svelte/store";
	import type { Payment } from "../data-table-demo.svelte";
	export let payment: Readable<Payment>;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="relative w-8 h-8 p-0"
		>
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item
				on:click={() => navigator.clipboard.writeText($payment.id)}
			>
				Copy payment ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>View customer</DropdownMenu.Item>
		<DropdownMenu.Item>View payment details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
