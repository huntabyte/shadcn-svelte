<script lang="ts">
	import * as Avatar from "@/registry/default/ui/avatar";
	import { Button } from "@/registry/default/ui/button";
	import * as Card from "@/registry/default/ui/card";
	import { Input } from "@/registry/default/ui/input";
	import * as Select from "@/registry/default/ui/select";
	import { Separator } from "@/registry/default/ui/separator";
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
				<div class="flex items-center justify-between space-x-4">
					<div class="flex items-center space-x-4">
						<Avatar.Root>
							<Avatar.Image src="/avatars/03.png" />
							<Avatar.Fallback>OM</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<p class="text-sm font-medium leading-none">
								Olivia Martin
							</p>
							<p class="text-sm text-muted-foreground">
								m@example.com
							</p>
						</div>
					</div>
					<Select.Root value="edit">
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
