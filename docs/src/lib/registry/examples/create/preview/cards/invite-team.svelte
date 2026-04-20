<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const roles = [
		{ value: "admin", label: "Admin" },
		{ value: "editor", label: "Editor" },
		{ value: "viewer", label: "Viewer" },
	];

	let role1 = $state("editor");
	let role2 = $state("viewer");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Invite Team</Card.Title>
		<Card.Description>Add members to your workspace</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex flex-col gap-3">
			<div class="flex items-center gap-2">
				<InputGroup.Root class="flex-1">
					<InputGroup.Input value="alex@example.com" readonly />
				</InputGroup.Root>
				<Select.Root type="single" bind:value={role1}>
					<Select.Trigger class="w-24">
						{roles.find((role) => role.value === role1)?.label}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each roles as role (role.value)}
								<Select.Item value={role.value}>{role.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex items-center gap-2">
				<InputGroup.Root class="flex-1">
					<InputGroup.Input value="sam@example.com" readonly />
				</InputGroup.Root>
				<Select.Root type="single" bind:value={role2}>
					<Select.Trigger class="w-24">
						{roles.find((role) => role.value === role2)?.label}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each roles as role (role.value)}
								<Select.Item value={role.value}>{role.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<Button variant="outline">
			<IconPlaceholder
				lucide="PlusIcon"
				tabler="IconPlus"
				hugeicons="PlusSignIcon"
				phosphor="PlusIcon"
				remixicon="RiAddLine"
				data-icon="inline-start"
			/>
			Add another
		</Button>
		<Separator />
		<Field.Field>
			<Field.Label for="invite-link">Or share invite link</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="invite-link" value="https://app.co/invite/x8f2k" readonly />
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button size="icon-xs" aria-label="Copy link">
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="Copy01Icon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Send Invites</Button>
	</Card.Footer>
</Card.Root>
