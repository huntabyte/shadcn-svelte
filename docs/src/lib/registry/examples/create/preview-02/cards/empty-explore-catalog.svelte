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
					lucide="AudioLinesIcon"
					tabler="IconPlayerRecordFilled"
					hugeicons="AudioWave01Icon"
					phosphor="RecordIcon"
					remixicon="RiRecordCircleLine"
				/>
			</Empty.Media>
			<Empty.Header>
				<Empty.Title>Explore Catalog</Empty.Title>
				<Empty.Description>
					Check your ISRC codes, metadata, and visual assets before going live.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>View Catalog</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
