<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Set a new milestone</Card.Title>
		<Card.Description>
			Define your financial target and we&apos;ll help you pace your savings.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Field>
				<Field.Label for="goal-name">Goal Name</Field.Label>
				<Input id="goal-name" placeholder="e.g. New Car, Home Downpayment" />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label for="target-amount">Target Amount</Field.Label>
					<Input id="target-amount" value="$15,000" />
				</Field.Field>
				<Field.Field>
					<Field.Label for="target-date">Target Date</Field.Label>
					<Input id="target-date" value="Dec 2025" />
				</Field.Field>
			</div>
		</Field.Group>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button class="w-full">Create Goal</Button>
		<Button variant="outline" class="w-full">Cancel</Button>
	</Card.Footer>
</Card.Root>
