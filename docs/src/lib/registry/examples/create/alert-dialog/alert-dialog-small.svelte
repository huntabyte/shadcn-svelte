<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Example title="Small" class="items-center">
	<AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button variant="outline">Small</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content size="sm">
			<AlertDialog.Header>
				<AlertDialog.Title>Allow accessory to connect?</AlertDialog.Title>
				<AlertDialog.Description>
					Do you want to allow the USB accessory to connect to this device?
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Don't allow</AlertDialog.Cancel>
				<AlertDialog.Action>Allow</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</Example>
