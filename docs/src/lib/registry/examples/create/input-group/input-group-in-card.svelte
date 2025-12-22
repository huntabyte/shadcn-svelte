<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="In Card">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Card with Input Group</Card.Title>
			<Card.Description>This is a card with an input group.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Field.Group>
				<Field.Field>
					<Field.Label for="email-input">Email Address</Field.Label>
					<InputGroup.Root>
						<InputGroup.Input
							id="email-input"
							type="email"
							placeholder="you@example.com"
						/>
						<InputGroup.Addon align="inline-end">
							<IconPlaceholder
								lucide="MailIcon"
								tabler="IconMail"
								hugeicons="MailIcon"
								phosphor="EnvelopeIcon"
							/>
						</InputGroup.Addon>
					</InputGroup.Root>
				</Field.Field>
				<Field.Field>
					<Field.Label for="website-input">Website URL</Field.Label>
					<InputGroup.Root>
						<InputGroup.Addon>
							<InputGroup.Text>https://</InputGroup.Text>
						</InputGroup.Addon>
						<InputGroup.Input id="website-input" placeholder="example.com" />
						<InputGroup.Addon align="inline-end">
							<IconPlaceholder
								lucide="ExternalLinkIcon"
								tabler="IconExternalLink"
								hugeicons="LinkSquare02Icon"
								phosphor="ArrowSquareOutIcon"
							/>
						</InputGroup.Addon>
					</InputGroup.Root>
				</Field.Field>
				<Field.Field>
					<Field.Label for="feedback-textarea">Feedback & Comments</Field.Label>
					<InputGroup.Root>
						<InputGroup.Textarea
							id="feedback-textarea"
							placeholder="Share your thoughts..."
							class="min-h-[100px]"
						/>
						<InputGroup.Addon align="block-end">
							<InputGroup.Text>0/500 characters</InputGroup.Text>
						</InputGroup.Addon>
					</InputGroup.Root>
				</Field.Field>
			</Field.Group>
		</Card.Content>
		<Card.Footer class="justify-end gap-2">
			<Button variant="outline">Cancel</Button>
			<Button>Submit</Button>
		</Card.Footer>
	</Card.Root>
</Example>
