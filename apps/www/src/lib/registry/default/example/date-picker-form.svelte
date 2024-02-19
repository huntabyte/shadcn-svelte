<script lang="ts" context="module">
	import { z } from "zod";

	export const formSchema = z.object({
		dob: z.string().refine((v) => v, { message: "A date of birth is required." }),
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import { Calendar as CalendarIcon } from "lucide-svelte";
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		CalendarDate,
		today,
	} from "@internationalized/date";
	import { cn } from "$lib/utils";
	import { Button, buttonVariants } from "@/registry/default/ui/button";
	import { Calendar } from "@/registry/default/ui/calendar";
	import * as Popover from "@/registry/default/ui/popover";
	import * as Form from "@/registry/default/ui/form";
	import type { SuperValidated, Infer } from "sveltekit-superforms";
	import { superForm } from "sveltekit-superforms/client";
	import { zodClient } from "sveltekit-superforms/adapters";
	let data: SuperValidated<Infer<FormSchema>> = $page.data.datePicker;
	export { data as form };

	const form = superForm(data, {
		validators: zodClient(formSchema),
		taintedMessage: null,
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value: DateValue | undefined = $formData.dob ? parseDate($formData.dob) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());
</script>

<form method="POST" action="?/datePicker" class="space-y-8" use:enhance>
	<Form.Field {form} name="dob" class="flex flex-col">
		<Form.Control let:attrs>
			<Form.Label>Date of birth</Form.Label>
			<Popover.Root>
				<Popover.Trigger
					{...attrs}
					class={cn(
						buttonVariants({ variant: "outline" }),
						"w-[280px] pl-4 justify-start text-left font-normal",
						!value && "text-muted-foreground"
					)}
				>
					{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
					<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						bind:value
						bind:placeholder
						minValue={new CalendarDate(1900, 1, 1)}
						maxValue={today(getLocalTimeZone())}
						calendarLabel="Date of birth"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								$formData.dob = v.toString();
							} else {
								$formData.dob = "";
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.Description>Your date of birth is used to calculator your age</Form.Description>
			<Form.FieldErrors />
		</Form.Control>
	</Form.Field>
	<Button type="submit">Submit</Button>
</form>
