<script lang="ts">
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Content class="flex items-center justify-center py-10">
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<FolderIcon />
				</Empty.Media>
				<Empty.Title>No projects yet</Empty.Title>
				<Empty.Description>
					You haven't created any projects yet. Get started by creating your first
					project.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<div class="flex gap-2">
					<Button>Create Project</Button>
					<Button variant="outline">Import Project</Button>
				</div>
				<Button variant="link" class="text-muted-foreground" size="sm">
					<a href="#/">
						Learn More <ArrowUpRightIcon class="inline" />
					</a>
				</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
