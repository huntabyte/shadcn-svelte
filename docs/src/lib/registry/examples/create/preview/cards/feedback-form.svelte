<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<Card.Root>
	<Card.Content>
		<form id="feedback-form">
			<Field.Group>
				<Field.Field>
					<Field.Label for="topic">Topic</Field.Label>
					<NativeSelect.Root id="topic">
						<NativeSelect.Option value="">Select a topic</NativeSelect.Option>
						<NativeSelect.Option value="ai">AI</NativeSelect.Option>
						<NativeSelect.Option value="billing">Billing</NativeSelect.Option>
						<NativeSelect.Option value="dashboard-interface">
							Dashboard Interface
						</NativeSelect.Option>
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
