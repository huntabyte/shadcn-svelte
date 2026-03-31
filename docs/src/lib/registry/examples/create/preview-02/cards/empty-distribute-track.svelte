<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Card.Root>
	<Card.Content>
		<Empty.Root class="p-4">
			<Empty.Media variant="icon">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="Add01Icon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
				/>
			</Empty.Media>
			<Empty.Header>
				<Empty.Title>Distribute Track</Empty.Title>
				<Empty.Description>
					Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>Create Release</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
