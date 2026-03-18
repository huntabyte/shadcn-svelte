<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>File Upload</Card.Title>
		<Card.Description>Drag and drop or browse</Card.Description>
	</Card.Header>
	<Card.Content>
		<Empty.Root class="border">
			<Empty.Header>
				<Empty.Media variant="icon">
					<IconPlaceholder
						lucide="UploadCloudIcon"
						tabler="IconCloudUpload"
						hugeicons="CloudUploadIcon"
						phosphor="CloudArrowUpIcon"
						remixicon="RiUploadCloudLine"
					/>
				</Empty.Media>
				<Empty.Title>Upload files</Empty.Title>
				<Empty.Description>PNG, JPG, PDF up to 10MB</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>Browse Files</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
