<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Empty">
	<Empty.Root class="h-full flex-none border">
		<Empty.Header>
			<Empty.Media>
				<Avatar.Group class="grayscale">
					<Avatar.Root size="lg">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.Root size="lg">
						<Avatar.Image src="https://github.com/maxleiter.png" alt="@maxleiter" />
						<Avatar.Fallback>LR</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.Root size="lg">
						<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
						<Avatar.Fallback>ER</Avatar.Fallback>
					</Avatar.Root>
				</Avatar.Group>
			</Empty.Media>
			<Empty.Title>No Team Members</Empty.Title>
			<Empty.Description>Invite your team to collaborate on this project.</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<div class="flex gap-2">
				<AlertDialog.Root>
					<AlertDialog.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Show Dialog</Button>
						{/snippet}
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
							<AlertDialog.Description>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action>Continue</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
				<AlertDialog.Root>
					<AlertDialog.Trigger>
						{#snippet child({ props })}
							<Button {...props}>Connect Mouse</Button>
						{/snippet}
					</AlertDialog.Trigger>
					<AlertDialog.Content size="sm">
						<AlertDialog.Header>
							<AlertDialog.Media>
								<IconPlaceholder
									lucide="BluetoothIcon"
									tabler="IconBluetooth"
									hugeicons="BluetoothIcon"
									phosphor="BluetoothIcon"
								/>
							</AlertDialog.Media>
							<AlertDialog.Title>Allow accessory to connect?</AlertDialog.Title>
							<AlertDialog.Description>
								Do you want to allow the USB accessory to connect to this device?
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Don&apos;t allow</AlertDialog.Cancel>
							<AlertDialog.Action>Allow</AlertDialog.Action>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</div>
		</Empty.Content>
	</Empty.Root>
</Example>
