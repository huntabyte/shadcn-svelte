<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Table from "$lib/registry/ui/table/index.js";
</script>

<Example title="Simple">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head class="text-right">Role</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium">Sarah Chen</Table.Cell>
				<Table.Cell>sarah.chen@acme.com</Table.Cell>
				<Table.Cell class="text-right">Admin</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">Marc Rodriguez</Table.Cell>
				<Table.Cell>marcus.rodriguez@acme.com</Table.Cell>
				<Table.Cell class="text-right">User</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">Emily Watson</Table.Cell>
				<Table.Cell>emily.watson@acme.com</Table.Cell>
				<Table.Cell class="text-right">User</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</Example>
