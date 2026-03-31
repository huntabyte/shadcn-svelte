<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<Card.Root>
	<Card.Content class="p-0">
		<Empty.Root class="p-4">
			<Empty.Header>
				<Empty.Media variant="icon">
					<Spinner />
				</Empty.Media>
				<Empty.Title>Syncing your accounts</Empty.Title>
				<Empty.Description>
					We&apos;re pulling in your latest transactions. This usually takes a few seconds.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button variant="outline">Cancel</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
