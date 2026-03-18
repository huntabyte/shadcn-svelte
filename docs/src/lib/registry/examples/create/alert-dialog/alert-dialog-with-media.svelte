<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let open = $state(false);
</script>

<Example title="With Media" class="items-center">
	<AlertDialog.Root bind:open>
		<AlertDialog.Trigger>
			<Button variant="outline">Default (Media)</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Media>
					<IconPlaceholder
						lucide="BluetoothIcon"
						tabler="IconBluetooth"
						hugeicons="BluetoothIcon"
						phosphor="BluetoothIcon"
						remixicon="RiBluetoothLine"
					/>
				</AlertDialog.Media>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This will permanently delete your account and remove your data from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action onclick={() => (open = false)}>Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</Example>
