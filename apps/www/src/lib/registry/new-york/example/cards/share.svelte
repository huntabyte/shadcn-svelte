<script lang="ts">
	import * as Avatar from "@/registry/new-york/ui/avatar";
	import { Button } from "@/registry/new-york/ui/button";
	import * as Card from "@/registry/new-york/ui/card";
	import { Input } from "@/registry/new-york/ui/input";
	import * as Select from "@/registry/new-york/ui/select";
	import { Separator } from "@/registry/new-york/ui/separator";

	const permissions = [
		{
			value: "view",
			label: "Can view"
		},
		{
			value: "edit",
			label: "Can edit"
		}
	];

	const people = [
		{
			name: "Olivia Martin",
			email: "m@example.com",
			avatar: "/avatars/03.png",
			permission: permissions[1]
		},
		{
			name: "Isabella Nguyen",
			email: "b@example.com",
			avatar: "/avatars/05.png",
			permission: permissions[0]
		},
		{
			name: "Sofia Davis",
			email: "p@example.com",
			avatar: "/avatars/01.png",
			permission: permissions[0]
		}
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Share this document</Card.Title>
		<Card.Description>
			Anyone with the link can view this document.
		</Card.Description>
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
					<div class="flex items-center justify-between space-x-4">
						<div class="flex items-center space-x-4">
							<Avatar.Root>
								<Avatar.Image src={person.avatar} />
								{@const splitName = person.name.split(" ")}
								<Avatar.Fallback
									>{splitName[0][0]}{splitName[1][0]}</Avatar.Fallback
								>
							</Avatar.Root>
							<div>
								<p class="text-sm font-medium leading-none">
									{person.name}
								</p>
								<p class="text-sm text-muted-foreground">
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
									<Select.Item
										value={permission.value}
										label={permission.label}
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
