<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";

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
			permission: "edit",
		},
		{
			name: "Isabella Nguyen",
			email: "b@example.com",
			permission: "view",
		},
		{
			name: "Sofia Davis",
			email: "p@example.com",
			permission: "view",
		},
	]);
</script>

<Card.Root>
	<Card.Header class="pb-3">
		<Card.Title>Share this document</Card.Title>
		<Card.Description>Anyone with the link can view this document.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex space-x-2">
			<Label for="link" class="sr-only">Link</Label>
			<Input id="link" value="http://example.com/link/to/document" readonly />
			<Button class="shrink-0">Copy Link</Button>
		</div>
		<Separator class="my-4" />
		<div class="space-y-4">
			<div class="text-sm font-medium">People with access</div>
			<div class="grid gap-6">
				{#each people as person (person.email)}
					<div class="flex items-center justify-between space-x-4">
						<div class="flex items-center space-x-4">
							<Avatar.Root>
								<Avatar.Image src="/avatars/03.png" alt="Image" />
								<Avatar.Fallback>
									{person.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-sm font-medium leading-none">{person.name}</p>
								<p class="text-muted-foreground text-sm">{person.email}</p>
							</div>
						</div>
						<Select.Root type="single" bind:value={person.permission}>
							<Select.Trigger class="ml-auto w-[110px]" aria-label="Edit">
								{permissions.find((p) => p.value === person.permission)?.label ??
									"Select"}
							</Select.Trigger>
							<Select.Content>
								{#each permissions as permission (permission.value)}
									<Select.Item value={permission.value}
										>{permission.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				{/each}
			</div>
		</div>
	</Card.Content>
</Card.Root>
