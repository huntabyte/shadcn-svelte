<script lang="ts" context="module">
	import type { SuperValidated } from "sveltekit-superforms";
	import { z } from "zod";

	export const appearanceFormSchema = z.object({
		theme: z.enum(["light", "dark"], {
			required_error: "Please select a theme."
		}),
		font: z.enum(["inter", "manrope", "system"], {
			invalid_type_error: "Select a font",
			required_error: "Please select a font."
		})
	});

	export type AppearanceFormSchema = typeof appearanceFormSchema;
</script>

<script lang="ts">
	import * as Form from "@/registry/default/ui/form";
	import { Button } from "@/registry/default/ui/button";
	import * as RadioGroup from "@/registry/default/ui/radio-group";
	import Label from "@/registry/default/ui/label/label.svelte";
	export let data: SuperValidated<AppearanceFormSchema>;
</script>

<Form.Root
	schema={appearanceFormSchema}
	form={data}
	class="space-y-8"
	method="POST"
	let:config
	debug={true}
>
	<Form.Item>
		<Form.Field {config} name="font">
			<Form.Label>Font</Form.Label>
			<div class="relative w-max">
				<Form.Select class="w-[200px]">
					<option value="inter">Inter</option>
					<option value="manrope">Manrope</option>
					<option value="system">System</option>
				</Form.Select>
			</div>
			<Form.Description>
				Set the font you want to use in the dashboard.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="theme" let:attrs let:setValue>
			<Form.Label>Theme</Form.Label>
			<Form.Description>Select the theme for the dashboard.</Form.Description>
			<Form.Validation />
			<RadioGroup.Root
				onValueChange={(v) => setValue(v)}
				{...attrs.input}
				class="grid max-w-md grid-cols-2 gap-8 pt-2"
				orientation="horizontal"
			>
				{@const { name, value } = attrs.input}
				<RadioGroup.Input {name} {value} />
				<Label
					for="light"
					class="[&:has([data-state=checked])>div]:border-primary"
				>
					<RadioGroup.Item id="light" value="light" class="sr-only" />
					<div
						class="items-center rounded-md border-2 border-muted p-1 hover:border-accent"
					>
						<div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
							<div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
								<div class="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
								<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
							</div>
							<div
								class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
							>
								<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
								<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
							</div>
							<div
								class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
							>
								<div class="h-4 w-4 rounded-full bg-[#ecedef]" />
								<div class="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
							</div>
						</div>
					</div>
					<span class="block w-full p-2 text-center font-normal"> Light </span>
				</Label>
				<Label
					for="dark"
					class="[&:has([data-state=checked])>div]:border-primary"
				>
					<RadioGroup.Item id="dark" value="dark" class="sr-only" />
					<div
						class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
					>
						<div class="space-y-2 rounded-sm bg-slate-950 p-2">
							<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
								<div class="h-2 w-[80px] rounded-lg bg-slate-400" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-400" />
							</div>
							<div
								class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
							>
								<div class="h-4 w-4 rounded-full bg-slate-400" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-400" />
							</div>
							<div
								class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
							>
								<div class="h-4 w-4 rounded-full bg-slate-400" />
								<div class="h-2 w-[100px] rounded-lg bg-slate-400" />
							</div>
						</div>
					</div>
					<span class="block w-full p-2 text-center font-normal"> Dark </span>
				</Label>
			</RadioGroup.Root>
		</Form.Field>
	</Form.Item>
	<Button type="submit">Update preferences</Button>
</Form.Root>
