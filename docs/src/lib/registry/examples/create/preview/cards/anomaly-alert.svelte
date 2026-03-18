<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root>
	<Card.Content>
		<Empty.Root class="h-48">
			<Empty.Header>
				<Empty.Title>Get alerted for anomalies</Empty.Title>
				<Empty.Description>
					Automatically monitor your projects for anomalies and get notified.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>Upgrade to Observability Plus</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
