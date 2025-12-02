<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";

	const permissions = [
		{
			label: "Can edit",
			value: "edit",
		},
		{
			label: "Can view",
			value: "view",
		},
	];

	let people = $state([
		{
			name: "Olivia Martin",
			email: "m@example.com",
			avatar: "/avatars/03.png",
			permission: "edit",
		},
		{
			name: "Isabella Nguyen",
			email: "b@example.com",
			avatar: "/avatars/04.png",
			permission: "edit",
		},
		{
			name: "Sofia Davis",
			email: "p@example.com",
			avatar: "/avatars/05.png",
			permission: "edit",
		},
		{
			name: "Ethan Thompson",
			email: "e@example.com",
			avatar: "/avatars/01.png",
			permission: "edit",
		},
	]);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Share this document</Card.Title>
		<Card.Description>Anyone with the link can view this document.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex items-center gap-2">
			<Label for="link" class="sr-only">Link</Label>
			<Input id="link" value="http://example.com/link/to/document" readonly class="h-8" />
			<Button size="sm" variant="outline" class="shadow-none">Copy Link</Button>
		</div>
		<Separator class="my-4" />
		<div class="flex flex-col gap-4">
			<div class="text-sm font-medium">People with access</div>
			<Item.Group>
				{#each people as person (person.email)}
					<Item.Item class="px-0 py-2">
						<Item.Media>
							<Avatar.Root>
								<Avatar.Image src={person.avatar} alt="Image" />
								<Avatar.Fallback>
									{person.name.charAt(0)}
								</Avatar.Fallback>
							</Avatar.Root>
						</Item.Media>
						<Item.Content>
							<Item.Title>{person.name}</Item.Title>
							<Item.Description>{person.email}</Item.Description>
						</Item.Content>
						<Item.Actions>
							<Select.Root type="single" bind:value={person.permission}>
								<Select.Trigger class="ms-auto pe-2" size="sm" aria-label="Edit">
									{permissions.find((p) => p.value === person.permission)
										?.label ?? "Select"}
								</Select.Trigger>
								<Select.Content align="end">
									{#each permissions as permission (permission.value)}
										<Select.Item value={permission.value}>
											{permission.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Item.Actions>
					</Item.Item>
				{/each}
			</Item.Group>
		</div>
	</Card.Content>
</Card.Root>
