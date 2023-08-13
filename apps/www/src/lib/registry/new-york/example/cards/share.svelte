<script lang="ts">
	import * as Avatar from "@/registry/new-york/ui/avatar";
	import { Button } from "@/registry/new-york/ui/button";
	import * as Card from "@/registry/new-york/ui/card";
	import { Input } from "@/registry/new-york/ui/input";
	import * as Select from "@/registry/new-york/ui/select";
	import { Separator } from "@/registry/new-york/ui/separator";

	const people = [
		{
			name: "Olivia Martin",
			email: "m@example.com",
			avatar: "/avatars/03.png",
			permission: "edit"
		},
		{
			name: "Isabella Nguyen",
			email: "b@example.com",
			avatar: "/avatars/05.png",
			permission: "view"
		},
		{
			name: "Sofia Davis",
			email: "p@example.com",
			avatar: "/avatars/01.png",
			permission: "view"
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
								{@const initials = person.name.split(" ")}
								<Avatar.Fallback
									>{initials[0][0]}{initials[1][0]}</Avatar.Fallback
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
						<Select.Root value={person.permission}>
							<Select.Trigger class="ml-auto w-[110px]">
								<Select.Value placeholder="Select" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="edit" label="Can edit"
									>Can edit</Select.Item
								>
								<Select.Item value="view" label="Can view"
									>Can view</Select.Item
								>
							</Select.Content>
						</Select.Root>
					</div>
				{/each}
				<div class="flex items-center justify-between space-x-4">
					<div class="flex items-center space-x-4">
						<Avatar.Root>
							<Avatar.Image src="/avatars/05.png" />
							<Avatar.Fallback>IN</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<p class="text-sm font-medium leading-none">
								Isabella Nguyen
							</p>
							<p class="text-sm text-muted-foreground">
								b@example.com
							</p>
						</div>
					</div>
					<Select.Root value="view">
						<Select.Trigger class="ml-auto w-[110px]">
							<Select.Value placeholder="Select" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="edit">Can edit</Select.Item>
							<Select.Item value="view">Can view</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex items-center justify-between space-x-4">
					<div class="flex items-center space-x-4">
						<Avatar.Root>
							<Avatar.Image src="/avatars/01.png" />
							<Avatar.Fallback>SD</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<p class="text-sm font-medium leading-none">
								Sofia Davis
							</p>
							<p class="text-sm text-muted-foreground">
								p@example.com
							</p>
						</div>
					</div>
					<Select.Root value="view">
						<Select.Trigger class="ml-auto w-[110px]">
							<Select.Value placeholder="Select" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="edit">Can edit</Select.Item>
							<Select.Item value="view">Can view</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
	</Card.Content>
</Card.Root>
