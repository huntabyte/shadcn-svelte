<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Book Appointment</Card.Title>
		<Card.Description>Dr. Sarah Chen · Cardiology</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Field.Group>
			<Field.Field>
				<Field.Label>Available on March 18, 2026</Field.Label>
				<ToggleGroup.Root type="multiple" value={["slot-0"]} spacing={2}>
					<ToggleGroup.Item value="slot-0">9:00 AM</ToggleGroup.Item>
					<ToggleGroup.Item value="slot-1">10:30 AM</ToggleGroup.Item>
					<ToggleGroup.Item value="slot-2">11:00 AM</ToggleGroup.Item>
					<ToggleGroup.Item value="slot-3">1:30 PM</ToggleGroup.Item>
				</ToggleGroup.Root>
			</Field.Field>
		</Field.Group>
		<Alert.Root>
			<Alert.Title>New patient?</Alert.Title>
			<Alert.Description>Please arrive 15 minutes early.</Alert.Description>
		</Alert.Root>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Book Appointment</Button>
	</Card.Footer>
</Card.Root>
