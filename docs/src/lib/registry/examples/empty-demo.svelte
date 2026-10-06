<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import FolderCodeIcon from "@tabler/icons-svelte/icons/folder-code";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Empty.Root>
	<Empty.Header>
		<Empty.Media variant="icon">
			<FolderCodeIcon />
		</Empty.Media>
		<Empty.Title>No Projects Yet</Empty.Title>
		<Empty.Description>
			You haven't created any projects yet. Get started by creating your first project.
		</Empty.Description>
	</Empty.Header>
	<Empty.Content class="flex-row justify-center gap-2">
		<Button>Create Project</Button>
		<Button variant="outline">Import Project</Button>
	</Empty.Content>
	<Button variant="link" href="##" class="text-muted-foreground" size="sm">
		Learn More <ArrowUpRightIcon />
	</Button>
</Empty.Root>
