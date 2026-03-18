<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Example title="Feedback Form" class="items-center justify-center">
	<Card.Root class="w-full max-w-sm" size="sm">
		<Card.Content>
			<form id="feedback-form">
				<Field.Group>
					<Field.Field>
						<Field.Label for="topic">Topic</Field.Label>
						<NativeSelect.Root id="topic">
							<NativeSelect.Option value="">Select a topic</NativeSelect.Option>
							<NativeSelect.Option value="ai">AI</NativeSelect.Option>
							<NativeSelect.Option value="accounts-and-access-controls">
								Accounts and Access Controls
							</NativeSelect.Option>
							<NativeSelect.Option value="billing">Billing</NativeSelect.Option>
							<NativeSelect.Option value="cdn">
								CDN (Firewall, Caching)
							</NativeSelect.Option>
							<NativeSelect.Option value="ci-cd">
								CI/CD (Builds, Deployments, Environment Variables)
							</NativeSelect.Option>
							<NativeSelect.Option value="dashboard-interface">
								Dashboard Interface (Navigation, UI Issues)
							</NativeSelect.Option>
							<NativeSelect.Option value="domains">Domains</NativeSelect.Option>
							<NativeSelect.Option value="frameworks">Frameworks</NativeSelect.Option>
							<NativeSelect.Option value="marketplace-and-integrations">
								Marketplace and Integrations
							</NativeSelect.Option>
							<NativeSelect.Option value="observability">
								Observability (Observability, Logs, Monitoring)
							</NativeSelect.Option>
							<NativeSelect.Option value="storage">Storage</NativeSelect.Option>
						</NativeSelect.Root>
					</Field.Field>
					<Field.Field>
						<Field.Label for="feedback">Feedback</Field.Label>
						<Textarea id="feedback" placeholder="Your feedback helps us improve..." />
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" form="feedback-form">Submit</Button>
		</Card.Footer>
	</Card.Root>
</Example>
