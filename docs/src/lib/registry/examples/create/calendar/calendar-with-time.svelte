<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Time">
	<Card.Root size="sm" class="mx-auto w-fit">
		<Card.Content>
			<Calendar type="single" class="p-0" />
		</Card.Content>
		<Card.Footer class="bg-card border-t">
			<Field.Group>
				<Field.Field>
					<Field.Label for="time-from">Start Time</Field.Label>
					<InputGroup.Root>
						<InputGroup.Input
							id="time-from"
							type="time"
							step="1"
							value="10:30:00"
							class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
						/>
						<InputGroup.Addon>
							<IconPlaceholder
								lucide="Clock2Icon"
								tabler="IconClockHour2"
								hugeicons="Clock03Icon"
								phosphor="ClockIcon"
								remixicon="RiTimeLine"
								class="text-muted-foreground"
							/>
						</InputGroup.Addon>
					</InputGroup.Root>
				</Field.Field>
				<Field.Field>
					<Field.Label for="time-to">End Time</Field.Label>
					<InputGroup.Root>
						<InputGroup.Input
							id="time-to"
							type="time"
							step="1"
							value="12:30:00"
							class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
						/>
						<InputGroup.Addon>
							<IconPlaceholder
								lucide="Clock2Icon"
								tabler="IconClockHour2"
								hugeicons="Clock03Icon"
								phosphor="ClockIcon"
								remixicon="RiTimeLine"
								class="text-muted-foreground"
							/>
						</InputGroup.Addon>
					</InputGroup.Root>
				</Field.Field>
			</Field.Group>
		</Card.Footer>
	</Card.Root>
</Example>
