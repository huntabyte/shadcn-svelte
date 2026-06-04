<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	import { Field, FieldGroup, FieldLabel } from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Card>
	<CardHeader>
		<CardTitle>Set a new milestone</CardTitle>
		<CardDescription>
			Define your financial target and we'll help you pace your savings.
		</CardDescription>
	</CardHeader>
	<CardContent>
		<FieldGroup>
			<Field>
				<FieldLabel for="goal-name">Goal Name</FieldLabel>
				<Input id="goal-name" placeholder="e.g. New Car, Home Downpayment"></Input>
			</Field>
			<div class="grid grid-cols-2 gap-3">
				<Field>
					<FieldLabel for="target-amount">Target Amount</FieldLabel>
					<Input id="target-amount" value="$15,000"></Input>
				</Field>
				<Field>
					<FieldLabel for="target-date">Target Date</FieldLabel>
					<Input id="target-date" value="Dec 2025"></Input>
				</Field>
			</div>
		</FieldGroup>
	</CardContent>
	<CardFooter class="flex-col gap-2">
		<Button class="w-full">Create Goal</Button>
		<Button variant="outline" class="w-full">Cancel</Button>
	</CardFooter>
</Card>
