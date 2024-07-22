<script lang="ts">
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";

	const permissions = [
		{
			value: "view",
			label: "Can view",
		},
		{
			value: "edit",
			label: "Can edit",
		},
	];

	const people = [
		{
			name: "Olivia Martin",
			email: "m@example.com",
			avatar: "/avatars/03.png",
			permission: permissions[1],
		},
		{
			name: "Isabella Nguyen",
			email: "b@example.com",
			avatar: "/avatars/05.png",
			permission: permissions[0],
		},
		{
			name: "Sofia Davis",
			email: "p@example.com",
			avatar: "/avatars/01.png",
			permission: permissions[0],
		},
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Share this document</Card.Title>
		<Card.Description>Anyone with the link can view this document.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex space-x-2">
			<Input value="http://example.com/link/to/document" readonly />
			<Button variant="secondary" class="shrink-0">Copy Link</Button>
		</div>
		<Separator class="my-4" />
		<div class="space-y-4">
			<h4 class="text-sm font-medium">People with access</h4>
			<div class="grid gap-6">
				{#each people as person}
					{@const name = person.name.split(" ")}
					<div class="flex items-center justify-between space-x-4">
						<div class="flex items-center space-x-4">
							<Avatar.Root>
								<Avatar.Image src={person.avatar} />
								<Avatar.Fallback>{name[0][0] + name[1][0]}</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-sm font-medium leading-none">
									{person.name}
								</p>
								<p class="text-muted-foreground text-sm">
									{person.email}
								</p>
							</div>
						</div>
						<Select.Root selected={person.permission}>
							<Select.Trigger class="ml-auto w-[110px]">
								<Select.Value placeholder="Select" />
							</Select.Trigger>
							<Select.Content>
								{#each permissions as permission}
									<Select.Item value={permission.value} label={permission.label}
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
