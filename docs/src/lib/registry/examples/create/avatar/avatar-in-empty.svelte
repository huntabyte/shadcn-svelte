<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="In Empty">
	<Empty.Root class="w-full flex-none border">
		<Empty.Header>
			<Empty.Media>
				<Avatar.Group>
					<Avatar.Root size="lg">
						<Avatar.Image
							src="https://github.com/shadcn.png"
							alt="@shadcn"
							class="grayscale"
						/>
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.Root size="lg">
						<Avatar.Image
							src="https://github.com/maxleiter.png"
							alt="@maxleiter"
							class="grayscale"
						/>
						<Avatar.Fallback>LR</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.Root size="lg">
						<Avatar.Image
							src="https://github.com/evilrabbit.png"
							alt="@evilrabbit"
							class="grayscale"
						/>
						<Avatar.Fallback>ER</Avatar.Fallback>
					</Avatar.Root>
					<Avatar.GroupCount>
						<IconPlaceholder
							lucide="PlusIcon"
							tabler="IconPlus"
							hugeicons="PlusSignIcon"
							phosphor="PlusIcon"
						/>
					</Avatar.GroupCount>
				</Avatar.Group>
			</Empty.Media>
			<Empty.Title>No Team Members</Empty.Title>
			<Empty.Description>Invite your team to collaborate on this project.</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<Button>
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
				/>
				Invite Members
			</Button>
		</Empty.Content>
	</Empty.Root>
</Example>
