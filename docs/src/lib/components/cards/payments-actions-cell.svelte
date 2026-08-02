<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { Row } from "@tanstack/table-core";

	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};

	let { row }: { row: Row<Payment> } = $props();

	const payment = $derived(row.original);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button variant="ghost" class="size-8 p-0" {...props}>
				<span class="sr-only">Open menu</span>
				<EllipsisIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>Actions</DropdownMenu.Label>
		<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(payment.id)}>
			Copy payment ID
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>View customer</DropdownMenu.Item>
		<DropdownMenu.Item>View payment details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
