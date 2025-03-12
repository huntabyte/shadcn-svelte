<script lang="ts" module>
	import { z } from "zod";

	export const formSchema = z.object({
		dob: z.string().refine((v) => v, { message: "A date of birth is required." }),
	});

	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today,
	} from "@internationalized/date";
	import type { Infer, SuperValidated } from "sveltekit-superforms";
	import SuperDebug, { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import { cn } from "$lib/utils.js";
	import { Button, buttonVariants } from "$lib/registry/default/ui/button/index.js";
	import { Calendar } from "$lib/registry/default/ui/calendar/index.js";
	import * as Popover from "$lib/registry/default/ui/popover/index.js";
	import * as Form from "$lib/registry/default/ui/form/index.js";
	let data: SuperValidated<Infer<FormSchema>> = page.data.datePicker;
	export { data as form };

	const form = superForm(data, {
		validators: zodClient(formSchema),
		taintedMessage: null,
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance } = form;

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value = $state<DateValue | undefined>();

	$effect(() => {
		value = $formData.dob ? parseDate($formData.dob) : undefined;
	});

	let placeholder = $state<DateValue>(today(getLocalTimeZone()));
</script>

<form method="POST" action="/?/datePicker" class="space-y-8" use:enhance>
	<Form.Field {form} name="dob" class="flex flex-col">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Date of birth</Form.Label>
				<Popover.Root>
					<Popover.Trigger
						{...props}
						class={cn(
							buttonVariants({ variant: "outline" }),
							"w-[280px] justify-start pl-4 text-left font-normal",
							!value && "text-muted-foreground"
						)}
					>
						{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
						<CalendarIcon class="ml-auto size-4 opacity-50" />
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" side="top">
						<Calendar
							type="single"
							value={value as DateValue}
							bind:placeholder
							minValue={new CalendarDate(1900, 1, 1)}
							maxValue={today(getLocalTimeZone())}
							calendarLabel="Date of birth"
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
				<Form.Description
					>Your date of birth is used to calculator your age</Form.Description
				>
				<Form.FieldErrors />
				<input hidden value={$formData.dob} name={props.name} />
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Button type="submit">Submit</Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
